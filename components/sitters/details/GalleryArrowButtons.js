import React, { useCallback, useEffect, useState } from 'react'
import Image from "next/image";
import previous from "/public/assets/icons/icon-previous.svg";
import next from "/public/assets/icons/icon-next.svg";

export const usePrevNextButtons = (emblaApi) => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollPrev()
  }, [emblaApi])

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback((emblaApi) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onSelect(emblaApi)
    emblaApi.on('reInit', onSelect).on('select', onSelect)
  }, [emblaApi, onSelect])

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  }
}

export const PrevButton = (props) => {
  const { children, ...restProps } = props

  return (
    <button
      className="embla__button embla__button--prev w-[56px] h-[56px] bg-ps-white rounded-full flex justify-center items-center max-md:opacity-50"
      type="button"
      {...restProps}
    >
       <Image src={previous} alt="previous button" />
      {children}
    </button>
  )
}

export const NextButton = (props) => {
  const { children, ...restProps } = props

  return (
    <button
      className="embla__button embla__button--next w-[56px] h-[56px] bg-ps-white rounded-full flex justify-center items-center max-md:opacity-50"
      type="button"
      {...restProps}
    >
      <Image src={next} alt="next button" />
      {children}
    </button>
  )
}
