"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import CardFrontImage from "./CardFrontImage";
import styles from "./WordRainStart.module.scss";
import { motion } from "framer-motion";

export default function WordRainStart() {
  const [wordObjectList, setWordObjectList] = useState([
    {
      left: Math.random() * 60 + 10,
      imgSrc: "/korea-3.png",
    },
    {
      left: Math.random() * 60 + 10,
      imgSrc: "/korea-3.png",
    },
    {
      left: Math.random() * 60 + 10,
      imgSrc: "/korea-3.png",
    },
    {
      left: Math.random() * 60 + 10,
      imgSrc: "/korea-3.png",
    },
    {
      left: Math.random() * 60 + 10,
      imgSrc: "/korea-3.png",
    },
    {
      left: Math.random() * 60 + 10,
      imgSrc: "/korea-3.png",
    },
    {
      left: Math.random() * 60 + 10,
      imgSrc: "/korea-3.png",
    },
    {
      left: Math.random() * 60 + 10,
      imgSrc: "/korea-3.png",
    },
    {
      left: Math.random() * 60 + 10,
      imgSrc: "/korea-3.png",
    },
    {
      left: Math.random() * 60 + 10,
      imgSrc: "/korea-3.png",
    },
  ]);

  const [resultList, setResultList] = useState([1, 0, 0, 1, 0, 0, 0, 1, 0, 0]);
  const [wrong, setWrong] = useState([]);
  const [cnt, setCnt] = useState(0);

  useEffect(()=>{
    console.log(resultList.filter((data)=> data===1).length)
    console.log(resultList.filter((data)=> data===-1).length)
  },[resultList])

  const changeResultList = useCallback((index) => {
    setCnt(cnt+1);
    if(resultList[index] !== 1){
      let copy2 = [...resultList]
      copy2[index] = -1;
      setResultList(copy2);
      let wrong2 = [...wrong];
      wrong2.push(wordObjectList[index]);
      setWrong(wrong2);
    }
  });


  return (
    <div>
      {wordObjectList.map((data, index) => {
        return (
          <motion.div
          className={styles.CardMain}
          style={{
            left: `${data.left}%`,
            top: "-17%",
            width: "10%",
            height: "17%",
          }}
          animate={{
            translateY: "118vh",
            transition: {
              duration: 5,
              delay: index * 1,
            },
          }}
          onViewportLeave={() => changeResultList(index)}
          >
            <CardFrontImage imgSrc={data.imgSrc} />
          </motion.div>
        );
      })}
    </div>
  );
}
