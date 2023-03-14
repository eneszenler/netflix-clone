import { useEffect, useState } from "react"
import { Movie } from "../typing"

interface Props {
    netflixOriginals: Movie[]
}

const Banner = ({ netflixOriginals }: Props) => {
    const [movie, setmovie] = useState<Movie | null>(null)

    useEffect(() => {
        setmovie(netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)])
    }, [netflixOriginals])

    const handleClick = () => {
        console.log("asd")
    }

    return (
        <div></div>
    )
}

export default Banner