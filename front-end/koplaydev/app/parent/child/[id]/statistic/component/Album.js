"use client";
import { useEffect, useState } from "react";
import parentChaildAlbumAxios from "@/app/axios/parentChildAlbumAxios";
import { motion } from "framer-motion";
import Embla from "@/app/album/component/Embla/Embla";
import EmblaCarousel from "@/app/album/component/Embla/EmblaCarousel";
import styles from "./Album.module.scss";

export default function Album(id) {
  const [slides, setSlides] = useState([]); // 앨범 데이터를 저장할 상태를 생성
  const OPTIONS = { loop: true };

  useEffect(() => {
    const fetchAlbumData = async () => {
      const data = await parentChaildAlbumAxios(id.id);
      if (data) {
        setSlides(data);
      }
    };

    fetchAlbumData();
  }, []);

  return (
    <>
      <div className={styles.albumContainer}>
        {slides.length > 0 ? (
          <EmblaCarousel slides={slides} options={OPTIONS} />
        ) : (
          "아이가 사진을 한장도 찍지 않았어요. 사진은 랭크 게임을 하면 찍을 수 있어요"
        )}
      </div>
    </>
  );
}
