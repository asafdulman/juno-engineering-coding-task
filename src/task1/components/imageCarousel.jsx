import { useEffect, useState } from "react";
import { fetchImageUrls, fetchImage } from "../../api/index";
import { CarouselButton } from './carouselButton'
import { EmptyState } from "./emptyState";
import { Loader } from "./loader";
import Box from '@material-ui/core/Box';

export function ImageCarousel() {
  const [imageUrl, setImageUrl] = useState()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [imagesLength, setImagesLength] = useState()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getImagesLength()
    getImage()
  }, [])

  useEffect(() => {
    getImage()
  }, [currentIndex])

  const nextSlide = () => {
    currentIndex !== imagesLength - 1 ? setCurrentIndex(currentIndex + 1) : setCurrentIndex(0)
  }

  const prevSlide = () => {
    currentIndex ? setCurrentIndex(currentIndex - 1) : setCurrentIndex(imagesLength - 1)
  }

  const getImage = async () => {
    setIsLoading(true)
    const image = await fetchImage(currentIndex)
    setImageUrl(image)
    setIsLoading(false)
  }

  const getImagesLength = async () => {
    const images = await fetchImageUrls()
    setImagesLength(images.length)
  }

  const renderPrevNextButtons = () => {
    return (
      <>
        <CarouselButton moveSlide={() => nextSlide()} direction={"next"} />
        <CarouselButton moveSlide={() => prevSlide()} direction={"prev"} />
      </>
    )
  }

  const renderImageContainer = () => {
    return (
      <div className={"image-box"}>
        <Box
          component="img"
          sx={{
            height: 233,
            width: 350,
            maxHeight: { xs: 233, md: 167 },
            maxWidth: { xs: 350, md: 250 },
          }}
          alt=''
          src={imageUrl}
        />
        {renderPrevNextButtons()}
      </div>
    )
  }

  return (
    <>
      {
        !imageUrl ? <EmptyState /> :
          <div className="carousel-box">
            {isLoading ? <Loader /> : renderImageContainer()}
          </div>
      }
    </>
  )
}