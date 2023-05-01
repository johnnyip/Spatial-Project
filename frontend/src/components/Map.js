import { MapContainer, WMSTileLayer, Marker, Popup, useMap, TileLayer, useMapEvents } from "react-leaflet";
import { useState } from "react";
import 'leaflet/dist/leaflet.css';
import { useSelector } from "react-redux";
import Icons from "./Icons";
import ToiletMarker from "./ToiletMarker";
import { Select } from "antd";


const options = [
    {
        value: "22.2833322,114.1499994",
        label: "Central and Western District"
    },
    {
        label: "Islands District",
        value: "22.26382,113.96038",
    },
    {
        label: "Kwai Tsing District",
        value: "22.35288,114.10004"
    },
    {
        label: "North District",
        value: "22.4925846963,114.133537799",
    },
    {
        label: "Sai Kung District",
        value: "22.38333,114.26667",
    },
    {
        label: "Sha Tin District",
        value: "22.38333,114.18333",
    },
    {
        label: "Tai Po District",
        value: "22.43995,114.1654",
    },
    {
        label: "Tsuen Wan District",
        value: "22.37908,114.10598",
    },
    {
        label: "Tuen Mun District",
        value: "22.39175,113.97157",
    },
    {
        label: "Yuen Long District",
        value: "22.4400132399,114.022146578",
    },
    {
        label: "Kowloon City District",
        value: "22.32866,114.19121",
    },
    {
        label: "Kwun Tong District",
        value: "22.3104,114.2227",
    },
    {
        label: "Sham Shui Po District",
        value: "22.33183,114.1621",
    },
    {
        label: "Wong Tai Sin District",
        value: "22.34299,114.19302",
    },
    {
        label: "Yau Tsim Mong District",
        value: "22.32105,114.17261",
    },
    {
        label: "Eastern District",
        value: "22.27722,114.22519",
    },
    {
        label: "Southern District",
        value: "22.243364,114.147563",
    },
    {
        label: "Wan Chai District",
        value: "22.27702,114.17232",
    },
];

const Map = () => {

    const [center, setCenter] = useState([22.335, 114.265]);
    const toilets = useSelector(state => state.map.toilets);
    const ZOOM_LEVEL = 13;


    const handleChange = (value) => {
        setCenter(value.split(',').map(Number));
    };

    const ChangeView = ({ center, zoom }) => {
        const map = useMap();
        map.setView(center, zoom);
        return null;
    }

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
        <>
            <div style={{ width: '500px', paddingBottom: '10px' }} >
                <Select
                    showSearch
                    filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    style={{ width: '50%' }}
                    placeholder="Select a District"
                    onChange={handleChange}
                    options={options}
                />
            </div>

            <MapContainer
                style={{
                    width: "100wh",
                    height: "70vh"
                }}
                center={center}
                zoom={ZOOM_LEVEL}
            >
                <ChangeView center={center} zoom={ZOOM_LEVEL} />
                <TileLayer
                    url="https://mapapi.geodata.gov.hk/gs/api/v1.0.0/xyz/basemap/WGS84/{z}/{x}/{y}.png"
                />
                <WMSTileLayer
                    url={`${REACT_APP_QGIS_URL !== undefined ? REACT_APP_QGIS_URL : 'https://qgis.johnnyip.com'}
                    /?SERVICE=WMS&request=GetMap&MAP=/etc/qgisserver/csit6000p20230430.qgz`}
                    params={{
                        layers: 'districts,toilets,LandsDLabel',
                        transparent: true,
                        format: 'image/png',
                        version: '1.3.0'
                    }}
                />
                <MyLocationMarker />
                {
                    toilets?.map((t) => <ToiletMarker info={t} key={t.id} />
                    )
                }
            </MapContainer>
        </>
    )
}

export default Map;