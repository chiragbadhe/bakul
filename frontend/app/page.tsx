"use client";

import CustomButton from "@/components/CustomButton";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Hero from "@/components/hero";
import IdeaForm from "@/components/IdeasForm";
import IdeaList from "@/components/ideasList";
import VerifyWorldcoin from "@/components/verifyWorldcoin";
import { useAccount } from "wagmi";

export default function Home() {
  const { isConnected } = useAccount();

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
