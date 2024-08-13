"use client";
import { useEffect, useState } from "react";
import style from "./embla.scss";
import parentChaildAlbumAxios from "@/app/axios/parentChildAlbumAxios";
import { motion } from "framer-motion";

export default function Album(id) {
  const [slides, setSlides] = useState([]); // 앨범 데이터를 저장할 상태를 생성

  useEffect(() => {
    const fetchAlbumData = async () => {
      const data = await parentChaildAlbumAxios(id.id);
      console.log(data)

      if (data) {
        setSlides(data);
      }
    };

    fetchAlbumData();
  }, []);

  return (
    <>
      <div className={style.albumContainer}>
        {slides.length > 0 ? (
          slides.map((slide, index) => (
            <motion.div key={index} className={style.albumDiv}>
              <motion.h5><img src={slide.snapshot} alt={slide.snapshot} /></motion.h5>
              <motion.h2><p>{slide.createAt}</p></motion.h2>
            </motion.div>
          ))
        ) : ('비어있음')}
      </div>
    </>
  );
}
