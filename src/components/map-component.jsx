import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import { useMapboxAccessToken } from "../map-box-context";
import { useLocation } from "react-router-dom";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";

const MapComponent = () => {
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const { accessToken } = useMapboxAccessToken();
  const location = useLocation();
  const destination = location.state?.destination;

  // Default coordinates for Brno hlavní nádraží (Brno main railway station)
  const defaultStart = [16.612652, 49.190882];

  useEffect(() => {
    mapboxgl.accessToken = accessToken;
    const initializeMap = ({ setMap, mapContainerRef }) => {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: defaultStart,
        zoom: 15,
      });

      map.on("load", () => {
        setMap(map);
        map.resize();

        // Initialize the MapboxDirections control
        const directions = new MapboxDirections({
          accessToken: mapboxgl.accessToken,
          unit: "metric",
          profile: "mapbox/walking",
          alternatives: false,
          geometries: "geojson",
          controls: { instructions: true, profileSwitcher: true },
          flyTo: false,
        });

        // Add the control to the map
        map.addControl(directions, "top-left");

        // Set the destination if available
        if (destination) {
          directions.setDestination(destination);
          console.log("Destination coordinates:", destination);
        }

        // Set a timeout to use default location if geolocation fails
        setTimeout(() => {
          if (!userLocation) {
            console.log("Using default start location:", defaultStart);
            setUserLocation(defaultStart);
            directions.setOrigin(defaultStart);
            if (destination) {
              directions.setDestination(destination);
            }
          }
        }, 5000); // Wait for 5 seconds before using default location
      });
    };

    if (!map) initializeMap({ setMap, mapContainerRef });
  }, [map, accessToken]);

  useEffect(() => {
    if (map) {
      // Add user location marker
      const userMarker = new mapboxgl.Marker({ color: "#FF0000" });

      // Add destination marker
      if (destination) {
        new mapboxgl.Marker({ color: "#00FF00" })
          .setLngLat(destination)
          .addTo(map);
        console.log("Destination coordinates:", destination);
      }

      // Add geolocate control
      const geolocate = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      });

      map.addControl(geolocate);

      geolocate.on("geolocate", (e) => {
        const lon = e.coords.longitude;
        const lat = e.coords.latitude;
        const position = [lon, lat];
        setUserLocation(position);
        console.log("User location coordinates:", position);

        userMarker.setLngLat(position).addTo(map);

        map.flyTo({
          center: position,
          zoom: 15,
        });

        // If we have both user location and destination, get the route
        if (destination) {
          getRoute(map, position, destination);
        }
      });

      map.on("load", () => {
        geolocate.trigger(); // Automatically trigger geolocation
      });
    }
  }, [map, destination]);

  // Function to get route
  const getRoute = (map, start, end) => {
    console.log("Getting route from", start, "to", end);
    const url = `https://api.mapbox.com/directions/v5/mapbox/walking/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const route = data.routes[0].geometry.coordinates;
        const geojson = {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: route,
          },
        };

        // If the route already exists on the map, we'll reset it using setData
        if (map.getSource("route")) {
          map.getSource("route").setData(geojson);
        } else {
          // Otherwise, we'll make a new request
          map.addLayer({
            id: "route",
            type: "line",
            source: {
              type: "geojson",
              data: geojson,
            },
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            paint: {
              "line-color": "#3887be",
              "line-width": 5,
              "line-opacity": 0.75,
            },
          });
        }
      });
  };

  // Update route when user location changes
  useEffect(() => {
    if (map && userLocation && destination) {
      getRoute(map, userLocation, destination);
    }
  }, [map, userLocation, destination]);

  return (
    <div ref={mapContainerRef} style={{ height: "80vh", width: "100%" }} />
  );
};

export default MapComponent;
