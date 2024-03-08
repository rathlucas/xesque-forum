package dev.lucin.xesqueforum.presentation.controller;

import dev.lucin.xesqueforum.domain.model.request.LoginRequest;
import dev.lucin.xesqueforum.domain.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.reactive.server.WebTestClient;
import reactor.core.publisher.Mono;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AuthControllerTest {

    @Mock
    private UserService userService;

    private WebTestClient webTestClient;

    @BeforeEach
    void setup() {
        AuthController authController = new AuthController(userService);
        webTestClient = WebTestClient.bindToController(authController).build();
    }

    @Test
    void givenValidCredentials_whenLoggingIn_shouldSuccessfullyBeAuthenticated() {

        when(userService.login(any(LoginRequest.class)))
                .thenReturn(Mono.just("token"));

        webTestClient.post()
                .uri("/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue("""
                        {
                          "username": "user",
                          "password": "password"
                        }""")
                .exchange()
                .expectStatus().isOk();
    }

    @Test
    void givenValidData_whenRegistering_shouldSuccessfullyBeRegistered() {

        webTestClient.post()
                .uri("/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue("""
                        {
                          "username": "user",
                          "email": "mail@test.com",
                          "password": "password"
                        }""")
                .exchange()
                .expectStatus().isCreated();
    }
}