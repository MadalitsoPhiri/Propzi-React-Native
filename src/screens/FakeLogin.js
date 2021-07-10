import React from 'react';
import {Provider,useSelector,useDispatch} from "react-redux";
import { Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import LoadAssets from "../components/LoadAssets";
import { login,logout } from "../state/Authentication"




export default FakeLogin = ()=>{

    const auth = useSelector((state)=>state.auth)
    const store = useSelector((state=>state))
    const dispatch = useDispatch()
    const user = "blah blah"

return (
    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
           <Text style={{fontFamily:"Poppins-Medium"}}>Status:<Text>{auth.user?`Logged in`:`Logged Out`}</Text></Text>
       <TouchableOpacity onPress={()=>{
             dispatch(login(user))
       }} style={{backgroundColor:"green",paddingHorizontal:20,paddingVertical:10,marginVertical:16,borderRadius:12}}>
           <Text style={{color:"white",fontFamily:"Poppins-Medium"}}>Login</Text>
       </TouchableOpacity>
       <TouchableOpacity onPress={()=>{
             dispatch(logout())
       }} style={{backgroundColor:"red",paddingHorizontal:20,paddingVertical:10,marginVertical:16,borderRadius:12}}>
           <Text style={{color:"white",fontFamily:"Poppins-Medium"}}>Logout</Text>
       </TouchableOpacity>
       </View>
)


}