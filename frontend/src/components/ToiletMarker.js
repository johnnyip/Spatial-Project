import { Marker, Popup } from "react-leaflet";
import Icons from "./Icons";
import { Rate } from "antd";
import ToiletService from "../service/ToiletService";
import { useState } from "react";

const ToiletMarker = (props) => {
    const id = props.info.id;
    const position = [props.info.latitude, props.info.longitude];

    const name = props.info[`設施名稱`] + "/ " + props.info["facility name"];
    const address = props.info["地區"] + props.info["地址"] + "/ " + props.info.district + props.info.address;
    const hours = props.info["開放時間"] + "/ " + props.info["opening hours"];
    const tele1 = props.info.telephone1;
    const tele2 = tele1? "/" + props.info.telephone2 : "";
    const contacts = tele1 + tele2;
    const [avgRate, setAvgRate] = useState(props.info.average_rating);
    const [rates, setRates] = useState([]);

    const handleRateChange = async (val) => {
        ToiletService.updateToiletRate(id, val);
        const newRates = [...rates, {id: rates.length + 1, toiletId: id, rate: val}];
        const newAvg = newRates.reduce((a, {rate}) => a + rate, 0) / newRates.length;
        setRates(newRates);
        setAvgRate(newAvg);
    }

    const handleClickMarker = async () => {
        const ratings = await ToiletService.getRatesById(id);
        setRates(ratings);
    }

    return (
        <Marker position={position} icon={Icons.blue}
            eventHandlers={{
                click: handleClickMarker,
              }}>
            <Popup>
                Name: {name}
                <br></br>
                Address: {address}
                <br></br>
                Rate: <Rate allowHalf defaultValue={avgRate} onChange={handleRateChange} value={avgRate} />
                {" (Score: " + avgRate.toFixed(2) + ", " + rates.length + " ratings)"}
                <br></br>
                Opening hours: {hours}
                <br></br>
                Contacts: {contacts}
            </Popup>
        </Marker>
    )
}

export default ToiletMarker;