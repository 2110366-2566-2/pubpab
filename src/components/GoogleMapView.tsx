"use client";

import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useEffect, useMemo, useState } from "react";

export default function GoogleMapView() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

function Map() {
  const [marker, setMarker] = useState<{ lat: number; lng: number }>({
    lat: 44,
    lng: -80,
  });
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  }>({ lat: 44, lng: -80 });

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      function (pos) {
        setMarker({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });

        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      function (error) {
        console.error("Error getting user location:", error);
      },
    );
  };
  const generateGoogleMapsUrl = (lat: number, lng: number) => {
    return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  };

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: true,
    }),
    [],
  );

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    const nlat = e.latLng?.lat() as number;
    const nlng = e.latLng?.lng() as number;
    setMarker({
      lat: nlat,
      lng: nlng,
    });
  };
  const googleMapsUrl = generateGoogleMapsUrl(marker.lat, marker.lng);
  console.log(googleMapsUrl);
  return (
    <div className="relative">
      <GoogleMap
        zoom={10}
        mapContainerStyle={{
          width: "100%",
          height: "50vh",
          position: "relative",
          overflow: "hidden",
        }}
        center={userLocation}
        options={mapOptions}
        onClick={(e) => handleMapClick(e)}
      >
        <Marker position={marker} />
      </GoogleMap>
    </div>
  );
}
