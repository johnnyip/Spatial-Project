import {createSlice} from "@reduxjs/toolkit"

export const mapSlice = createSlice({
    name: "map",
    initialState: {
        toilets: [],
    },
    reducers: {
        setToilets: (state, action) => {
            state.toilets = action.payload;
        },
    }
});

export const {setToilets} = mapSlice.actions;
export default mapSlice.reducer;