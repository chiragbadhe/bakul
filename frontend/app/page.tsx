"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import Hero from "@/components/hero";
import IdeaForm from "@/components/IdeasForm";
import IdeaList from "@/components/ideasList";
import VerifyWorldcoin from "@/components/verifyWorldcoin";

export default function Home() {

  return (
    <main className="w-full">
      {/* <Header /> */}
      <Hero />
      {/* <IdeaForm />
      <IdeaList /> */}
      <Footer />
    </main>
  );
}
