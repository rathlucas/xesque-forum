import {Button} from "../ui/button";
import {ButtonHTMLAttributes} from "react";

interface CreatePostButtonProps {
  type: ButtonHTMLAttributes<any>[`type`];
}

export default function SubmitPostButton({type}: Readonly<CreatePostButtonProps>) {
  return (
      <Button type={type ?? "submit"}
              className="bg-green-500 hover:bg-green-600"
      >
        Criar Postagem
      </Button>
  );
}
