package dev.lucin.xesqueforum.presentation.controller;

import dev.lucin.xesqueforum.domain.model.request.LoginRequest;
import dev.lucin.xesqueforum.domain.model.request.RegisterRequest;
import dev.lucin.xesqueforum.domain.service.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@AllArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;


    @PostMapping("/login")
    public ResponseEntity<Mono<String>> login(
            @RequestBody @Valid LoginRequest request) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(userService.login(request));
    }

    @PostMapping("/register")
    public ResponseEntity<Mono<Void>> register(
            @RequestBody @Valid RegisterRequest request) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(userService.register(request));
    }
}
