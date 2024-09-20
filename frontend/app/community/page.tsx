"use client";

import IdeaForm from "@/components/IdeasForm";
import IdeaList from "@/components/ideasList";
import React from "react";

const Community = () => {
  return (
    <div className="mt-[100px]">
      <IdeaForm />
      <div className="mt-[52px] w-full flex items-center justify-center container mx-auto ">
        <img src="/line.svg" alt="" />
      </div>
      <IdeaList />
    </div>
  );
};

export default Community;
