package dev.lucin.xesqueforum.domain.mapper;

import dev.lucin.xesqueforum.domain.entity.UserEntity;
import dev.lucin.xesqueforum.domain.model.request.RegisterRequest;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValueCheckStrategy;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(
        componentModel = "spring",
        nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface UserMapper {

    @Mapping(target = "id", ignore = true)
    UserEntity toEntity(RegisterRequest request);
}
