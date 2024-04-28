/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import {
  GoogleMap,
  Marker,
  Polyline,
  useJsApiLoader,
} from '@react-google-maps/api'
import React, { useEffect, useState } from 'react'
import moving from '../assets/move.png'
import endMarker from '../assets/redmarker.png'
import RouteTracker from './routeTracker'
import { CiHeart } from 'react-icons/ci'
import { IoIosNotificationsOutline } from 'react-icons/io'
import { CiClock2 } from 'react-icons/ci'
import { FaBars } from 'react-icons/fa'

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY

const MapContainer = ({ stops }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: API_KEY,
  })

  const mapCenter = { lat: -1.939826787816454, lng: 30.0445426438232 }
  const [currentPosition, setCurrentPosition] = useState(null)
  const [showRouteTracker, setShowRouteTracker] = useState(false)
  const [markersLoaded, setMarkersLoaded] = useState(false)
  const [polylineLoaded, setPolylineLoaded] = useState(false)

  useEffect(() => {
    if (isLoaded) {
      setCurrentPosition(stops[0].coords)
      setShowRouteTracker(true)
    }
  }, [isLoaded, stops])

  useEffect(() => {
    if (isLoaded && !markersLoaded) {
      setMarkersLoaded(true)
    }
    if (isLoaded && !polylineLoaded) {
      setPolylineLoaded(true)
    }
  }, [isLoaded, markersLoaded, polylineLoaded])

  return isLoaded ? (
    <>
      <div className='p-5'>
        {showRouteTracker && currentPosition && (
          <div>
            <div className=' flex justify-between bg-gradient-to-r from-green-300 to-green-600  items-center py-2 px-5'>
              <FaBars />
              <div className='text-lg  font-bold'>Startup</div>
            </div>
            <div className='bg-white flex justify-center'>
              <div>
                <div>Nyabugogo - Kimironko</div>
                <RouteTracker
                  stops={stops.map((stop) => stop.coords)}
                  setCurrentPosition={setCurrentPosition}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <div
        style={{ position: 'relative', width: '100%', height: '600px' }}
        className='p-5'
      >
        <GoogleMap
          id='map'
          mapContainerStyle={{ width: '100%', height: '100%' }}
          zoom={13}
          center={mapCenter}
          onClick={() => setShowRouteTracker(!showRouteTracker)}
        >
          {markersLoaded && currentPosition && (
            <Marker
              position={currentPosition}
              icon={{
                url: moving,
              }}
            />
          )}
          {polylineLoaded && (
            <Polyline
              path={stops.map((stop) => stop.coords)}
              options={{
                strokeColor: '#007bff',
                strokeOpacity: 2.0,
                strokeWeight: 5,
              }}
            />
          )}
          {markersLoaded &&
            stops.map((stop, index) => (
              <Marker
                key={index}
                position={stop.coords}
                label={stop.name}
                icon={{
                  url:
                    index === stops.length - 1
                      ? endMarker
                      : 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                }}
              />
            ))}
        </GoogleMap>
      </div>
      <div className='p-5 -mt-10'>
        <div className='flex justify-between items-center bg-gradient-to-r from-green-300 to-green-600 p-10'>
          <CiHeart className=' text-white' size={25} />
          <CiClock2 className=' text-white' size={25} />
          <IoIosNotificationsOutline className=' text-white' size={25} />
        </div>
      </div>
    </>
  ) : null
}

export default React.memo(MapContainer)
