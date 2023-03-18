import { XMarkIcon } from '@heroicons/react/24/outline';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useRecoilState } from "recoil"
import { modalState, movieState } from "../atoms/modalAtom"
import { Element, Genre } from '../typing';


const CustomModal = () => {
    const [movie, setMovie] = useRecoilState(movieState)
    const [showModal, setShowModal] = useRecoilState(modalState)

    const [trailer, setTrailer] = useState('')
    const [muted, setMuted] = useState(true)
    const [genres, setGenres] = useState<Genre[]>([])
    const [addedToList, setAddedToList] = useState(false)

    useEffect(() => {
        if (!movie) return

        async function fetchMovie() {
            const data = await fetch(
                `https://api.themoviedb.org/3/${movie?.media_type === 'tv' ? 'tv' : 'movie'
                }/${movie?.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY
                }&language=en-US&append_to_response=videos`
            ).then((response) => response.json())
            if (data?.videos) {
                const index = data.videos.results.findIndex(
                    (element: Element) => element.type === 'Trailer'
                )
                setTrailer(data.videos?.results[index]?.key)
            }
            if (data?.genres) {
                setGenres(data.genres)
            }
        }

        fetchMovie()
    }, [movie])

    const handleClose = () => setShowModal(false);


    return (
        <Modal
            open={showModal}
            onClose={handleClose}
        >
            <>
                <button
                    onClick={handleClose}
                    className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818]"
                >
                    <XMarkIcon />
                </button>
                <div className="relative pt-[56.25%]">
                    <ReactPlayer
                        url={`https://www.youtube.com/watch?v=${trailer}`}
                        width="100%"
                        height="100%"
                        style={{ position: 'absolute', top: '0', left: '0' }}
                        playing
                        muted={muted}
                    />
                </div>
            </>
        </Modal>
    )
}

export default CustomModal