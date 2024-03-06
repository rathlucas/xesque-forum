import RegisterForm from "@/components/form/RegisterForm";
import Image from "next/image";

export default function Register() {
  return (
    <main className="overflow-hidden relative min-h-screen flex items-center justify-between">
      <div className={"absolute w-full h-full sm:w-1/2"}>
        <Image
          src={"/wallpaper.png"}
          objectFit={"cover"}
          alt={"wallpaper"}
          fill={true}
        />
      </div>
      <div className={"absolute right-0 w-full sm:w-1/2"}>
        <RegisterForm />
      </div>
    </main>
  );
}
