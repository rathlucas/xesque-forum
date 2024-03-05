import RegisterForm from "@/components/form/RegisterForm";

export default function Register() {

  return (
      <main className="flex min-h-screen flex-col items-center justify-between">
        <div className={"self-end w-full sm:w-1/2"}>
          <RegisterForm/>
        </div>
      </main>
  );
}
