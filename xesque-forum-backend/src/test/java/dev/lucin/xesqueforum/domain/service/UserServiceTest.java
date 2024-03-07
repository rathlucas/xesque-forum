package dev.lucin.xesqueforum.domain.service;

import dev.lucin.xesqueforum.domain.entity.UserEntity;
import dev.lucin.xesqueforum.domain.mapper.UserMapper;
import dev.lucin.xesqueforum.domain.model.request.LoginRequest;
import dev.lucin.xesqueforum.domain.model.request.RegisterRequest;
import dev.lucin.xesqueforum.infra.repository.UserRepository;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.ReactiveAuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.ReactiveUserDetailsService;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @InjectMocks
    private UserService userService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private UserMapper userMapper;

    @Mock
    private ReactiveUserDetailsService userDetailsService;

    @Mock
    private ReactiveAuthenticationManager authenticationManager;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Test
    void givenValidCredentials_whenLoggingIn_thenShouldSuccesfullyGetUserFromDb() {
        var user = new User("user", "password", List.of());
        var loginRequest = new LoginRequest("user", "password");

        when(userDetailsService
                .findByUsername("user"))
                .thenReturn(Mono.just(user));

        when(authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken("user", "password")))
                .thenReturn(Mono.empty());

        StepVerifier.create(userService.login(loginRequest))
                .expectComplete()
                .verify();

        verify(userDetailsService, times(1)).findByUsername(anyString());
        verify(authenticationManager,times(1)).authenticate(any(UsernamePasswordAuthenticationToken.class));
    }

    @Test
    void givenValidInformation_whenRegisteringUser_ShouldSuccessfullySaveToDb() {
        var registerRequest = new RegisterRequest("user","mail@mail.com", "password");
        var userEntity = new UserEntity(null, "user", "mail@mail.com", "password");

        when(passwordEncoder.encode("password"))
                .thenReturn("encodedPassword");

        when(userMapper.toEntity(registerRequest)).thenReturn(userEntity);

        when(userRepository.save(any(UserEntity.class)))
                .thenReturn(Mono.empty());

        StepVerifier.create(userService.register(registerRequest))
                .expectComplete()
                .verify();

        verify(passwordEncoder, times(1)).encode(anyString());
        verify(userRepository, times(1)).save(any(UserEntity.class));
    }
}