package dev.lucin.xesqueforum.domain.model.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {

    @NotBlank(message = "O nome de usuário não pode estar vazio")
    @Size(min = 4, max = 50, message = "O nome de usuário deve conter entre 4 e 50 caracteres")
    private String username;

    @NotBlank(message = "O email não pode estar vazio")
    @Email(message = "É necessário inserir um email válido")
    private String email;

    @NotBlank(message = "A senha não pode estar vazia!")
    @Size(min = 6, message = "A senha precisa ter ao menos 6 caracteres")
    private String password;
}
