import API from "./API";
import { setToilets } from "../stateSlices/mapSlice";
import store from "../store";
import { Empty } from "antd";

const getToilets = async () => {
    await API.get("toilets")
    .then((response) => {
        store.dispatch(setToilets(response.data));
    })
    .catch(error => {
        console.log(error);
        return Promise.reject(new Error('Fail to get toilet info from QGIS server!'));
    });
}

const updateToiletRate = async (toiletId, rate) => {
    API.post("rate",{
        toiletId: toiletId,
        rate: rate,
    })
    .then( (response) => console.log(response))
    .catch( (error) => console.log(error))
}

const getRates = async () => {
    await API.get("rate")
    .then((response) => {
        console.log(response.data);
    })
    .catch(error => {
        console.log(error);
        return Promise.reject(new Error('Fail to rates from QGIS server!'));
    });
}

const getRatesById = async (toiletId) => {
    const res = await API.get(`/rate/${toiletId}`)
        .catch(err => { return {data: []}} );
    return res.data;
}

const ToiletService = {
    getToilets, updateToiletRate, getRatesById, getRates
}
export default ToiletService;