// 전역 변수 선언
var OV; // OpenVidu 객체를 저장할 변수
var session; // 현재 세션 객체를 저장할 변수
let model, faceCanvas, w, h; // 모델, 캔버스, 너비, 높이 변수 선언

// 세션에 참가하는 함수
function joinSession() {
    // 세션 ID와 사용자 이름을 입력 폼에서 가져옴
    var mySessionId = document.getElementById("sessionId").value;
    var myUserName = document.getElementById("userName").value;

    // OpenVidu 객체 생성
    OV = new OpenVidu();
    // 세션 초기화
    session = OV.initSession();

    // 새 스트림이 생성될 때 호출되는 이벤트 리스너 등록
    session.on('streamCreated', event => {
        // 스트림을 구독하고 비디오 요소를 추가
        var subscriber = session.subscribe(event.stream, 'video-container');
        subscriber.on('videoElementCreated', event => {
            // 비디오 요소가 생성되면 사용자 데이터 추가 및 얼굴 메쉬 초기화
            appendUserData(event.element, subscriber.stream.connection);
            initFaceMesh(event.element); // 아바타 필터 초기화
        });
    });

    // 스트림이 파괴될 때 호출되는 이벤트 리스너 등록
    session.on('streamDestroyed', event => {
        removeUserData(event.stream.connection); // 사용자 데이터 제거
    });

    // 예외 발생 시 호출되는 이벤트 리스너 등록
    session.on('exception', (exception) => {
        console.warn(exception); // 예외 경고 출력
    });

    // 세션에 연결하고 토큰을 사용하여 세션에 참가
    getToken(mySessionId).then(token => {
        session.connect(token, { clientData: myUserName })
            .then(() => {
                // 세션에 성공적으로 연결되면 레이아웃 설정
                document.getElementById('session-title').innerText = mySessionId;
                document.getElementById('join').style.display = 'none';
                document.getElementById('session').style.display = 'block';

                // 퍼블리셔 초기화 및 설정
                var publisher = OV.initPublisher('video-container', {
                    audioSource: undefined, // 오디오 소스 설정 (기본 마이크 사용)
                    videoSource: undefined, // 비디오 소스 설정 (기본 웹캠 사용)
                    publishAudio: true,  	// 오디오 발행 여부 설정
                    publishVideo: true,  	// 비디오 발행 여부 설정
                    resolution: '1280x480',  // 비디오 해상도 설정
                    frameRate: 120,			// 비디오 프레임 속도 설정
                    insertMode: 'APPEND',	// 비디오 삽입 모드 설정
                    mirror: false       	// 비디오 미러링 여부 설정
                });

                // 퍼블리셔의 비디오 요소가 생성되면 호출되는 이벤트 리스너 등록
                publisher.on('videoElementCreated', function (event) {
                    initMainVideo(event.element, myUserName);
                    appendUserData(event.element, myUserName);
                    event.element['muted'] = true;
                    initFaceMesh(event.element); // 아바타 필터 초기화
                });

                // 스트림 발행
                session.publish(publisher);
            })
            .catch(error => {
                console.log('There was an error connecting to the session:', error.code, error.message);
            });
    });
}

function initFaceMesh(videoElement) {
    const webcam = videoElement;
    webcam.addEventListener('loadeddata', () => {
        const canvas = document.getElementById('faceCanvas');
		const mainVideo = document.querySelector('#main-video');
        function resizeCanvas() {
            // canvas.width = mainVideo.videoWidth;
			// canvas.height = mainVideo.videoHeight;
			canvas.width = webcam.width;
			canvas.height = webcam.height;
        }

        resizeCanvas();
        console.log('Canvas width:', canvas.width);
        console.log('Canvas height:', canvas.height);

        // 비디오 크기 변경 시 캔버스 크기 조정
        webcam.onresize = resizeCanvas;

        async function main() {
            try {
                // FaceMesh 모델 로드
                model = await facemesh.load({
                    maxContinuousChecks: 5,
                    detectionConfidence: 0.9,
                    maxFaces: 2,
                    iouThreshold: 0.3,
                    scoreThreshold: 0.75
                });

                console.log("Facemesh model loaded.");

                function renderPredictions() {
                    requestAnimationFrame(renderPredictions);
                    model.estimateFaces(webcam).then(predictions => {
                        if (predictions.length > 0) {
                            console.log("Face detected.");
                            const positionBufferData = predictions[0].scaledMesh.reduce((acc, pos) => acc.concat(pos), []);
                            if (!faceCanvas) {
                                const props = {
                                    id: 'faceCanvas',
                                    textureFilePath: './resources/assets/myCharacter.png', // 경로 확인
                                    w: canvas.width,
                                    h: canvas.height
                                };
                                faceCanvas = new FacePaint(props);
                                console.log("FacePaint initialized.");
                            }
                            faceCanvas.render(positionBufferData);
                        } else {
                            console.log("No face detected.");
                        }
                    });
                }

                renderPredictions();
            } catch (e) {
                console.error(e);
            }
        }

        main();
    });
}


// 세션을 떠나는 함수
function leaveSession() {
    // 세션을 떠나고 세션을 끊음
    session.disconnect();

    // 사용자 데이터 제거
    removeAllUserData();

    // 'Join session' 페이지로 돌아가기
    document.getElementById('join').style.display = 'block';
    document.getElementById('session').style.display = 'none';
}

// 페이지를 떠나기 전에 세션을 끊는 함수
window.onbeforeunload = function () {
    if (session) session.disconnect();
};

/* OpenVidu 메서드들 */

// 세션에 참가하는 함수
function joinSession() {
	var mySessionId = document.getElementById("sessionId").value;
	var myUserName = document.getElementById("userName").value;

	// OpenVidu 객체 생성
	OV = new OpenVidu();

	// 세션 초기화
	session = OV.initSession();

	// 새로운 스트림이 생성될 때 호출되는 이벤트 리스너 등록
	session.on('streamCreated', event => {
		// 스트림을 구독하고 비디오 요소를 추가
		var subscriber = session.subscribe(event.stream, 'video-container');
		// 비디오 요소가 생성되면 사용자 데이터 추가
		subscriber.on('videoElementCreated', event => {
			appendUserData(event.element, subscriber.stream.connection);
		});
	});

	// 스트림이 파괴될 때 호출되는 이벤트 리스너 등록
	session.on('streamDestroyed', event => {
		// 사용자 데이터 제거
		removeUserData(event.stream.connection);
	});

	// 예외 발생 시 호출되는 이벤트 리스너 등록
	session.on('exception', (exception) => {
		console.warn(exception); // 예외 경고 출력
	});

	// 세션에 연결하고 토큰을 사용하여 세션에 참가
	getToken(mySessionId).then(token => {
		session.connect(token, { clientData: myUserName })
			.then(() => {
				// 세션에 성공적으로 연결되면 레이아웃 설정
				document.getElementById('session-title').innerText = mySessionId;
				document.getElementById('join').style.display = 'none';
				document.getElementById('session').style.display = 'block';

				// 퍼블리셔 초기화 및 설정
				var publisher = OV.initPublisher('video-container', {
					audioSource: undefined, // 오디오 소스 설정 (기본 마이크 사용)
					videoSource: undefined, // 비디오 소스 설정 (기본 웹캠 사용)
					publishAudio: true,  	// 오디오 발행 여부 설정
					publishVideo: true,  	// 비디오 발행 여부 설정
					resolution: '640x480',  // 비디오 해상도 설정
					frameRate: 30,			// 비디오 프레임 속도 설정
					insertMode: 'APPEND',	// 비디오 삽입 모드 설정
					mirror: false       	// 비디오 미러링 여부 설정
				});

				// 퍼블리셔의 비디오 요소가 생성되면 호출되는 이벤트 리스너 등록
				publisher.on('videoElementCreated', function (event) {
					initMainVideo(event.element, myUserName);
					appendUserData(event.element, myUserName);
					event.element['muted'] = true;
				});

				// 스트림 발행
				session.publish(publisher);
			})
			.catch(error => {
				console.log('There was an error connecting to the session:', error.code, error.message);
			});
	});
}

// 세션을 떠나는 함수
function leaveSession() {
	// 세션을 떠나고 세션을 끊음
	session.disconnect();

	// 사용자 데이터 제거
	removeAllUserData();

	// 'Join session' 페이지로 돌아가기
	document.getElementById('join').style.display = 'block';
	document.getElementById('session').style.display = 'none';
}

// 페이지를 떠나기 전에 세션을 끊는 함수
window.onbeforeunload = function () {
	if (session) session.disconnect();
};

// 애플리케이션 관련 메서드들

// 페이지 로드 시 참가자 정보 생성
window.addEventListener('load', function () {
	generateParticipantInfo();
});

// 참가자 정보 생성 함수
function generateParticipantInfo() {
	document.getElementById("sessionId").value = "SessionA";
	document.getElementById("userName").value = "Participant" + Math.floor(Math.random() * 100);
}

// 사용자 데이터를 비디오 요소 아래에 추가하는 함수
function appendUserData(videoElement, connection) {
	var userData;
	var nodeId;
	if (typeof connection === "string") {
		userData = connection;
		nodeId = connection;
	} else {
		userData = JSON.parse(connection.data).clientData;
		nodeId = connection.connectionId;
	}
	var dataNode = document.createElement('div');
	dataNode.className = "data-node";
	dataNode.id = "data-" + nodeId;
	dataNode.innerHTML = "<p>" + userData + "</p>";
	videoElement.parentNode.insertBefore(dataNode, videoElement.nextSibling);
	addClickListener(videoElement, userData);
}

// 사용자 데이터를 제거하는 함수
function removeUserData(connection) {
	var dataNode = document.getElementById("data-" + connection.connectionId);
	dataNode.parentNode.removeChild(dataNode);
}

// 모든 사용자 데이터를 제거하는 함수
function removeAllUserData() {
	var nicknameElements = document.getElementsByClassName('data-node');
	while (nicknameElements[0]) {
		nicknameElements[0].parentNode.removeChild(nicknameElements[0]);
	}
}

// 비디오 요소를 클릭할 때 메인 비디오로 전환하는 함수
function addClickListener(videoElement, userData) {
	videoElement.addEventListener('click', function () {
		var mainVideo = $('#main-video video').get(0);
		if (mainVideo.srcObject !== videoElement.srcObject) {
			$('#main-video').fadeOut("fast", () => {
				$('#main-video p').html(userData);
				mainVideo.srcObject = videoElement.srcObject;
				$('#main-video').fadeIn("fast");
			});
		}
	});
}

// 메인 비디오를 초기화하는 함수
function initMainVideo(videoElement, userData) {
	document.querySelector('#main-video video').srcObject = videoElement.srcObject;
	document.querySelector('#main-video p').innerHTML = userData;
	document.querySelector('#main-video video')['muted'] = true;
}

/**
 * --------------------------------------------
 * 애플리케이션 서버에서 토큰 가져오기
 * --------------------------------------------
 * 아래 메서드들은 세션과 토큰을 애플리케이션 서버에서 요청합니다.
 * 이는 OpenVidu 배포를 안전하게 유지합니다.
 *
 * 이 샘플 코드에서는 사용자 제어가 전혀 없습니다. 누구나 애플리케이션 서버 엔드포인트에 접근할 수 있습니다!
 * 실제 프로덕션 환경에서는 애플리케이션 서버가 사용자를 식별하여 엔드포인트에 접근을 허용해야 합니다.
 *
 * OpenVidu 애플리케이션 서버 통합에 대해 더 알아보려면 https://docs.openvidu.io/en/stable/application-server를 방문하십시오.
 */

var APPLICATION_SERVER_URL = "http://localhost:5000/";

// 세션 ID를 사용하여 토큰을 가져오는 함수
function getToken(mySessionId) {
	return createSession(mySessionId).then(sessionId => createToken(sessionId));
}

// 세션을 생성하는 함수
function createSession(sessionId) {
	return new Promise((resolve, reject) => {
		$.ajax({
			type: "POST",
			url: APPLICATION_SERVER_URL + "api/sessions",
			data: JSON.stringify({ customSessionId: sessionId }),
			headers: { "Content-Type": "application/json" },
			success: response => resolve(response), // The sessionId
			error: (error) => reject(error)
		});
	});
}

// 세션 ID를 사용하여 토큰을 생성하는 함수
function createToken(sessionId) {
	return new Promise((resolve, reject) => {
		$.ajax({
			type: 'POST',
			url: APPLICATION_SERVER_URL + 'api/sessions/' + sessionId + '/connections',
			data: JSON.stringify({}),
			headers: { "Content-Type": "application/json" },
			success: (response) => resolve(response), // The token
			error: (error) => reject(error)
		});
	});
}
