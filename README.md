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
- WebRTC : Openvidu (v2.30.0)
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
b. 컨테이너 내부와 호스트 docker 소켓 연결. 이 작업 전 미리 호스트에 docker 설치하는 과정이 필요
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

d. jenkins pipeline script
```
pipeline {
    agent any
    
    environment{
        FRONT_CONTAINER_NAME = 'frontend'
        BACK_CONTAINER_NAME = 'backend'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout([$class: 'GitSCM',
                          branches: [[name: '*/master']],
                          userRemoteConfigs: [[url: 'https://lab.ssafy.com/s11-webmobile1-sub2/S11P12B302.git',
                                               credentialsId: 'IDPW-gitlab']] // 자격 증명 ID
                ])
            }
        }
        
        stage('Build Frontend') {
            steps {
                dir('front-end/koplaydev') {
                    sh 'pwd'
                    sh 'ls'
                    sh 'docker build -t frontend-image .'
                    sh 'docker-compose -f docker-compose.override.yml up -d'
                }
            }
        }

        stage("rm back container"){
            steps{
                script{
                    def isBack = sh(script: "docker ps -a -q -f name=${BACK_CONTAINER_NAME}", returnStdout: true).trim()
                        if(isBack){
                            echo "Stopping and removing running container ${BACK_CONTAINER_NAME}"
                            sh "docker stop ${BACK_CONTAINER_NAME}"
                            sh "docker rm ${BACK_CONTAINER_NAME}"
                        }
                }
            }
        }
        
        stage('Build Backend') {
            steps {
                dir('back-end/koplaydev') {
                    sh 'pwd'
                    sh 'ls'
                    sh 'docker build -t backend-image .'
                    sh 'docker run -d --name backend -p 127.0.0.1:8080:8080 backend-image'
                }
            }
        }
    }
}

```

### 2. MySQL,Redis
원래 MySQL,Redis,Nginx를 한 docker-compose파일로 설치했었으나, Openvidu를 설치하는 과정에서 Nginx가 추가로 설치되어 MySQL과 Redis만 설치하는 방향으로 인프라 구성. 

a. docker-compose.yml \
[MySQL,Redis 설치용 docker-compose.yml](docker-compose.yml)

### 3. Openvidu, Nginx

**Openvidu**

Openvidu는 OnPremise 환경으로 설치. \
CERTIFICATE_TYPE=letsencrypt.로 SSL 설정을 진행.\
구체적인 과정은 공식문서 참고 \
https://docs.Openvidu.io/en/2.30.0/deployment/ce/on-premises/

**Nginx 설정**

Openvidu 공식 문서대로 설치를 진행하면 Nginx가 설치됨. \
해당 Nginx에 frontend, backend, jenkins의 리버스 프록시 설정을 추가함

a. default.conf
파일 위치는 컨테이너 내부 기준 /etc/nginx/conf.d/default.conf \
[default.conf](InfraSettingCodes/default.conf)

**Openvidu webApp 설정** \

공식 문서를 따라서 Openvidu를 설치한다면 기본적으로 프론트 엔드 역할을 하는 openvidu-app-1 컨테이너가 생긴다. EC2의 /opt/openvidu/docker-compose.override.yml 파일을 수정하면 해당 컨테이너를 내가 개발한 프론트 엔드 서버로 구성할 수 있다. \
[docker-compose.override.yml](front-end/koplaydev/docker-compose.override.yml)

**⚠️ 주의사항:** Openvidu를 설치하는 과정에서 해당 위치에 **Openvidu를 위한** docker-compose.yml파일이 생성되는데 이는 수정하지 말 것.

해당 파일 : [docker-compose.yml for Openvidu](front-end/koplaydev/docker-compose.yml)

### 부록 - Frontend,Backend Dockerfile
Frontend Dockerfile의 경우 docker-compose.override.yml으로 배포했고, Backend의 경우 jenkins pipeline script에서 직접 명령어를 입력하여 도커를 올렸음. 구체적인 과정은 jenkins pipeline script를 참고할것

1. Frontend Dockerfile \
[Frontend Dockerfile](front-end/koplaydev/Dockerfile)
2. Backend Dockerfile \
[Backend Dockerfile](back-end/koplaydev/Dockerfile)

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
