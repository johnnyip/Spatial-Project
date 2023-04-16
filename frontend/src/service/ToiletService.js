import API from "./API";
import { setToilets } from "../stateSlices/mapSlice";
import store from "../store";

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
        id: toiletId,
        rate: rate,
    })
    .then( (response) => console.log(response))
    .catch( (error) => console.log(error))
}



const ToiletService = {
    getToilets,
}
export default ToiletService;