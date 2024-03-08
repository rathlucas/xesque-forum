FROM openjdk:17

WORKDIR /app

COPY pom.xml /app
COPY .mvn /app/.mvn
COPY mvnw /app
COPY mvnw.cmd /app
COPY src /app/src

RUN ./mvnw clean package

EXPOSE 8080

CMD ["java", "-jar", "target/xesque-forum-0.0.3.jar"]