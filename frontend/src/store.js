import {configureStore} from "@reduxjs/toolkit";
import mapReducer from "./stateSlices/mapSlice";

export default configureStore({
    reducer: {
        map: mapReducer,
    }
});