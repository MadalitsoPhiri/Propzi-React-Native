import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";


export const logoutUser = createAsyncThunk('auth/logout', async (email, password) => {
    try{
        firebase
        .auth()
        .signOut()
        .then(() => {
         return null
        })
    }catch(error){
        throw Error(error);
    }
   
  })

export const AuthenticationSlice = createSlice({
name:"auth",
initialState:{
    user:null
},
reducers:{
login:(state,action)=>{
    state.user = action.payload;
},
logout:(state)=>{
    state.user = null;
}
},


});


export const {login,logout} = AuthenticationSlice.actions
export default AuthenticationSlice.reducer