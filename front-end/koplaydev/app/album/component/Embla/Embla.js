"use client";
import { useState, useEffect } from "react";
import EmblaCarousel from "./EmblaCarousel";
import "./embla.scss";
import album from "@/app/axios/album";

export default function Embla() {
  const [slides, setSlides] = useState([]);
  const OPTIONS = { loop: true };

  useEffect(() => {
    const fetchAlbumData = async () => {
      const data = await album();
      console.log(data);
      if (data) {
        setSlides(data);
        console.log(slides);
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
