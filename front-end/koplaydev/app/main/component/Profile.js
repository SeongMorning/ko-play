'use client'

import { useDispatch, useSelector } from "react-redux";
import styles from "./Profile.module.scss";
import { changeModalIdx } from "@/redux/slices/modalSlice";
import {motion} from 'framer-motion';
import ExpBar from "./ExpBar";
import axios from 'axios';
import { useEffect } from "react";


export default function Profile() {
  
  const token  = useSelector((state)=>state.token)
  const config = {
    headers: {
    Authorization: `${token}`
    },
    
  }
  axios.get('http://localhost:8080/student/info', null, config
  )
  .then((res) => {
    console.log('Response:', res);

    router.push("/main");
  })
  .catch((e) => {
    alert("로그인 실패");
    console.error('Error:', e);
  });
  const dispatch = useDispatch();
  return (
    <motion.div 
    className={styles.profile}
    whileHover={{
      scale : 1.05,
      background : 'rgba(255, 255, 255, 1)'
    }}
    onClick={()=>{
      dispatch(changeModalIdx(2));
    }}>
      <div className={styles.pictureBox}>
        <img src="hehe.png" />
      </div>
      <div className={styles.profileInfo}>
        <ExpBar/>
        <div>
          <span>레벨 </span>
          <span>이름 </span>
        </div>
        <span>총 게임수 : 13판</span>
        <span>열린코스튬 120/150</span>
      </div>
    </motion.div>
  );
}
