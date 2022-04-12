import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { CarSliderItem } from "./CarSliderItem";
import { useFela } from 'react-fela'
import { Flex, Icon, Block, useTheme, Click } from "vcc-ui";
import { Car } from "../types";

const rule = (props: any) => ({
    listStyle: 'none',
    display: 'flex!important',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: '0!important',
    '& li': {
        margin: '0px 4px',
        borderRadius: '50%',
        overflow: 'hidden',
        display: 'block',
        boxSizing: 'border-box',
        background: 'rgb(235, 235, 235)',
        width: '8px',
        height: '8px',
        transition: 'background 300ms ease 0s',
        '& button': {
            opacity: 0,
            cursor: 'pointer'
        },
    },
    '& .slick-active': {
        background: 'rgb(20, 20, 20)'
    }
})

const DEFAULT_SLIDE_TO_SHOW = 4;

const CarSlider: React.FC<{ cars: Car[] | undefined }> = ({ cars = [] }) => {
    const {css} = useFela()
    const sliderRef = useRef<Slider>(null);
    const [isNextDisabled, setIsNextDisabled] = useState(false);
    const [isPrevDisabled, setIsPrevDisabled] = useState(true);
    useEffect(() => {
        if(cars.length <= DEFAULT_SLIDE_TO_SHOW) {
            setIsNextDisabled(true);
            setIsPrevDisabled(true);
        } else {
            setIsNextDisabled(false);
            setIsPrevDisabled(true);
        }
    }, [cars])
    const beforeChange = (prev: number, next: number) => {
        setIsNextDisabled(next === (cars.length - slidesToShowAmount));
        setIsPrevDisabled(next === 0);
    };
    const next = () => {
        sliderRef.current?.slickNext()
    };
    const previous = () => {
        sliderRef.current?.slickPrev()
    };
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 600)
        }
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, [isMobile])
    const slidesToShowAmount =  Math.min(cars.length, isMobile ? 1.1 : DEFAULT_SLIDE_TO_SHOW);
    return (
        <>
            <Slider 
                dots={isMobile}
                speed={500}
                slidesToShow={slidesToShowAmount}
                slidesToScroll={1}
                arrows={false}
                lazyLoad="progressive"
                beforeChange={beforeChange}
                centerMode={isMobile? true : false}
                centerPadding={isMobile? '8%' : '0'}
                dotsClass={css(rule)} 
                ref={sliderRef} className={css({'& .slick-slide': {display:'flex', justifyContent: 'center'}})}>
                    {cars?.map((car, i) => (
                        <Flex extend={{ maxWidth: 400 }} key={i}>
                            <Block extend={{margin: '0 10px', width: 'auto'}}>
                                <CarSliderItem car={car} key={i} />
                            </Block>
                        </Flex>
                    ))}
            </Slider>
            {!isMobile && (
                <Flex extend={{ flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <Flex>
                        <Click extend={{ opacity: isPrevDisabled  ? 0.5 : 1, marginRight: '5px' }} disabled={isPrevDisabled}
                        onClick={previous}>
                            <Icon type="media-previous-40" />
                        </Click>
                    </Flex>
                    <Flex>
                        <Click extend={{ opacity: isNextDisabled ? 0.5 : 1, marginRight: '20px' }} disabled={isNextDisabled}
                        onClick={next}>
                            <Icon type="media-next-40" />
                        </Click>
                    </Flex>
                </Flex>
            )}
        </>
    );
}

export default CarSlider;
