import React, {useEffect, useRef, useState} from 'react'
import {GoogleMap, Marker, useJsApiLoader} from '@react-google-maps/api'
import {isEmpty} from 'lodash'

interface Props {
  location: {lat: any; lng: any}
  lngName: string
  latName: string
  setFieldValue: any
}

function TypeMapView({location, lngName, latName, setFieldValue}: Props) {
  const [mapPosition, setMapPosition] = useState({lat: 27.7090319, lng: 85.2911133})
  const [markerPosition, setMarkerPosition] = useState({lat: 27.7090319, lng: 85.2911133})
  const [mapLoaded, setMapLoaded] = useState(false)
  let mapRef = useRef<any>(null)

  const latitude = parseFloat(location.lat)
  const longitude = parseFloat(location.lng)

  useEffect(() => {
    if (location?.lat) {
      setMapPosition({lat: latitude, lng: longitude})
      setMarkerPosition({lat: latitude, lng: longitude})
    } else {
      setMapPosition({lat: 27.7090319, lng: 85.2911133})
      setMarkerPosition({lat: 27.7090319, lng: 85.2911133})
    }
  }, [location])

  const {isLoaded} = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyCx9BiHI8x6kf0rrRTfmVFgHtmkAP75RyQ',
  })

  const onLoad = (map: any) => {
    mapRef.current = map
    setMapLoaded(true)
  }

  useEffect(() => {
    handleBound()
  }, [mapLoaded])

  function handleBound() {
    if (mapLoaded && !isEmpty(latitude)) {
      const bounds = new window.google.maps.LatLngBounds()
      bounds.extend(new window.google.maps.LatLng(latitude, longitude))
      mapRef.current?.fitBounds(bounds)
    }
  }

  const onUnmount = React.useCallback(function callback(map) {}, [])

  return isLoaded ? (
    <GoogleMap
      mapContainerClassName='containerStyleMap'
      center={mapPosition}
      zoom={15}
      onLoad={onLoad}
      onUnmount={onUnmount}
      ref={mapRef}
    >
      <CustomMarker
        setMapPosition={setMapPosition}
        setMarkerPosition={setMarkerPosition}
        markerPosition={markerPosition}
        mapPosition={mapPosition}
        lngName={lngName}
        latName={latName}
        setFieldValue={setFieldValue}
      />
      <></>
    </GoogleMap>
  ) : (
    <></>
  )
}

const CustomMarker = ({
  setMapPosition,
  latName,
  lngName,
  setFieldValue,
  setMarkerPosition,
  markerPosition,
}: any) => {
  const [isMarkerLoaded, setIsMarkerLoaded] = useState(false)
  const onMarkerDragEnd = (event: any) => {
    let newLat = event.latLng.lat()
    let newLng = event.latLng.lng()
    setMarkerPosition({lat: newLat, lng: newLng})
    setMapPosition({lat: newLat, lng: newLng})
    setFieldValue(latName, newLat)
    setFieldValue(lngName, newLng)
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

export default React.memo(TypeMapView)
