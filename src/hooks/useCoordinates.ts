import { useEffect, useState } from 'react'

export const useCoordinates = () => {
  const [coordinates, setCoordinates] = useState<{ latitude: number, longitude: number }>()
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      setCoordinates({
        latitude: coords.latitude,
        longitude: coords.longitude
      })
    })
  }, [])
  return coordinates
}