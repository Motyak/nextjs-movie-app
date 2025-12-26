"use client"

import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "@/app/HorizontalCarousel.css"

export default function HorizontalCarousel({children}: Readonly<{children: React.ReactNode}>) {
    const settings = {
        infinite: false,
        // slidesToShow: 7.5,
        slidesToScroll: 5,
        variableWidth: true,
    }
    return (
        <div className="slider-container">
            <Slider {...settings}>
                {children}
            </Slider>
        </div>
    )
}
