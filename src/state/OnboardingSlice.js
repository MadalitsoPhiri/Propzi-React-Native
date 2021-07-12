import {createSlice} from "@reduxjs/toolkit";
import { firebase } from "../../firebase"


const OnboardingSlice = createSlice({
    name:"Onboarding",
    initialState:{
     property:{},
     api:{
         fetching:false,
         error:null
     }
    },
    reducers:{
    RepliersLookupSuccessful:(state,action)=>{
        state.property = action.payload
        state.api.fetching = false

    }
    }

})

export default OnboardingSlice.reducer
export const {RepliersLookupSuccessful} = OnboardingSlice.actions