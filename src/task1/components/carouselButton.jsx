import React from 'react'
const slideButton = require('../images/next.png')

export function CarouselButton({ direction, moveSlide }) {
    return (
        <button
            onClick={moveSlide}
            className={direction === "next" ? "btn-slide next" : "btn-slide prev"}>
            <img src={slideButton} alt="" />
        </button>
    )
}