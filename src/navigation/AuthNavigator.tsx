import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthStackParamList} from './types';
import LoginScreen from '../screens/auth/LoginScreen';
import CadastroScreen from '../screens/auth/CadastroScreen';
import RecuperarSenhaScreen from '../screens/auth/RecuperarSenhaScreen';
import VerificarCodigoScreen from '../screens/auth/VerificarCodigoScreen';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Cadastro" component={CadastroScreen} />
      <Stack.Screen name="RecuperarSenha" component={RecuperarSenhaScreen} />
      <Stack.Screen name="VerificarCodigo" component={VerificarCodigoScreen} />
    </Stack.Navigator>
  );
}
