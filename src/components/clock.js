import { useState, useEffect } from 'react'

const Clock = () => {
    const [currentTime, setCurrentTime] = useState (new Date().toLocaleTimeString())

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentTime(new Date().toLocaleTimeString())
      }, 1000)
    return () => clearInterval(interval)
    }, [])

    return (
      <div id="clock">
        {currentTime}
      </div>
    )
  }

  export default Clock