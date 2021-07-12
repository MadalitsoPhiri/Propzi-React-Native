import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import { firebase } from "../../firebase"




 
export const AuthenticationSlice = createSlice({
name:"auth",
initialState:{
    user:null,
    login:{
        loading:false,
        error: null,
    }
},
reducers:{
loginSuccess:(state,action)=>{
    state.user = action.payload;
    state.login.loading = false
},
logoutSuccess:(state)=>{
    state.user = null;
},
startLogin:(state)=>{
  state.login.loading = true
},
loginFailure:(state,action) => {
    state.login.loading =  false
    state.login.error = action.payload
},

},


});


export const {startLogin,loginSuccess,loginFailure,logoutSuccess} = AuthenticationSlice.actions

export const loginUser = (email, password) => {

    return (dispatch)=>{
        dispatch(startLogin())
        firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(
          (user) => {
           dispatch(loginSuccess(user));
          })
          .catch((err) =>{ 
              console.log(err)
            dispatch(loginFailure(err))
          });
    }
  
}


export default AuthenticationSlice.reducer