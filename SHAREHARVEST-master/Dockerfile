FROM openjdk:17-jdk-slim

WORKDIR /app

# Copy Maven wrapper and related files
COPY pom.xml ./
COPY mvnw ./
COPY .mvn ./.mvn

# Grant execute permissions to mvnw
RUN chmod +x ./mvnw  # <--- Make sure this line is exactly here

# Download dependencies
RUN ./mvnw dependency:go-offline

# Copy source code
COPY src ./src

# Build the application
RUN ./mvnw package -DskipTests

# Final image
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=0 /app/target/*.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]