package dev.lucin.xesqueforum.application.exception.dto;

import java.util.List;
import java.util.Map;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@Builder
@RequiredArgsConstructor
public class ApiExceptionDTO {

    private final String message;
    private final String error;
    private final List<Map<String, String>> details;
}
