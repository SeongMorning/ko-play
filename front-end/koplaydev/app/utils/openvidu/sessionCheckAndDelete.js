
// OpenVidu 서버의 URL과 인증 정보 설정
const serverUrl = 'https://i11b302.p.ssafy.io';
const secret = 'koplay'; // OpenVidu 설치 시 설정한 secret 값

// Base64로 인코딩된 인증 헤더 생성
const encodedAuth = btoa('OPENVIDUAPP:' + secret);

// OpenVidu 서버에서 모든 세션 정보를 가져오는 함수
async function getAllSession() {
    try {
        const response = await fetch(`${serverUrl}/openvidu/api/sessions`, {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + encodedAuth,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const sessions = await response.json();
            // console.log('Active Sessions:', sessions);
            console.log(sessions.content.map(obj=>obj.sessionId));
            return sessions.content.map(obj=>obj.sessionId);
            // return sessions.map(obj => obj.sessionId);
        } else {
            console.error('Failed to fetch sessions:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error fetching sessions:', error);
    }
}


// const sessionId = '1';  // 종료하려는 세션의 ID

async function closeSession() {
    const promise = await getAllSession();
    const checkNowSessionInAllSession =promise.includes(window.sessionId.toString());
    // console.log(checkNowSessionInAllSession);
    if(checkNowSessionInAllSession){
        console.log("window.sessionId in allSession");
    }
    else{
        console.log("already deleted");
        return 0 ;
    }
    try {
        const response = await fetch(`${serverUrl}/openvidu/api/sessions/${window.sessionId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Basic ' + encodedAuth,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            console.log(`Session ${sessionId} closed successfully.`);
            delete window.sessionId;
        } else {
            console.error(`Failed to close session ${sessionId}:`, response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error closing session:', error);
    }
}

export default closeSession;

// 세션 종료 함수 호출
// closeSession();
// 세션 정보 확인하기
// getAllSession();
