package dev.lucin.xesqueforum.infra.repository.impl;

import dev.lucin.xesqueforum.domain.entity.UserEntity;
import dev.lucin.xesqueforum.infra.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

@Slf4j
@Repository
@AllArgsConstructor
public class MongoUserRepository implements UserRepository {

    private final ReactiveMongoTemplate template;

    @Override
    public Mono<Void> save(UserEntity user) {
        return template.save(user).then();
    }

    @Override
    public Mono<UserDetails> findByUsername(String username) {
        Criteria criteria = Criteria.where("username").is(username);
        Query query = new Query().addCriteria(criteria);
        return template.find(query, UserEntity.class).single().cast(UserDetails.class)
                .doOnSuccess(res -> log.info("{}", res))
                .doOnError(error -> log.error("{}", error.getMessage()));
    }
}
