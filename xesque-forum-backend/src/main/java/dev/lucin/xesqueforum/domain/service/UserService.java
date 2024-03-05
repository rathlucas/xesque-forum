package dev.lucin.xesqueforum.domain.service;

import dev.lucin.xesqueforum.domain.exception.NotFoundException;
import dev.lucin.xesqueforum.domain.mapper.UserMapper;
import dev.lucin.xesqueforum.domain.model.request.LoginRequest;
import dev.lucin.xesqueforum.domain.model.request.RegisterRequest;
import dev.lucin.xesqueforum.infra.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.ReactiveAuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.ReactiveUserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
@AllArgsConstructor
public class UserService {

    private final UserMapper mapper;
    private final UserRepository userRepository;
    private final ReactiveUserDetailsService userDetailsService;
    private final ReactiveAuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;

    public final Mono<Void> login(LoginRequest request) {
        var user = userDetailsService
                .findByUsername(request.getUsername())
                .switchIfEmpty(Mono.error(new NotFoundException("Usuário não encontrado")));

        return user.flatMap(val -> {
            Authentication auth = new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword());
            return authenticationManager.authenticate(auth).then();
        });
    }

    public final Mono<Void> register(RegisterRequest request) {
        request.setPassword(passwordEncoder.encode(request.getPassword()));
        return userRepository.save(mapper.toEntity(request));
    }
}
