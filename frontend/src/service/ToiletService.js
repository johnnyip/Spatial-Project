import API from "./API";
import { setToilets } from "../stateSlices/mapSlice";
import store from "../store";

const getToilets = async () => {
    return await API.get("toilets")
    .then((response) => {
      store.dispatch(setToilets(response.data));
      console.log(response.data);
    })
    .catch(error => {
        console.log(error);
        return Promise.reject(new Error('Fail to get toilet info from QGIS server!'));
    });
}

const ToiletService = {
    getToilets,
}
export default ToiletService;