# First stage: JDK with GraalVM
FROM ghcr.io/graalvm/jdk-community:17 AS build

# Update package lists and Install Maven
RUN microdnf update -y && \
microdnf install -y maven gcc glibc-devel zlib-devel libstdc++-devel gcc-c++ && \
microdnf clean all

WORKDIR /app

# Copy pom.xml and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

COPY . .

RUN mvn -P native -P production native:compile

# Second stage: Lightweight debian-slim image
FROM debian:bookworm-slim

WORKDIR /app

# Copy the native binary from the build stage
COPY --from=build /app/target/xesque-forum /app/xesque-forum

# Run the application
CMD ["/app/xesque-forum"]