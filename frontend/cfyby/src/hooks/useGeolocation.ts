import { useState, useEffect } from 'react';

interface LocationData {
  latitude: number;
  longitude: number;
  timestamp: number;
  location?: string | null;
}

interface GeolocationState {
  data: LocationData | null;
  locLoading: boolean;
  error: Error | null;
}

type GeolocationOptions = PositionOptions;

const useGeolocation = (options?: GeolocationOptions): GeolocationState => {
  const [data, setData] = useState<LocationData | null>(null);
  const [locLoading, setLocLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const reverseGeocode = async (lat: number, lon: number) => {
    try {
      const token = import.meta.env.VITE_LOCATION_IQ_TOKEN;
      const url = `https://us1.locationiq.com/v1/reverse?key=${token}&lat=${lat}&lon=${lon}&format=json&addressdetails=1`;

      const resp = await fetch(url);
      if (!resp.ok) throw new Error(`Reverse geocoding failed: ${resp.status}`);

      const result = await resp.json();
      const addr = result.address || {};

      return {
        city: addr.city || addr.town || addr.village || addr.state || null,
        country: addr.country || null,
      };
    } catch (err: any) {
      console.error("Reverse geocoding error:", err);
      return { city: null, country: null };
    }
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setError(new Error("Geolocation is not supported by your browser"));
      setLocLoading(false);
      return;
    }

    const onSuccess = async (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;

      // fetch city + country
      const address = await reverseGeocode(latitude, longitude);

      if (address.country === "United States of America") {
        address.country = "USA"
      }

      setData({
        latitude,
        longitude,
        timestamp: position.timestamp,
        location: `${address.city}, ${address.country}`
      });

      setLocLoading(false);
    };

    const onError = (err: GeolocationPositionError) => {
      setError(new Error(err.message));
      setLocLoading(false);
    };

    navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
  }, []); // ← runs only once

  return { data, locLoading, error };
};

export default useGeolocation;
