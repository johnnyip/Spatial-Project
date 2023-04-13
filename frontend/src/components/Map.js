import { MapContainer, WMSTileLayer, Marker, Popup, TileLayer} from "react-leaflet";
import 'leaflet/dist/leaflet.css';

const position = [22.25, 114.15]

const Map = () => {

    return (
        <MapContainer
            style={{   width: "100wh",
                height: "70vh" }}
            center={position}
            zoom={13}
            scrollWheelZoom={false}
        >
            <TileLayer url={'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'} />
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
            // src="EPSG:4326"
            // bbox='22.1193278,114.0028131,22.4393278,114.3228131'
            // format="image/jpeg"
            // tileSize={256}
            />
            <Marker position={position}>
            <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
            </Marker>
        </MapContainer>
    )
}

export default Map;