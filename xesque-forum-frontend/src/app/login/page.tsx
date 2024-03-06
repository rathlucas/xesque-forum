import LoginForm from "@/components/form/LoginForm";
import Image from "next/image";

export default function Login() {

  return (
      <main className="overflow-hidden relative min-h-screen flex items-center justify-between">
        <div className={"absolute w-full h-full sm:w-1/2"}>
          <Image src={"/wallpaper.png"} objectFit={"cover"} alt={"wallpaper"} fill={true}/>
        </div>
        <div className={"absolute right-0 w-full sm:w-1/2"}>
          <LoginForm/>
        </div>
      </main>
  );
}
