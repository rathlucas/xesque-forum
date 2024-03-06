# First stage: JDK with GraalVM
FROM ghcr.io/graalvm/jdk-community:17 AS build

# Update package lists and Install Maven
RUN microdnf update -y && \
microdnf install -y unzip gcc glibc-devel zlib-devel libstdc++-devel gcc-c++ && \
microdnf clean all

WORKDIR /app

RUN \
    # Install SDKMAN
    curl -s "https://get.sdkman.io" | bash; \
    source "$HOME/.sdkman/bin/sdkman-init.sh"; \
    sdk install maven; \
    # Install GraalVM Native Image
    gu install native-image; \

RUN source "$HOME/.sdkman/bin/sdkman-init.sh" && mvn --version

# Copy pom.xml and download dependencies
COPY pom.xml .
RUN source "$HOME/.sdkman/bin/sdkman-init.sh" && mvn -B clean package -P native --no-transfer-progress

COPY . .

# Second stage: Lightweight debian-slim image
FROM debian:bookworm-slim

WORKDIR /app

# Copy the native binary from the build stage
COPY --from=build /app/target/xesque-forum /app/xesque-forum

# Run the application
CMD ["/app/xesque-forum"]