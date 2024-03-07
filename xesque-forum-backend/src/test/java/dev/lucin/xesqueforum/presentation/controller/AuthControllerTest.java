package dev.lucin.xesqueforum.presentation.controller;

import dev.lucin.xesqueforum.domain.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.reactive.server.WebTestClient;

@ExtendWith(MockitoExtension.class)
class AuthControllerTest {

    @InjectMocks
    private AuthController authController;

    @Mock
    private UserService userService;

    private WebTestClient webTestClient;

    @BeforeEach
    void setup() {
        webTestClient = WebTestClient.bindToController(authController).build();
    }

    @Test
    void givenValidCredentials_whenLoggingIn_shouldSuccessfullyBeAuthenticated() {

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