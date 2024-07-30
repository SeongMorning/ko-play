"use client";
import EmblaCarousel from "./EmblaCarousel";
import "./embla.scss";
export default function Embla() {
  const OPTIONS = { loop: true };
  const SLIDE_COUNT = 7;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
  //   const SLIDES = [
  //     "/public/Back.png",
  //     "/public/Back.png",
  //     "/public/Back.png",
  //     "/public/Back.png",
  //     "/public/Back.png",
  //     "/public/Back.png",
  //     "/public/Back.png",
  //   ];

  return (
    <>
      <EmblaCarousel slides={SLIDES} options={OPTIONS} />
    </>
  );
}
