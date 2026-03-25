"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const CtrlScrollZoom = ({ onMessageChange }) => {
    const map = useMap();

    useEffect(() => {
        const handleWheel = (e) => {
            if (e.ctrlKey || e.metaKey) {
                map.scrollWheelZoom.enable();
                onMessageChange(false);
            } else {
                map.scrollWheelZoom.disable();
                onMessageChange(true);
                setTimeout(() => onMessageChange(false), 2000);
            }
        };

        const container = map.getContainer();
        container.addEventListener("wheel", handleWheel, { passive: false });

        return () => {
            container.removeEventListener("wheel", handleWheel);
        };
    }, [map, onMessageChange]);

    return null;
};

const MapComponent = ({ language }) => {
    const [showMessage, setShowMessage] = useState(false);

    // Define custom icons
    const defaultIcon = L.divIcon({
        className: "custom-div-icon",
        html: `
            <div style="width:24px; height:36px;">
                <svg width="24" height="36" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0C5.372 0 0 5.373 0 12C0 21.321 11.239 35.325 11.535 35.698C11.654 35.849 11.825 35.925 12 35.925C12.175 35.925 12.346 35.849 12.465 35.698C12.761 35.325 24 21.321 24 12C24 5.373 18.628 0 12 0ZM12 18C8.686 18 6 15.314 6 12C6 8.686 8.686 6 12 6C15.314 6 18 8.686 18 12C18 15.314 15.314 18 12 18Z" fill="#1f2937"/>
                </svg>
            </div>
        `,
        iconSize: [24, 36],
        iconAnchor: [12, 36],
        popupAnchor: [0, -36],
        tooltipAnchor: [0, -38]
    });

    const prominentIcon = L.divIcon({
        className: "prominent-div-icon",
        html: `
      <div style='position:relative; width:36px; height:54px;'>
        <div style='position:absolute; top:20px; left:18px; transform:translate(-50%, -50%); width:40px; height:40px; background-color:rgba(208, 64, 41, 0.4); border-radius:50%; animation:pulse 2s infinite; z-index:1;'></div>
        <svg width="36" height="54" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg" style="position:relative; z-index:2; filter: drop-shadow(0px 4px 6px rgba(208, 64, 41, 0.5));">
            <path d="M12 0C5.372 0 0 5.373 0 12C0 21.321 11.239 35.325 11.535 35.698C11.654 35.849 11.825 35.925 12 35.925C12.175 35.925 12.346 35.849 12.465 35.698C12.761 35.325 24 21.321 24 12C24 5.373 18.628 0 12 0ZM12 18C8.686 18 6 15.314 6 12C6 8.686 8.686 6 12 6C15.314 6 18 8.686 18 12C18 15.314 15.314 18 12 18Z" fill="#D04029"/>
        </svg>
      </div>
      <style>
        @keyframes pulse {
          0% { transform: translate(-50%, -50%) scale(0.6); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(1.6); opacity: 0; }
        }
      </style>
    `,
        iconSize: [36, 54],
        iconAnchor: [18, 54],
        popupAnchor: [0, -54],
        tooltipAnchor: [0, -56]
    });

    const locations = [
        {
            id: "ksa",
            titleAr: "السعودية، الرياض، حي العليا",
            titleEn: "Saudi Arabia, Riyadh, Al Olaya District",
            coords: [24.7136, 46.6753],
            isProminent: true,
        },
        {
            id: "uae",
            titleAr: "الدور السادس، مركز الأعمال، القاعة الكبرى، فندق الميدان، شارع الميدان، دبي، الإمارات العربية المتحدة",
            titleEn: "6th Floor, Business Centre, Grand Auditorium, Meydan Hotel, Meydan Street, Dubai, United Arab Emirates",
            coords: [25.155658, 55.3003012],
            isProminent: false,
        },
        {
            id: "syria",
            titleAr: "سوريا، دمشق، المنطقة الحرة",
            titleEn: "Syria, Damascus, Free Zone",
            coords: [33.513352, 36.311693],
            isProminent: false,
        },
        {
            id: "portugal",
            titleAr: "البرتغال، لشبونة",
            titleEn: "Portugal, Lisbon",
            coords: [38.7169, -9.1395],
            isProminent: false,
        },
        {
            id: "canada",
            titleAr: "كندا، أوتاوا",
            titleEn: "Canada, Ottawa",
            coords: [45.4215, -75.6972],
            isProminent: false,
        },
    ];

    return (
        <div style={{ position: 'relative', height: "500px", width: "100%", borderRadius: "15px", overflow: "hidden", border: "1px solid #eee", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
            {showMessage && (
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: 'rgba(0,0,0,0.7)',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    zIndex: 1000,
                    pointerEvents: 'none',
                    fontSize: '16px',
                    fontFamily: 'sans-serif',
                    direction: language === "ar" ? "rtl" : "ltr"
                }}>
                    {language === 'ar' ? 'استخدم زر Ctrl + التمرير لتكبير الخريطة' : 'Use Ctrl + scroll to zoom the map'}
                </div>
            )}
            <MapContainer
                bounds={[[20, -110], [60, 60]]}
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%", zIndex: 1 }}
            >
                <CtrlScrollZoom onMessageChange={setShowMessage} />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                />

                {locations.map((loc) => (
                    <Marker
                        key={loc.id}
                        position={loc.coords}
                        icon={loc.isProminent ? prominentIcon : defaultIcon}
                        zIndexOffset={loc.isProminent ? 1000 : 0}
                    >
                        <Popup
                            offset={[0, -5]}
                            className="custom-map-popup"
                        >
                            <div style={{
                                textAlign: "center",
                                direction: language === "ar" ? "rtl" : "ltr",
                                fontSize: "14px",
                                fontWeight: "600",
                                width: "max-content",
                                whiteSpace: "nowrap",
                                color: "#222",
                                lineHeight: "1.5",
                                margin: "-5px" // Offset Leaflet's default popup padding somewhat
                            }}>
                                <strong style={{ display: 'block', marginBottom: '4px', fontSize: '15px', width: '100%', color: '#bf5ec6' }}>
                                    {language === "ar" ? loc.titleAr.split('،')[0] : loc.titleEn.split(',')[0]}
                                </strong>
                                {language === "ar"
                                    ? loc.titleAr.split('،').slice(1).join('،').trim()
                                    : loc.titleEn.split(',').slice(1).join(',').trim()}
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default MapComponent;
