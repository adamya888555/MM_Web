import Hero from "@/components/sections/Hero";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black">
      <Hero />
      {/* Additional sections can be added here */}
    </div>
  );
}
