import { useEffect, useRef, useState } from 'react'
import { music } from '../data.js'

const LIMIT_SECONDS = 60

export default function MusicPlayer() {
  const audioRef = useRef(null)
  const startTimeRef = useRef(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.play().then(
      () => setIsPlaying(true),
      () => setIsPlaying(false),
    )
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    function setStartPosition() {
      if (!Number.isFinite(audio.duration)) return
      startTimeRef.current = audio.duration / 2
      audio.currentTime = startTimeRef.current
    }

    function handleTimeUpdate() {
      const elapsedTime = Math.max(0, audio.currentTime - startTimeRef.current)
      setElapsed(Math.min(elapsedTime, LIMIT_SECONDS))
      if (elapsedTime >= LIMIT_SECONDS) {
        audio.pause()
        setStartPosition()
        setIsPlaying(false)
        setElapsed(0)
      }
    }

    function handleEnded() {
      setStartPosition()
      setIsPlaying(false)
      setElapsed(0)
    }

    audio.addEventListener('loadedmetadata', setStartPosition)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('ended', handleEnded)
    return () => {
      audio.removeEventListener('loadedmetadata', setStartPosition)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [])

  function toggle() {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play().then(
        () => setIsPlaying(true),
        () => setIsPlaying(false),
      )
    }
  }

  const progress = Math.min((elapsed / LIMIT_SECONDS) * 100, 100)
  const mm = Math.floor(elapsed / 60)
    .toString()
    .padStart(1, '0')
  const ss = Math.floor(elapsed % 60)
    .toString()
    .padStart(2, '0')

  return (
    <div className="hairline rounded-sm bg-bottle px-5 py-4 text-charcoal">
      <audio
        ref={audioRef}
        src={music.src}
        autoPlay
        preload="auto"
      />
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={toggle}
          aria-pressed={isPlaying}
          aria-label={isPlaying ? 'Pausar música' : 'Tocar música'}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-charcoal/50 text-charcoal transition-colors hover:bg-charcoal/10"
        >
          {isPlaying ? (
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
              <rect x="6" y="5" width="4" height="14" />
              <rect x="14" y="5" width="4" height="14" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-4 w-4 translate-x-[1px]" fill="currentColor">
              <path d="M7 5v14l12-7z" />
            </svg>
          )}
        </button>

        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-base italic text-charcoal">{music.title}</p>
          <p className="truncate text-xs uppercase tracking-widest2 text-charcoal/75">
            {music.artist}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <div className="h-[2px] w-full overflow-hidden rounded-full bg-charcoal/20">
          <div
            className="h-full bg-champagne transition-[width] duration-300 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-1.5 flex justify-between text-[11px] text-charcoal/70">
          <span>
            {mm}:{ss}
          </span>
          <span>{music.durationLabel}</span>
        </div>
      </div>
    </div>
  )
}
