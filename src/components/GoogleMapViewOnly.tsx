"use client";

import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useEffect, useMemo, useState } from "react";

interface GoogleMapViewProps {
  onMapMarker: string;
  onMapClick: (googleMapsUrl: string) => void;
}

export default function GoogleMapView({
  onMapMarker,
  onMapClick,
}: GoogleMapViewProps) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return <Map onMapMarker={onMapMarker} onMapClick={onMapClick} />;
  }
}

function Map({ onMapMarker, onMapClick }: GoogleMapViewProps) {
  const [marker, setMarker] = useState<{ lat: number; lng: number }>({
    lat: 44,
    lng: -80,
  });
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  }>({ lat: 44, lng: -80 });

  const generateGoogleMapsUrl = (lat: number, lng: number) => {
    return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  };

  const updateMarkerPosition = (default_lat: number, default_lng: number) => {
    if (!onMapMarker) {
      console.log(default_lat);
      // If onMapMarker is null or undefined, use default values
      setMarker({ lat: default_lat, lng: default_lng });
    } else {
      const urlParams = new URLSearchParams(new URL(onMapMarker).search);

      const queryString = urlParams.get("query");
      const latString = queryString?.split(",")[0];
      const lat = latString ? parseFloat(latString) : default_lat;

      const lngString = queryString?.split(",")[1];
      const lng = lngString ? parseFloat(lngString) : default_lng;
      setMarker({ lat: lat, lng: lng });
    }
  };

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      function (pos) {
        console.log("Update location");
        const pos_lat_lng = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        setUserLocation(pos_lat_lng);
        updateMarkerPosition(pos_lat_lng.lat, pos_lat_lng.lng);
        onMapClick(generateGoogleMapsUrl(pos_lat_lng.lat, pos_lat_lng.lng));
      },
      function (error) {
        console.error("Error getting user location:", error);
      },
    );
  };

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    const nlat = e.latLng?.lat() as number;
    const nlng = e.latLng?.lng() as number;
    onMapClick(generateGoogleMapsUrl(nlat, nlng));
    console.log("Click the map");
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  useEffect(() => {
    updateMarkerPosition(userLocation.lat, userLocation.lng);
  }, [onMapMarker]);

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: true,
    }),
    [],
  );

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
        onClick={handleMapClick}
      >
        <Marker position={marker} />
      </GoogleMap>
    </div>
  );
}
