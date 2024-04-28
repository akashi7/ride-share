/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'

const RouteTracker = ({ stops, setCurrentPosition }) => {
  const [currentStopIndex, setCurrentStopIndex] = useState(0)
  const [currentPosition, setCurrentPositionLocal] = useState(stops[0])
  const [ETA, setETA] = useState('Calculating...')
  const [distanceRemaining, setDistanceRemaining] = useState('Calculating...')

  const calculateDistance = (point1, point2) => {
    const lat1 = point1.lat
    const lon1 = point1.lng
    const lat2 = point2.lat
    const lon2 = point2.lng
    const R = 6371
    const dLat = deg2rad(lat2 - lat1)
    const dLon = deg2rad(lon2 - lon1)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const d = R * c
    return d
  }

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentStopIndex < stops.length - 1) {
        const nextStop = stops[currentStopIndex + 1]
        const distanceToNextStop = calculateDistance(currentPosition, nextStop)
        const distanceToLastStop = calculateDistance(
          currentPosition,
          stops[currentStopIndex]
        )
        const distanceRemaining = distanceToNextStop + distanceToLastStop
        const avgSpeed = 30
        const timeToReachNextStop = distanceToNextStop / avgSpeed // in hours
        setETA(`${Math.round(timeToReachNextStop * 60)} minutes`)
        setDistanceRemaining(`${distanceRemaining.toFixed(2)} km`)

        if (distanceToNextStop < 0.05) {
          setCurrentStopIndex(currentStopIndex + 1)
        } else {
          const fraction = 1 / (timeToReachNextStop * 60 * 60 * 10)
          const latDiff = nextStop.lat - currentPosition.lat
          const lngDiff = nextStop.lng - currentPosition.lng
          const newLat = currentPosition.lat + latDiff * fraction
          const newLng = currentPosition.lng + lngDiff * fraction
          setCurrentPositionLocal({ lat: newLat, lng: newLng })
          setCurrentPosition({ lat: newLat, lng: newLng })
        }
      } else {
        clearInterval(interval)
        setETA('End of route')
        setDistanceRemaining('')
      }
    }, 1)

    return () => clearInterval(interval)
  }, [currentStopIndex, currentPosition, setCurrentPosition, stops])

  return (
    <div>
      <p>
        {currentStopIndex === stops.length - 1
          ? 'Arrived Kimironko'
          : `Next Stop: ${String.fromCharCode(65 + currentStopIndex)}`}
      </p>
      <p>Distance Remaining: {distanceRemaining}</p>
      <p>ETA: {ETA}</p>
    </div>
  )
}

export default RouteTracker
