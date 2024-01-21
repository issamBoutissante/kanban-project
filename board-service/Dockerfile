# Step 1: Use Maven image to build the application
FROM maven:3.8.5-openjdk-17 as builder
WORKDIR /app

# Copy the pom.xml and source code
COPY pom.xml .
COPY src ./src

# Build the application
RUN mvn clean package -DskipTests

# Step 2: Use OpenJDK image to run the application
FROM openjdk:17-jdk-slim
WORKDIR /app

# Copy the built application from the builder stage
COPY --from=builder /app/target/board-service-0.0.1-SNAPSHOT.jar /app/board-service.jar

# Expose the port the application runs on
EXPOSE 8082

# Command to run the application
CMD ["java", "-jar", "board-service.jar"]
