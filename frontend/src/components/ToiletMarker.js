import { Marker, Popup } from "react-leaflet";
import Icons from "./Icons";
import { Rate } from "antd";

const ToiletMarker = (props) => {
    const id = props.info.id;
    const position = [props.info.latitude, props.info.longitude];

    const name = props.info[`設施名稱`] + "/ " + props.info["facility name"];
    const address = props.info["地區"] + props.info["地址"] + "/ " + props.info.district + props.info.address;
    const hours = props.info["開放時間"] + "/ " + props.info["opening hours"];
    const tele1 = props.info.telephone1;
    const tele2 = tele1? "/" + props.info.telephone2 : "";
    const contacts = tele1 + tele2;

    return (
        <Marker position={position} icon={Icons.blue}>
            <Popup>
                Name: {name}
                <br></br>
                address: {address}
                <br></br>
                Rate: <Rate/>
                <br></br>
                Opening hours: {hours}
                <br></br>
                Contacts: {contacts}
            </Popup>
        </Marker>
    )
}

export default ToiletMarker;