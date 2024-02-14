import { PayloadAction, createSlice } from "@reduxjs/toolkit";
const initialState:StateType = {
    loading:false,
    result:[],
    words:[]
}

const rootSlice = createSlice({
    name: "root",
    initialState,
    reducers: {
        getWordsRequest:(state)=>{
            state.loading=true;
        },
        getWordsSuccess:(state,action:PayloadAction<WordType[]>)=>{
            state.loading=false;
            state.words=action.payload
        },
        getWordsFail:(state,action:PayloadAction<string>)=>{
            state.loading=false;
            state.error =action.payload
        },
        saveResult:(state,action:PayloadAction<string[]>)=>{
            state.loading=false;
            state.result =action.payload
        },
        clearState:(state)=>{
            state.loading=false;
            state.words = []
            state.result = []
            state.error =undefined
        }
    }
});
export const {clearState,saveResult,getWordsFail,getWordsRequest,getWordsSuccess} = rootSlice.actions

export default rootSlice.reducer