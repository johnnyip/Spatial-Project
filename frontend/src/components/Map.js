import { MapContainer, WMSTileLayer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";
import { useState } from "react";
import 'leaflet/dist/leaflet.css';
import { useSelector } from "react-redux";
import Icons from "./Icons";
import ToiletMarker from "./ToiletMarker";

const Map = () => {
    const [center, setCenter] = useState([22.335, 114.265]);
    const toilets = useSelector(state => state.map.toilets);
    const ZOOM_LEVEL = 13;

    const MyLocationMarker = () => {
        const [position, setPosition] = useState(null)
        const map = useMapEvents({
          click() {
            map.locate()
          },
          locationfound(e) {
            setPosition(e.latlng)
            map.setView(e.latlng, map.getZoom())
          },
        })
      
        return position === null ? null : (
          <Marker position={position} icon={Icons.red}>
            <Popup>
                You are here
            </Popup>
          </Marker>
        )
    }

    return (
        <MapContainer
            style={{   width: "100wh",
                height: "70vh" }}
            center={center}
            zoom={ZOOM_LEVEL}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png "
            />
            <WMSTileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://qgis.johnnyip.com/?SERVICE=WMS&request=GetMap
                &MAP=/etc/qgisserver/csit6000p20230412.qgz"
                params={{
                    layers: 'districts,toilets,LandsDLabel,LandsDTopoMap',
                    transparent: true,
                    format: 'image/png',
                    version: '1.3.0'
                }}
            />
            <MyLocationMarker/>
            {
                toilets?.map((t) => <ToiletMarker info={t} key={t.id}/>
                )
            }
        </MapContainer>
    )
}

export default Map;