import axios from "axios"
const API_URL  =  "http://localhost:8080"//숨겨야함
// import { getCookie } from './cookie'; // 쿠키 유틸리티 함수 가져오기

function Axios() {
//   const token = getCookie('authorization');
  const instance = axios.create(
    {
      baseURL: API_URL,
      headers: {
        "Content-Type": "application/json;charset=utf-8",
         //"Authorization" : ""   
      }
    }
  );
  return instance;
}
export { Axios }