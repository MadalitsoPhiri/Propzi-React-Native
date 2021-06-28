import React from 'react';
import {AuthProvider} from './providers/AuthProvider';
import LoadAssets from './LoadAssets';
import {Routes} from './Routes';




export const Providers = ()=>{
   
    return (<AuthProvider>
       
     
       <LoadAssets>
       
       <Routes/>
      
       </LoadAssets>
           
      
       
    </AuthProvider>)
}