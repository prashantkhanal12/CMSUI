import React, {useRef, useState} from 'react'
import {GoogleMap, Marker, useJsApiLoader} from '@react-google-maps/api'

interface Props {
  handleMarkerPosition?: any
}

const containerStyle = {
  width: '100%',
  height: '100%',
}

function MapComponent({handleMarkerPosition}: Props) {
  const [mapPosition, setMapPosition] = useState({lat: 27.7090319, lng: 85.2911133})
  let mapRef = useRef<any>(null)

  const {isLoaded} = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyCx9BiHI8x6kf0rrRTfmVFgHtmkAP75RyQ',
  })

  const center = {
    lat: 27.7090319,
    lng: 85.2911133,
  }

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    mapRef.current = map
    const bounds = new window.google.maps.LatLngBounds()
    map.fitBounds(bounds)
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={mapPosition}
      zoom={15}
      onLoad={onLoad}
      onUnmount={onUnmount}
      ref={mapRef}
    >
      <CustomMarker
        setMapPosition={setMapPosition}
        mapPosition={mapPosition}
        handleMarkerPosition={handleMarkerPosition}
      />
      <></>
    </GoogleMap>
  ) : (
    <></>
  )
}

const CustomMarker = ({setMapPosition, handleMarkerPosition}: any) => {
  const [markerPosition, setMarkerPosition] = useState({lat: 27.7090319, lng: 85.2911133})
  const [isMarkerLoaded, setIsMarkerLoaded] = useState(false)
  const onMarkerDragEnd = (event: any) => {
    let newLat = event.latLng.lat()
    let newLng = event.latLng.lng()
    handleMarkerPosition({lat: newLat, lng: newLng})
    setMarkerPosition({lat: newLat, lng: newLng})
    setMapPosition({lat: newLat, lng: newLng})
  }

  return (
    <Marker
      animation={2}
      draggable
      onDragEnd={onMarkerDragEnd}
      position={{lat: markerPosition.lat, lng: markerPosition.lng}}
      onLoad={() => setIsMarkerLoaded(true)}
    ></Marker>
  )
}

export default React.memo(MapComponent)
