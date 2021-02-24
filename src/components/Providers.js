import React from 'react';
import {AuthProvider} from './providers/AuthProvider';
import {PropertyDataProvider} from './providers/PropertyDataProvider';

import {Routes} from './Routes';



export const Providers = ()=>{
    return (<AuthProvider>
       
            <Routes/>
        
       
    </AuthProvider>)
}