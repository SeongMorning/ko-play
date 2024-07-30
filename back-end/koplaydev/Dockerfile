# 1. 빌드 단계
FROM gradle:8.8-jdk17 AS build

RUN mkdir -p /app

WORKDIR /app


# 소스 코드 복사
COPY . .

# Gradle 캐시를 활용하여 의존성 다운로드를 빠르게
# COPY build.gradle settings.gradle ./
# COPY gradle /gradle
# RUN gradle wrapper --gradle-version 7.6

# Gradle Wrapper 파일 생성
RUN gradle wrapper --gradle-version 8.8

#권한 변경
RUN chmod +x gradlew

# 의존성 다운로드
RUN ./gradlew dependencies

# 애플리케이션 빌드
RUN ./gradlew build --no-daemon --stacktrace

# 2. 배포 단계
FROM openjdk:17-jdk-alpine

WORKDIR /app

# 빌드 단계에서 생성된 JAR 파일을 복사
COPY --from=build /app/build/libs/*.jar app.jar

EXPOSE 8080

# JAR 파일 실행
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
