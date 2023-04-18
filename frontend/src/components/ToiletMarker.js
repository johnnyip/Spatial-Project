import { Marker, Popup } from "react-leaflet";
import Icons from "./Icons";
import { Rate, Tabs } from "antd";
import ToiletService from "../service/ToiletService";
import { useState } from "react";
import Comments from "./Comments";
import PostComment from "./PostComment";

const ToiletMarker = (props) => {
    const id = props.info.id;
    const position = [props.info.latitude, props.info.longitude];

    const name = props.info[`設施名稱`] + "/ " + props.info["facility name"];
    const address = props.info["地區"] + props.info["地址"] + "/ " + props.info.district + props.info.address;
    const hours = props.info["開放時間"] + "/ " + props.info["opening hours"];
    const tele1 = props.info.telephone1;
    const tele2 = tele1? "/" + props.info.telephone2 : "";
    const contacts = tele1 + tele2;
    const [avgRate, setAvgRate] = useState(0);
    const [rates, setRates] = useState([]);
    const [showPostComment, setShowPostComment] = useState(false);
    const [tabKey, setTabKey] = useState("tab1");

    const handleClickComments = async () => {
        setTabKey("tab2");
    }

    const handleClickMarker = async () => {
        const ratings = await ToiletService.getRatesById(id);
        setRates(ratings);
        const validRates  = ratings.filter(r => r.rate > 0 );
        if (validRates.length !== 0) {
            setAvgRate(validRates.reduce((a, {rate}) => a + rate, 0) / validRates.length);
        }
    }

    const handleTabClick = (key) => {
        setTabKey(key);
    }

    return (
        <Marker position={position} icon={Icons.blue}
            eventHandlers={{
                click: handleClickMarker,
              }}>
            <Popup>
                <Tabs defaultActiveKey="tab1" size="small" activeKey={tabKey} onTabClick={handleTabClick}>
                    <Tabs.TabPane tab="Infomation" key="tab1">
                    <>
                        Name: {name}
                        <br></br>
                        Address: {address}
                        <br></br>
                        Rate:
                        <a onClick={handleClickComments}>
                            <Rate allowHalf={true} disabled={true} value={avgRate} />
                        </a>
                        <br></br>
                        {" (Score: " + avgRate.toFixed(2) + ", " + rates.length + " "}
                        <a onClick={handleClickComments}>comments</a>{")"}
                        <br></br>
                        Opening hours: {hours}
                        <br></br>
                        Contacts: {contacts}
                    </>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Comments" key="tab2">
                        <Comments data={rates} setShowPostComment={setShowPostComment} />
                    </Tabs.TabPane>
                </Tabs>
                {
                    showPostComment && <PostComment setShow={setShowPostComment} updateRates={handleClickMarker} toiletId={id} />
                }
            </Popup>
        </Marker>
    )
}

export default ToiletMarker;