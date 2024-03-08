import NavigationBar from "@/components/navigation/NavigationBar";
import CreatePostForm from "@/components/form/CreatePostForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <NavigationBar />
      <h1 className="text-xl my-3">Criação de postagem</h1>
      <CreatePostForm />
    </main>
  );
}
