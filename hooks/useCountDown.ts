import React, { useState, useEffect } from 'react'

type CountdownTime = {
  d: number
  h: number
  m: number
  s: number
}

export function useCountDown(targetUnixTimeMs: number): CountdownTime {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({ d: 0, h: 0, m: 0, s: 0 })

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = Date.now()
      let difference = targetUnixTimeMs - now

      if (difference < 0) {
        clearInterval(intervalId)
        setTimeLeft({ d: 0, h: 0, m: 0, s: 0 })
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      difference -= days * (1000 * 60 * 60 * 24)

      const hours = Math.floor(difference / (1000 * 60 * 60))
      difference -= hours * (1000 * 60 * 60)

      const minutes = Math.floor(difference / (1000 * 60))
      difference -= minutes * (1000 * 60)

      const seconds = Math.floor(difference / 1000)

      setTimeLeft({ d: days, h: hours, m: minutes, s: seconds })
    }, 1000)

    return () => clearInterval(intervalId)
  }, [targetUnixTimeMs])

  return timeLeft
}
