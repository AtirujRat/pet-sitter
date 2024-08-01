import React from "react";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./GalleryArrowButtons";
import useEmblaCarousel from "embla-carousel-react";
import styles from "./Gallery.module.css";

export default function Gallery(props) {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className={`${styles.embla} sm:my-10 max-sm:mb-10`}>
      <div className={`${styles.embla__viewport} relative`} ref={emblaRef}>
        <div className={`${styles.embla__container} md:h-[25vw] h-[280px]`}>
          {slides.map((image, index) => {
            console.log(image);
            return (
              <div className={`${styles.embla__slide}`} key={index}>
                <img
                  src={image.image_url}
                  className="object-cover w-full h-full"
                />
              </div>
            );
          })}
        </div>
        <div
          className={`${styles.embla__controls} absolute top-[40%] w-full flex justify-center`}
        >
          <div
            className={`${styles.embla__buttons} flex justify-between w-full sm:px-20 px-4`}
          >
            <PrevButton
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
            />
            <NextButton
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
