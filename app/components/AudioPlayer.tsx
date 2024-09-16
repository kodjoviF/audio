"use client"
import { useState,useEffect } from "react"
import {Howl} from "howler"
import {Play,Pause,SkipBack,SkipForward,Disc, CirclePlay,Minus,Plus} from 'lucide-react'

interface Track  {
 src :string
 nom :string
}
const tracks:Track[] = [
    {src :"/audio/didi2025.mp3", nom: "didi2025"},
    {src :"/audio/didial.mp3", nom: "didial"},
    {src :"/audio/Ninho1.mp3", nom: "Ninho1"},
    {src :"/audio/Ninho2.mp3", nom: "Ninho2"}
]
export default function AudioPlayer() {
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [howl, setHowl] = useState<Howl | null>(null);

    const [volume, audioVolume] = useState(1)

    useEffect(() => {
        const newHowl = new Howl({
            src : [tracks[currentTrackIndex].src],
            onend : handleNextTrack,
            volume : volume,
        });
        setHowl(newHowl);
        setIsPlaying(false);
        return () =>{
            newHowl.unload();
        }
    },[currentTrackIndex])

    useEffect(() =>{
        if (howl) {
            howl.volume(volume);
        }
    } ,[volume,howl]);

    const handlePlayPause = () =>{
        if(isPlaying) {
            howl?.pause()
    } else {
        howl?.play()
    }
    setIsPlaying(!isPlaying)
}
const handleNextTrack = () => {
    setCurrentTrackIndex((prevIndex) =>
      prevIndex === tracks.length - 1 ? 0 : prevIndex + 1
    );
    setIsPlaying(false);
  };

  const handlePrevTrack = () => {
    setCurrentTrackIndex((prevIndex) =>
      prevIndex === 0 ? tracks.length - 1 : prevIndex - 1
    );
    setIsPlaying(false);
  };
  const handleTrackSelect = (index: number) => {
    setCurrentTrackIndex(index);
    setIsPlaying(false);
  };
  const adjustVolume = (delta: number) => {
    volume((prevVolume: number) => {
      const newVolume = Math.min(Math.max(prevVolume + delta, 0), 1);
      return newVolume;
    });
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <div>
        
        <button
        data-drawer-target="sidebar-multi-level-sidebar"
        data-drawer-toggle="sidebar-multi-level-sidebar"
        aria-controls="sidebar-multi-level-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        onClick={toggleSidebar}
      >
        <span className="sr-only">Open sidebar</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-list-collapse"><path d="m3 10 2.5-2.5L3 5"/><path d="m3 19 2.5-2.5L3 14"/><path d="M10 6h11"/><path d="M10 12h11"/><path d="M10 18h11"/></svg>
      </button>

      <aside
        id="sidebar-multi-level-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-blue-500 hover:bg-blue-600">
          <button
            type="button"
            className="inline-flex items-end p-2 text-sm text-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            onClick={toggleSidebar}
          >
            <span className="sr-only">Close sidebar</span>
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-circle-x"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
          </button>
          <ul className="space-y-2 font-medium">
            {tracks.map((track, index) => (
              <li
                key={index}
                onClick={() => handleTrackSelect(index)}
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                  currentTrackIndex === index ? 'text-gray-900' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  {currentTrackIndex === index ? <CirclePlay size={20} /> : <Disc size={24} />}
                  <span>{track.nom}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </aside>
<div className=" sm:ml-64">
   <div className=" flex justify-center items-center h-screen  ">
   <div className="relative  rounded-full border-4 border-gray-600 flex items-center justify-center bg-gray-300">
          <div className="w-[150px] h-[150px] flex items-center justify-center relative">
            <button
              onClick={handlePrevTrack}
              className="absolute left-2 text-blue-500 hover:text-blue-600 transition-colors"
              aria-label="Previous track"
            >
              <SkipBack size={24} />
            </button>

            <button
              onClick={handlePlayPause}
              className="p-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-all focus:outline-none"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause size={32} /> : <Play size={32} />}
            </button>

            <button
              onClick={handleNextTrack}
              className="absolute right-2 text-blue-500 hover:text-blue-600 transition-colors"
              aria-label="Next track"
            >
              <SkipForward size={24} />
            </button>

            <button
              onClick={() => adjustVolume(-0.1)}
              className="absolute bottom-2 text-blue-500 hover:text-blue-600 transition-colors"
              aria-label="Decrease volume"
            >
              <Minus size={24} />
            </button>

            <button
              onClick={() => adjustVolume(0.1)}
              className="absolute top-2 text-blue-500 hover:text-blue-600 transition-colors"
              aria-label="Increase volume"
            >
              <Plus size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
     
   </div>


  
  )
}
