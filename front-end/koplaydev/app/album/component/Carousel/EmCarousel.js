import "./embla.module.scss";
import EmblaCarousel from "./EmblaCarousel";
export default function EmCarousel() {
  const OPTIONS = { loop: true };
  const SLIDE_COUNT = 5;
  //   const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
  const SLIDES = [
    "/Back.png",
    "/china-3.png",
    "/path/to/image3.jpg",
    "/path/to/image4.jpg",
    "/path/to/image5.jpg",
  ];
  return (
    <>
      <EmblaCarousel slides={SLIDES} options={OPTIONS} />
    </>
  );
}
