"use client"; // <-- Essa é a palavra mágica!

import { HomeView } from "../components/home-view"; 

export default function HomeTestPage() {
  return (
    <main className="min-h-screen bg-varden text-cosmos">
      <HomeView onStartPractice={() => alert("O botão funciona!")} />
    </main>
  );
}