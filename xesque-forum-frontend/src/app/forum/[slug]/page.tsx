import CreatePostButton from "@/components/button/CreatePostButton";
import NavigationBar from "@/components/navigation/NavigationBar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <NavigationBar />
      <div className="self-end mt-4 mr-4">
        <CreatePostButton />
      </div>
    </main>
  );
}
