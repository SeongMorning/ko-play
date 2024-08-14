# KoPlay

다문화 초등학생을 위한 한국어 교육 게이미피케이션 서비스\
(게이미피케이션 : 게임이 아닌 애플리케이션에 애플리케이션 사용을 권장하기 위해 게임 플레이 기법을 적용하는 것)

## 기술 스택, 빌드 버전 및 기타 도구

### Frontend
- 프레임 워크 : Next.js (v14.2.5)
- CSS : SASS, tailwind css
- 언어 : typescript, Javascript

### Backend
- 프레임 워크 : Spring boot (v3.3.2)
- 데이터 베이스 : MySQL (v8), Redis (v7.4), AWS S3
- 보안 : Spring-Security, JWT
- WebRTC : OpenVidu (v2.30.0)
- 프록시 서버 : Nginx (v1.25.5)

### Infra
- 서버 : AWS EC2 ubuntu 20.04.6 LTS
- CI/CD 도구 : Gitlab, Jenkins (v2.452.3), Docker (v24.0.7), Docker-compose (v1.25.0)

### 빌드 버전
- Node.js : 20.15.1(LTS)
- JVM : jdk17
- gradle : 8.8

### 기타 도구
- 개발 도구 : VsCode (v1.90.2), IntelliJ (v2024.1.4)
- 일정 관리 : Jira,Notion
- 커뮤니케이션 : MatterMost
- 디자인 : Figma

## 빌드 
설치 과정은 꼭 순서를 지켜주세요


### 1. jenkins

a. EC2 내부에 접속해서 jenkins 직접 설치
```
docker run -d --name jenkins --privileged \ # jenkins에서 빌드시 권한 문제가 발생해서 --privileged로 권한 부여
-v /var/run/docker.sock:/var/run/docker.sock \ # jenkins 내부에서 docker를 사용해야 하므로 소켓 연결
-v jenkins_home:/var/jenkins_home \ #컨테이너 볼륨 연결
-e JENKINS_OPTS="--prefix=/jenkins" \ #nginx 리버스 프록시를 위한 변수설정
-p 127.0.0.1:8081:8080 \
-v /usr/bin/docker-compose:/usr/bin/docker-compose \ #컨테이너 볼륨 연결
jenkins/jenkins:lts
```
b. 컨테이너 내부와 호스트 docker 소켓 연결. 미리 호스트에 docker 설치하는 과정이 필요
```
docker exec -it --user root jenkins /bin/bash #jenkins 컨테이너 내부 접속
apt-get update 
apt-get install -y docker.io #docker CLI 설치
```
c. docker compose 설치
```
#jenkins 컨테이너 내부 접속
docker exec -it --user root jenkins /bin/bash 
#docker compose 설치
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
#권한 문제로 jenkins에서 빌드 에러 발생함. 권한 부여
chmod +x /usr/local/bin/docker-compose
```

### 2. MySQL,Redis
원래 MySQL,Redis,Nginx를 한 docker-compose파일로 설치했었으나, openvidu를 설치하는 과정에서 Nginx가 추가로 설치되어 MySQL과 Redis만 설치하는 방향으로 인프라 구성. 

a. docker-compose.yml \
[MySQL,Redis docker-compose.yml](docker-compose.yml)

### 3. Openvidu, Nginx

**OpenVidu**

OpenVidu는 OnPremise 환경으로 설치. \
CERTIFICATE_TYPE=letsencrypt.로 SSL 설정을 진행.\
구체적인 과정은 공식문서 참고 \
https://docs.openvidu.io/en/2.30.0/deployment/ce/on-premises/

**Nginx 설정**

OpenVidu 공식 문서대로 설치를 진행하면 nginx가 설치됨. \
해당 Nginx에 frontend, backend, jenkins의 리버스 프록시 설정을 추가함

a. default.conf
파일 위치는 컨테이너 내부 기준 /etc/nginx/conf.d/default.conf \
[Nginx default.conf](InfraSettingCodes/default.conf)

### 부록 - Frontend,Backend DockerFile

1. Frontend DockerFile
2. Backend DockerFile


```
Give examples
```

## 환경변수 설정

A step by step series of examples that tell you how to get a development env running

Say what the step will be

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
