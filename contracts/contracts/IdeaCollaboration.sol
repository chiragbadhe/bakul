// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract IdeaCollaboration {
    struct Idea {
        uint256 id;
        string title;
        string description;
        address publisher;
        bool isActive;
        uint256 voteCount; // Added field for vote count
        mapping(address => bool) hasVoted; // Mapping to track if an address has voted
    }

    struct Interest {
        address user;
        bool isAccepted;
    }

    uint256 public ideaCounter = 0;
    mapping(uint256 => Idea) public ideas;
    mapping(uint256 => Interest[]) public interests;

    event IdeaSubmitted(uint256 ideaId, address indexed publisher);
    event InterestExpressed(uint256 indexed ideaId, address indexed user);
    event CollaboratorAccepted(uint256 indexed ideaId, address indexed user);
    event CollaboratorRejected(uint256 indexed ideaId, address indexed user);
    event Voted(uint256 indexed ideaId, address indexed voter);

    modifier onlyPublisher(uint256 _ideaId) {
        require(msg.sender == ideas[_ideaId].publisher, "Only publisher can accept collaborators");
        _;
    }

    modifier onlyActiveIdea(uint256 _ideaId) {
        require(ideas[_ideaId].isActive, "This idea is no longer active");
        _;
    }

    function submitIdea(string memory _title, string memory _description) public {
        ideaCounter++;
        Idea storage newIdea = ideas[ideaCounter];
        newIdea.id = ideaCounter;
        newIdea.title = _title;
        newIdea.description = _description;
        newIdea.publisher = msg.sender;
        newIdea.isActive = true;
        newIdea.voteCount = 0;
        emit IdeaSubmitted(ideaCounter, msg.sender);
    }

    function expressInterest(uint256 _ideaId) public onlyActiveIdea(_ideaId) {
        interests[_ideaId].push(Interest(msg.sender, false));
        emit InterestExpressed(_ideaId, msg.sender);
    }

    function acceptCollaborator(uint256 _ideaId, address _collaborator) public onlyPublisher(_ideaId) {
        Interest[] storage ideaInterests = interests[_ideaId];
        for (uint256 i = 0; i < ideaInterests.length; i++) {
            if (ideaInterests[i].user == _collaborator) {
                ideaInterests[i].isAccepted = true;
                emit CollaboratorAccepted(_ideaId, _collaborator);
                break;
            }
        }
    }

    function rejectCollaborator(uint256 _ideaId, address _collaborator) public onlyPublisher(_ideaId) {
        Interest[] storage ideaInterests = interests[_ideaId];
        for (uint256 i = 0; i < ideaInterests.length; i++) {
            if (ideaInterests[i].user == _collaborator) {
                delete ideaInterests[i]; // Remove from the array
                emit CollaboratorRejected(_ideaId, _collaborator);
                break;
            }
        }
    }

    function getInterestedUsers(uint256 _ideaId) public view returns (address[] memory) {
        Interest[] storage ideaInterests = interests[_ideaId];
        address[] memory users = new address[](ideaInterests.length);
        for (uint256 i = 0; i < ideaInterests.length; i++) {
            users[i] = ideaInterests[i].user;
        }
        return users;
    }

    function isCollaboratorAccepted(uint256 _ideaId, address _collaborator) public view returns (bool) {
        Interest[] storage ideaInterests = interests[_ideaId];
        for (uint256 i = 0; i < ideaInterests.length; i++) {
            if (ideaInterests[i].user == _collaborator) {
                return ideaInterests[i].isAccepted;
            }
        }
        return false;
    }

    function vote(uint256 _ideaId) public onlyActiveIdea(_ideaId) {
        require(!ideas[_ideaId].hasVoted[msg.sender], "You have already voted for this idea");

        Idea storage idea = ideas[_ideaId];
        idea.voteCount++;
        idea.hasVoted[msg.sender] = true;

        emit Voted(_ideaId, msg.sender);
    }

    function closeIdea(uint256 _ideaId) public onlyPublisher(_ideaId) {
        ideas[_ideaId].isActive = false;
    }

    function getVoteCount(uint256 _ideaId) public view returns (uint256) {
        return ideas[_ideaId].voteCount;
    }
}
