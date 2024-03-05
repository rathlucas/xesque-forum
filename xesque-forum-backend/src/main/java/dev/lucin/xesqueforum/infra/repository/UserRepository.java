package dev.lucin.xesqueforum.infra.repository;

import dev.lucin.xesqueforum.domain.entity.UserEntity;
import org.springframework.security.core.userdetails.UserDetails;
import reactor.core.publisher.Mono;

public interface UserRepository {

    Mono<Void> save(UserEntity user);

    Mono<UserDetails> findByUsername(String username);
}
