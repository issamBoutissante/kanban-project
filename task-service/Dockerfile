# Dockerfile for Spring Boot app
FROM maven:3.8.4-openjdk-17 as build
WORKDIR /app
# No need to navigate into kanban-board-microservices/task-service, as we are already in the task-service directory
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM openjdk:17-jdk-alpine
WORKDIR /app
# Make sure to copy from the correct build directory, assuming JAR file is in target/ under WORKDIR
COPY --from=build /app/target/task-service-*.jar /app/task-service.jar
EXPOSE 8084
ENTRYPOINT ["java","-jar","task-service.jar"]
