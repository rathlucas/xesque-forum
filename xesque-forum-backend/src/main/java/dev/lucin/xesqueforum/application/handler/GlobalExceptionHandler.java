package dev.lucin.xesqueforum.application.handler;

import dev.lucin.xesqueforum.application.exception.dto.ApiExceptionDTO;
import java.util.ArrayList;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.support.WebExchangeBindException;
import reactor.core.publisher.Mono;

@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(WebExchangeBindException.class)
    public ResponseEntity<Mono<ApiExceptionDTO>> handleWebExchangeBindException(WebExchangeBindException e) {
        log.error("WebExceptionException: {}", e.getLocalizedMessage());
        var error = ApiExceptionDTO.builder()
                .message(e.getLocalizedMessage())
                .error(e.getStatusCode().toString().toUpperCase())
                .details(new ArrayList<>())
                .build();

        return ResponseEntity.status(e.getStatusCode()).body(Mono.just(error));
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<Mono<ApiExceptionDTO>> handleBadCredentialsException(BadCredentialsException e) {
        log.error("AuthenticationException: {}", e.getLocalizedMessage());
        var error = ApiExceptionDTO.builder()
                .message(e.getLocalizedMessage())
                .error(HttpStatus.UNAUTHORIZED.getReasonPhrase())
                .details(new ArrayList<>())
                .build();

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Mono.just(error));
    }
}
