# First stage: JDK with GraalVM
FROM ghcr.io/graalvm/jdk-community:17 AS build

# Update package lists and Install Maven
RUN microdnf update -y && \
microdnf install -y zip unzip gcc glibc-devel zlib-devel libstdc++-devel gcc-c++ && \
microdnf clean all

WORKDIR /app

RUN \
    curl -s "https://get.sdkman.io" | bash; \
    source "/home/.bashrc"; \
    sdk install maven; \
    gu install native-image; \

RUN mvn --version

# Copy pom.xml and download dependencies
COPY pom.xml .
RUN mvn -B clean package -P native --no-transfer-progress

COPY . .

# Second stage: Lightweight debian-slim image
FROM debian:bookworm-slim

WORKDIR /app

# Copy the native binary from the build stage
COPY --from=build /app/target/xesque-forum /app/xesque-forum

# Run the application
CMD ["/app/xesque-forum"]