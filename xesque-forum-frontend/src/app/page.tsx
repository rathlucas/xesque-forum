import HomeTable from "@/components/HomeTable/HomeTable";
import NavigationBar from "@/components/navigation/NavigationBar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <NavigationBar />
      <HomeTable />
    </main>
  );
}
