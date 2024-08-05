"use client";
import { useState, useEffect } from "react";
import EmblaCarousel from "./EmblaCarousel";
import "./embla.scss";
import albumAxios from "@/app/axios/albumAxios";

export default function Embla() {
  const [slides, setSlides] = useState([]);
  const OPTIONS = { loop: true };

  useEffect(() => {
    const fetchAlbumData = async () => {
      const data = await albumAxios();
      if (data) {
        setSlides(data);
      }
    };

    fetchAlbumData();
  }, []);

  return (
    <>
      <EmblaCarousel slides={slides} options={OPTIONS} />
    </>
  );
}
