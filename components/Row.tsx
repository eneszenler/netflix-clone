import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"
import { useEffect, useRef, useState } from "react"
import { Movie } from "../typing"
import Thumbnail from "./Thumbnail"

interface Props {
    title: String
    data: Movie[]
}

const Row = ({ title, data }: Props) => {
    const rowRef = useRef<HTMLDivElement>(null)
    const [prev, setPrev] = useState(false)
    const [next, setNext] = useState(false)

    // const handleClick = (direction: String) => {
    //     setPrev(true)
    //     if (rowRef.current) {
    //         const { scrollLeft, clientWidth } = rowRef.current

    //         const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth

    //         rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" })
    //     }
    // }

    useEffect(() => {
        if (rowRef.current) {

            const scrollHandle = () => {
                if (rowRef.current) {
                    const isEnd = rowRef.current.scrollLeft + rowRef.current.offsetWidth === rowRef.current.scrollWidth
                    const isBegin = rowRef.current.scrollLeft === 0
                    setPrev(!isBegin)
                    setNext(!isEnd)
                }
            }

            scrollHandle()
            rowRef.current.addEventListener('scroll', scrollHandle)

            return () => {
                rowRef?.current?.removeEventListener('scroll', scrollHandle)
            }

        }
    }, [rowRef])

    const handleNext = () => {
        if (rowRef.current) {
            rowRef.current.scrollLeft += rowRef.current.offsetWidth
        }

    }

    const handlePrev = () => {
        if (rowRef.current) {
            rowRef.current.scrollLeft -= rowRef.current.offsetWidth
        }
    }

    return (
        <div className="h-40 space-y-0.5 md:space-y-2">
            <h2 className="cursor-pointer w-56 text-sm font-semibold text-link transition duration-200 hover:text-white md:text-2xl">{title}</h2>
            <div className="relative group md:-ml-2">
                <ChevronLeftIcon onClick={handlePrev}
                    className={`${!prev && "hidden"} absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 opacity-0 group-hover:opacity-100 cursor-pointer transition hover:scale-125`} />
                <div ref={rowRef} className="flex items-center space-x-0.5 overflow-x-scroll scrollbar-hide md:space-x-2.5 md:p-2 scroll-smooth">
                    {
                        data?.map(e => <Thumbnail data={e} key={e.id} />)
                    }
                </div>
                <ChevronRightIcon onClick={handleNext}
                    className={`${!next && "hidden"} absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 opacity-0 group-hover:opacity-100 cursor-pointer transition hover:scale-125`} />
            </div>
        </div>
    )
}

export default Row