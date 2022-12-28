import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {bool} from "prop-types";

export interface SystemState {
    sideBarTopics : boolean ,// the side bar where there is categories
    searchEnabled : boolean
}

const initialState : SystemState = {
    sideBarTopics : false,
    searchEnabled : false
}

export const systemSlice = createSlice({
    name : "system",
    initialState,
    reducers : {
        toggleSideBarTopic : (state) => {
            state.sideBarTopics = !state.sideBarTopics
        },
        toggleSearch : (state, action : PayloadAction<boolean>) => {
            state.searchEnabled = action.payload
        }
    }
})


export const {toggleSideBarTopic,toggleSearch} = systemSlice.actions;

export default systemSlice.reducer;