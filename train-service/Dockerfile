# ====== Stage 1: Build ======
FROM maven:3.9.4-eclipse-temurin-21 AS build
WORKDIR /app

# Copy Maven config and resolve dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy source and build
COPY src ./src
RUN mvn clean package -DskipTests

# ====== Stage 2: Run ======
FROM eclipse-temurin:21-jdk
WORKDIR /app

# Copy built JAR from the builder stage
COPY --from=build /app/target/train-service-0.0.1-SNAPSHOT.jar app.jar

# Expose ports
EXPOSE 8080 5005

# Enable remote debugging on port 5005
ENTRYPOINT ["java", "-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005", "-jar", "app.jar"]
