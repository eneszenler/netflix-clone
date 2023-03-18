import Image from "next/image"
import { useRecoilState } from "recoil"
import { modalState, movieState } from "../atoms/modalAtom"
import { thumbnailBaseUrl } from "../constants/movie"
import { Movie } from "../typing"

interface Props {
    data: Movie
}
const Thumbnail = ({ data }: Props) => {
    const [currentMovie, setCurrentMovie] = useRecoilState(movieState)
    const [showModal, setShowModal] = useRecoilState(modalState)

    return (
        <div onClick={() => {
            setCurrentMovie(data)
            setShowModal(true)
        }} className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105">
            <Image src={`${thumbnailBaseUrl}${data?.backdrop_path || data?.poster_path}`} fill className="rounded-sm object-cover md:rounded" alt={data?.title || data?.name} />
        </div>
    )
}

export default Thumbnail