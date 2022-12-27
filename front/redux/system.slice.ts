import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface SystemState {
    sideBarTopics : boolean // the side bar where there is categories
}

const initialState : SystemState = {
    sideBarTopics : false
}

export const systemSlice = createSlice({
    name : "system",
    initialState,
    reducers : {
        toggleSideBarTopic : (state) => {
            state.sideBarTopics = !state.sideBarTopics
        }
    }
})


export const {toggleSideBarTopic} = systemSlice.actions;

export default systemSlice.reducer;