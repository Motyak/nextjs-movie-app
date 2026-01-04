"use client"

import Slider from "react-slick"
import "@/app/VerticalCarousel.css"

export default function VerticalCarousel({children}: Readonly<{children: React.ReactNode}>) {
    const settings = {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
        vertical: true,
        verticalSwiping: true,
        fade: true,
    }
    return (
        <div className="vertical-carousel">
            <Slider {...settings}>
                {/* {children} */}
                <p>1</p>
                <p>2</p>
            </Slider>
        </div>
    )
}
