// src/ApiTest.js

import React, { useEffect, useState } from 'react';
import { Axios } from './utils/http-commons';
import axios from 'axios';

const ApiTest = () => {
  //const [getData, setGetData] = useState([]);
   const [postData, setPostData] = useState(null);
//   const [putData, setPutData] = useState(null);
//   const [deleteStatus, setDeleteStatus] = useState(null);


  // POST 요청
  const sendPostData = async () => {
 
    const formData = new FormData();
    formData.append('id', 'gy'); // 사용자 이름 추가
    formData.append('password', '1234'); // 파일 추가
    axios.post('http://localhost:8080/login', 
        formData,{ withCredentials: true,} // 쿠키 포함을 위해 설정
      )
      .then((res)=>{
        console.log(res);
          //쿠키의 값을 읽음
        const token = getCookieValue('Authorization');
        console.log('Auth Token:', token);    
      }).catch((e)=>console.log(e));
 
  };


/**
 * 쿠키 이름을 받아서 해당 쿠키의 값을 반환하는 함수
 * @param {string} name - 찾고자 하는 쿠키의 이름
 * @returns {string|null} - 쿠키의 값 또는 쿠키가 없을 경우 null
 */
function getCookieValue(name) {
    // 모든 쿠키 문자열을 ";"로 구분하여 배열로 변환
    const cookieArray = document.cookie.split(';');
  
    // 각 쿠키를 순회하여 목표 쿠키를 찾음
    for (let i = 0; i < cookieArray.length; i++) {
      // 각 쿠키 항목의 앞뒤 공백 제거
      const cookie = cookieArray[i].trim();
      console.log(cookieArray   );
      // 쿠키의 이름이 원하는 이름과 일치하는지 확인
      if (cookie.startsWith(name + '=')) {
        // 쿠키의 값을 추출하여 반환
        return cookie.substring(name.length + 1);
      }
    }
  
    // 쿠키가 없을 경우 null 반환
    return null;
  }
  

  
  // 마운트 시 데이터 가져오기
  useEffect(() => {
    // fetchGetData();
    sendPostData();
  }, []);

  return (
    <div>
      <h1>API Test</h1>
      <h2>GET 요청 결과</h2>
      {/* <ul>
        {getData.map((item) => (
          <li key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </li>
        ))}
      </ul> */}

      <h2>POST 요청 결과</h2>
      <button onClick={sendPostData}>POST 요청 보내기</button>
      {postData && (
        <div>
          <h3>{postData.title}</h3>
          <p>{postData.body}</p>
        </div>
      )}
{/* 
      <h2>PUT 요청 결과</h2>
      <button onClick={sendPutData}>PUT 요청 보내기</button>
      {putData && (
        <div>
          <h3>{putData.title}</h3>
          <p>{putData.body}</p>
        </div>
      )}

      <h2>DELETE 요청 결과</h2>
      <button onClick={sendDeleteRequest}>DELETE 요청 보내기</button>
      {deleteStatus && <p>{deleteStatus}</p>} */}
    </div>
  );
};

export default ApiTest;
