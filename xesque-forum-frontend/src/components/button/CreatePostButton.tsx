"use client";

import {usePathname, useRouter} from "next/navigation";
import {Button} from "../ui/button";

export default function CreatePostButton() {
  const router = useRouter();
  const pathname = usePathname();

  return (
      <Button
          onClick={(e) => {
            e.preventDefault();
            router.push(`${pathname}/create-post`);
          }}
          className="bg-green-500 hover:bg-green-600"
      >
        Criar Postagem
      </Button>
  );
}
