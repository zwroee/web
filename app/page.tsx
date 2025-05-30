"use client"

import { useState, useRef, useEffect } from "react"
import { Github, Music } from "lucide-react"
import Image from "next/image"

export default function HomePage() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(true)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [volume, setVolume] = useState([0.5])
  const videoRef = useRef<HTMLVideoElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume[0]
    }
  }, [volume])

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsVideoPlaying(!isVideoPlaying)
    }
  }

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isAudioPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsAudioPlaying(!isAudioPlaying)
    }
  }

  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume[0.25]
    }
  }
useEffect(() => {
  const audio = audioRef.current

  if (audio) {
    audio.volume = volume[0]

    // Try autoplay on load
    const playPromise = audio.play()

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsAudioPlaying(true)
        })
        .catch((err) => {
          console.log("Autoplay blocked. Waiting for user interaction.", err)

          // Wait for user interaction as a fallback
          const handleInteraction = () => {
            audio.play()
            setIsAudioPlaying(true)
            document.removeEventListener("click", handleInteraction)
          }

          document.addEventListener("click", handleInteraction)
        })
    }
  }
}, [volume])

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Video Background */}
      <video ref={videoRef} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
        <source src="/test.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Background Audio */}
      <audio ref={audioRef} loop>
        <source src="/placeholder-audio.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/80" />

      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-4 md:p-6 lg:p-8">
          <nav className="flex items-center justify-between">
            <div className="text-white text-xl md:text-2xl font-bold">zwroe</div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8"></div>

            {/* Mobile Menu Button */}
          </nav>

          {/* Mobile Navigation */}
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center justify-center px-4 md:px-6 lg:px-8">
          <div className="text-center text-white max-w-4xl mx-auto">
            {/* Profile Picture */}
            <div className="mb-8 relative">
              <div className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 mx-auto rounded-full overflow-hidden border-2 border-white/20">
                <Image
                  src="/profile.png"
                  alt="Profile"
                  width={192}
                  height={192}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-wider">zwroe</h1>
            <p className="text-base md:text-lg lg:text-xl mb-8 tracking-widest">sadness colors the heart</p>

            {/* Social Icons */}
            <div className="flex justify-center space-x-6 mb-12">
              <a
                href="https://github.com/zwroee"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 md:w-16 md:h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white/20 transition-colors cursor-pointer"
              >
                <Github className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </a>
              <a
                href="https://www.last.fm/user/k33333333333"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 md:w-16 md:h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white/20 transition-colors cursor-pointer"
              >
                <Music className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </a>
            </div>

            {/* Call to Action */}
          </div>
        </main>
      </div>
    </div>
  )
}
