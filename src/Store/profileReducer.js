import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    loading : false,
    gameData: localStorage.getItem('gameData') ? JSON.parse(localStorage.getItem('gameData')) : null,
}

const profileSlice = createSlice({
    name:'profile',
    initialState:initialState,
    reducers:{
        setUser(state,value){
            state.user = value.payload;
        },
        setGameData(state,value){
            state.gameData = value.payload;
        },
        setLoginLoading(state,value) {
            state.loading = value.payload
        }
    }
})

export const {setUser,setGameData,setLoginLoading} = profileSlice.actions
export default profileSlice.reducer