import { XMarkIcon } from '@heroicons/react/24/outline';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useRecoilState } from "recoil"
import { modalState, movieState } from "../atoms/modalAtom"
import { Element, Genre } from '../typing';
import { FaPlay, FaVolumeMute, FaVolumeOff, FaVolumeUp } from 'react-icons/fa';
import { PlusIcon } from '@heroicons/react/20/solid';
import { HandThumbUpIcon } from '@heroicons/react/24/outline';



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
            className='fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide'
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
                        muted
                    />
                    <div className='absolute bottom-10 flex w-full items-center justify-between px-10'>
                        <div className='flex space-x-2'>
                            <button className='flex items-center gap-x-2 rounded bg-white px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6]'>
                                <FaPlay className='h-7 w-7 text-black' />
                                Play
                            </button>

                            <button className='modalButton'><PlusIcon className='w-7 h-7' /></button>
                            <button className='modalButton'><HandThumbUpIcon className='w-7 h-7' /></button>

                        </div>
                        <button className='modalButton' onClick={() => setMuted(!muted)}>
                            {muted ? (
                                <FaVolumeMute className='h-6 w-6' />
                            ) : (
                                <FaVolumeUp className='h-6 w-6' />
                            )}
                        </button>
                    </div>
                </div>
                <div className='flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8'>
                    <div className='space-y-6 text-lg'>
                        <div className='flex items-center space-x-2 text-sm'>
                            <p className='font-semibold text-green-400'>{movie?.vote_average * 10}% Match</p>
                            <p className='font-light'>{movie?.release_date.split("-").join("/") || movie?.first_air_date.split("-").join("/")}</p>
                            <div className='flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs'>
                                HD
                            </div>
                        </div>

                        <div className='flex flex-col gap-x-10 gap-y-4 font-light md:flex-row'>
                            <p className='w-5/6'>{movie?.overview}</p>
                            <div className='flex flex-col space-y-3 text-sm'>
                                <div>
                                    <span className='text-[gray]'>Genres: </span>
                                    {genres?.map((genre) => genre.name).join(", ")}
                                </div>
                                <div>
                                    <span className='text-[gray]'>Original Language: </span>
                                    {movie?.original_language.toUpperCase()}
                                </div>
                                <div>
                                    <span className='text-[gray]'>Vote Average: </span>
                                    {movie?.vote_average}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </Modal>
    )
}

export default CustomModal