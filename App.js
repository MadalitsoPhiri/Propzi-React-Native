import React from 'react';
import {AuthProvider} from './src/components/providers/AuthProvider';
import LoadAssets from "./src/components/LoadAssets";
import  {Routes} from "./src/components/Routes";
import {store} from "./src/state/store";
import {Provider} from "react-redux";
import { Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import FakeLogin from "./src/screens/FakeLogin"



const App = ()=>{
   
return (<Provider store={store}>
       
     
       <LoadAssets>
       
       <Routes/>
       {/* <FakeLogin/> */}
       
       </LoadAssets>
           
      
       
    </Provider>)
}

export default App 
 