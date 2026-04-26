import React, { useState } from 'react';
import axios from 'axios';
import { useApp } from '../context/ThemeLangContext';
import { MapPin, Phone, Crosshair } from 'lucide-react';

const Centers = () => {
  const { t } = useApp();
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchNearbyHospitals = (lat, lon) => {
    setLoading(true);
    // Overpass API query for hospitals within 5km (5000 meters)
    const query = `
      [out:json];
      (
        node["amenity"="hospital"](around:5000,${lat},${lon});
        node["amenity"="clinic"](around:5000,${lat},${lon});
        way["amenity"="hospital"](around:5000,${lat},${lon});
      );
      out center;
    `;
    
    const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
    
    axios.get(url).then(res => {
      const elements = res.data.elements || [];
      const foundCenters = elements.map((el, idx) => {
        let address = [];
        if (el.tags?.['addr:housenumber']) address.push(el.tags['addr:housenumber']);
        if (el.tags?.['addr:street']) address.push(el.tags['addr:street']);
        if (el.tags?.['addr:suburb']) address.push(el.tags['addr:suburb']);
        if (el.tags?.['addr:city'] || el.tags?.['addr:village'] || el.tags?.['addr:town']) {
            address.push(el.tags['addr:city'] || el.tags['addr:village'] || el.tags['addr:town']);
        }
        if (el.tags?.['addr:state']) address.push(el.tags['addr:state']);
        if (el.tags?.['addr:postcode']) address.push(el.tags['addr:postcode']);
        
        let fullAddress = address.join(', ');
        if (!fullAddress) {
           fullAddress = `Address details not registered on map. Coordinate Location: (Lat: ${(el.lat || el.center?.lat).toFixed(4)}, Lon: ${(el.lon || el.center?.lon).toFixed(4)})`;
        }

        return {
          id: idx,
          name: el.tags?.name || "Local Health Center / Clinic",
          location: fullAddress,
          contact: el.tags?.phone || "Contact not available",
        };
      });
      setCenters(foundCenters);
      if(foundCenters.length === 0) setError("No health centers found within 5km of your location.");
      setLoading(false);
    }).catch(err => {
      setError("Failed to fetch nearby centers from map API.");
      setLoading(false);
    });
  };

  const handleLocate = () => {
    setError('');
    setCenters([]);
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
    } else {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchNearbyHospitals(position.coords.latitude, position.coords.longitude);
        },
        () => {
          setError("Unable to retrieve your location. Please allow location permissions.");
          setLoading(false);
        }
      );
    }
  };

  return (
    <div>
      <h2 style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}>{t('centers')}</h2>
      
      <button 
        className="btn-primary" 
        onClick={handleLocate} 
        style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', maxWidth: '300px' }}
      >
        <Crosshair size={20} /> Find Hospitals Near Me
      </button>

      {loading && <p>Locating hospitals within 5km...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {!loading && centers.length === 0 && !error && <p>Click the button above to use your GPS location and find centers.</p>}

      {centers.map(center => (
        <div key={center.id} className="list-item">
          <h3>{center.name}</h3>
          <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0.5rem 0' }}>
            <MapPin size={18} color="var(--secondary-color)" /> {center.location}
          </p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Phone size={18} color="var(--primary-color)" /> {center.contact}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Centers;
