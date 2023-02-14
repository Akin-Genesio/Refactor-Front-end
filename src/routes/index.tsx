import React from 'react';

import { useAuth } from '../contexts/Auth';

import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';


const Routes = () =>{
    const {signed} = useAuth() 
    
    return signed? <AppRoutes/> : <AuthRoutes/>
}

export default Routes;