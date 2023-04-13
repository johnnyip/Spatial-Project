import { MapContainer, WMSTileLayer, Marker, Popup} from "react-leaflet";

const position = [22.25, 114.15]



const HomePage = () => {

    return (
        <MapContainer
            style={{ height: "300px" }}
            center={position}
            zoom={13}
            scrollWheelZoom={false}
        >
            <WMSTileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://qgis.johnnyip.com/?SERVICE=WMS&VERSION=1.3.0&request=GetMap
            &MAP=/etc/qgisserver/csit6000p20230412.qgz"
            src="EPSG:4326"
            layers={"districts,toilets,LandsDLabel,LandsDTopoMap,OpenStreetMap"}
            bbox='22.1193278,114.0028131,22.4393278,114.3228131'
            format="image/jpeg"
            tileSize={64}
            />
            <Marker position={position}>
            <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
            </Marker>
        </MapContainer>
    )
}

export default HomePage;