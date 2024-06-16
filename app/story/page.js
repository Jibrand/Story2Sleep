'use client'

import Image from "next/image";
import JibranImage from '../../public/assests/jibran.png';
import { useState, useRef, useEffect } from 'react';
import { FaBackward, FaForward, FaPlay, FaPause } from 'react-icons/fa';

const Page = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef(null);
    const [selectedLanguage, setSelectedLanguage] = useState('en-US'); 
    const [selectedSpeaker, setSelectedSpeaker] = useState('default');  

    const handlePlayPause = () => {
        const audio = audioRef.current;
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = () => {
        const audio = audioRef.current;
        setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
        const audio = audioRef.current;
        setDuration(audio.duration);
    };

    const handleBackward = () => {
        const audio = audioRef.current;
        audio.currentTime = Math.max(0, audio.currentTime - 10);
    };

    const handleForward = () => {
        const audio = audioRef.current;
        audio.currentTime = Math.min(duration, audio.currentTime + 10);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleLanguageChange = (event) => {
        setSelectedLanguage(event.target.value);
    };

    const handleSpeakerChange = (event) => {
        setSelectedSpeaker(event.target.value);
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.code === 'Space') {
                event.preventDefault(); // Prevent scrolling on space bar press
                handlePlayPause();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isPlaying]); // Dependency array ensures the event listener is added/removed appropriately

    return (
        <div className="container mx-auto text-center p-4">
            <div className="bg-gray-800 flex items-center p-3 rounded-2xl shadow-lg max-w-2xl mx-auto mb-8">
                <span className="mr-4 sm:block hidden">
                    <Image src='/assests/book_emoji_reading.svg'  className='h-8 w-8' alt="emoji" width={32} height={32} />
                </span>
                <p className="font-bold text-3xl text-center flex-grow">A magical tale of mythical creatures and ancient spell</p>
            </div>

            {/* <div className="flex items-center justify-center gap-4 mb-4">
                <label htmlFor="language" className="text-gray-500 font-medium mr-2">Language:</label>
                <select className="select select-success w-full max-w-[10rem]">
                    <option disabled selected>English</option>
                    <option>Urdu</option>
                    <option>Hindi</option>
                    <option>Spanish</option>
                </select>
                <label htmlFor="speaker" className="text-gray-500 font-medium mr-2">Speaker:</label>
                <select className="select select-success w-full max-w-[10rem]">
                    <option disabled selected>Mark</option>
                    <option>Grace</option>
                    <option>Kim</option>
                    <option>Jhon</option>
                </select>
            </div> */}

            <div className="flex flex-col md:flex-row items-start">
                <div className="md:w-[20%] sm:block hidden">
                    <Image src='/assests/book.JPG' alt="Book" width={200} height={200} className=" lg:fixed   object-cover mb-4 rounded-xl" />
                </div>
                <div className="md:w-3/4 p-4">
                    <p className="text-gray-400 text-base mb-6 justify-start text-left text-lg novel-paragraph">
                        Once upon a time, in a land far, far away, there lived mythical creatures in harmony with nature. Ancient spells protected the land, and magic was a part of everyday life. Join us on this magical journey and experience the wonders of this enchanted world.
                    </p>
                  </div>
            </div>

            <footer className="p-4 mt-8 mb-10">
                <div className="flex items-center justify-center">
                    <p className="text-gray-400 mr-2">Made with</p> <span className="text-gray-700 text-xl mr-2"> <Image src='/assests/book_emoji_reading.svg'  className="h-6 w-6 rounded-full" alt="emoji" width={24} height={24} /> </span> <p className="text-gray-400 mr-2">by</p> <a href="https://www.linkedin.com/in/muhammad-jibran220/" target='_blank' rel='noopener noreferrer' className="text-green-400 font-bold underline mr-2">Jibran</a> <Image src='/assests/jibran.png' className="h-8 w-8 rounded-full" alt="Jibran" width={32} height={32} />
                </div>
            </footer>

            <div className="fixed bottom-0 left-0 right-0 bg-transparent backdrop-blur-sm text-white flex items-center justify-center px-4 py-5 shadow-lg">
                <div className="flex items-center">
                    <button onClick={handleBackward} className="mx-2 text-white">
                        <FaBackward size={24} />
                    </button>
                    <button onClick={handlePlayPause} className="mx-2 text-white">
                        {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
                    </button>
                    <button onClick={handleForward} className="mx-2 text-white">
                        <FaForward size={24} />
                    </button>
                </div>
                <div className="flex-grow mx-4">
                    <div className="flex justify-between text-xs mb-1">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                    </div>
                    <input
                        type="range"
                        value={currentTime}
                        max={duration}
                        onChange={(e) => (audioRef.current.currentTime = e.target.value)}
                        className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                </div>
            </div>

            <audio
                ref={audioRef}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                src={`/path/to/your/audio/file.mp3?language=${selectedLanguage}&speaker=${selectedSpeaker}`}
            />
        </div>
    );
};

export default Page;
