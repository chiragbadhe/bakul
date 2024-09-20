// Function to inject a script into the page context
function injectScript(code) {
  const script = document.createElement("script");
  script.setAttribute("type", "text/javascript");
  script.textContent = code;
  (document.head || document.documentElement).appendChild(script);
  script.onload = function () {
    script.remove();
  };
}

const makeid = () => Math.floor(Math.random() * 100000000);

function updateIds(htmlString, number) {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlString;

  // Update IDs in the HTML elements
  const elementsWithId = tempDiv.querySelectorAll("[id]");
  elementsWithId.forEach((element) => {
    element.id += number;
  });

  // Update IDs in style tags
  const styleTags = tempDiv.querySelectorAll("style");
  styleTags.forEach((styleTag) => {
    styleTag.innerHTML = styleTag.innerHTML.replace(
      /#(\w+)\s*\{/g,
      (match, id) => {
        return `#${id}${number}{`;
      }
    );
  });

  return tempDiv.innerHTML;
}

function updateIdsInJsCode(jsCode, number) {
  // Update IDs in the JavaScript code
  return jsCode.replace(
    /getElementById\s*\(\s*(['"`])(\w+)\1\s*\)/g,
    (match, quote, id) => {
      return `getElementById(${quote}${id}${number}${quote})`;
    }
  );
}

let isReplacing = false;

async function replaceBlkTags() {
  if (isReplacing) return; // Prevent overlapping executions
  isReplacing = true;

  try {
    // Find all span elements containing <blk ... blk> or &lt;blk ... blk&gt;
    const spans = document.querySelectorAll("span");

    const fetchPromises = Array.from(spans).flatMap((span) => {
      const blkRegex = /(&lt;|<)blk\s*(.*?)\s*blk(&gt;|>)/g;
      const matches = Array.from(span.innerHTML.matchAll(blkRegex));

      return matches.map((match) => {
        let url = null;
        const url1 = match[2].trim();

        if (url1.startsWith("http")) url = url1;
        else if (url1.startsWith("ipfs://"))
          url = "https://ipfs.io/ipfs/" + url1.substring("ipfs://".length);

        if (!url) return Promise.resolve(null);

        return fetch(url)
          .then((response) => {
            if (response.ok) {
              return response.json().then((result) => ({
                span,
                match,
                htmlText: result.iframe.html,
                jsCode: result.iframe.js,
              }));
            } else {
              console.error(`Failed to fetch ${url}: ${response.statusText}`);
              return null;
            }
          })
          .catch((error) => {
            console.error(`Error fetching ${url}:`, error);
            return null;
          });
      });
    });

    const results = await Promise.all(fetchPromises);

    results.forEach((result) => {
      if (result) {
        const randomNumber = makeid();
        const newHtml = updateIds(result.htmlText, randomNumber);

        // Replace only the matched content within the span
        const spanHtml = result.span.innerHTML;
        result.span.innerHTML = spanHtml.replace(result.match[0], newHtml);

        // Inject the JavaScript after updating the HTML
        setTimeout(() => {
          const newJS = updateIdsInJsCode(result.jsCode, randomNumber);
          injectScript(newJS);
        }, 500);
      }
    });
  } finally {
    isReplacing = false;
  }
}

// Load ethers.js library
(function () {
  const script = document.createElement("script");
  script.src = "https://cdn.ethers.io/lib/ethers-5.2.umd.min.js";
  script.onload = function () {
    // Additional code can be executed after ethers is loaded
  };
  document.head.appendChild(script);
})();

// Run the function every 1 second, ensuring no overlaps
setInterval(replaceBlkTags, 1000);
