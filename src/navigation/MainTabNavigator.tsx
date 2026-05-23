import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainTabParamList} from './types';

import HomeScreen from '../screens/main/HomeScreen';
import DisciplinasScreen from '../screens/main/DisciplinasScreen';
import CalendarioScreen from '../screens/main/CalendarioScreen';
import NotificacoesScreen from '../screens/main/NotificacoesScreen';
import PerfilScreen from '../screens/main/PerfilScreen';
import DisciplinaAtividadesScreen from '../screens/main/DisciplinaAtividadesScreen';
import DisciplinaNotasScreen from '../screens/main/DisciplinaNotasScreen';
import DisciplinaPessoasScreen from '../screens/main/DisciplinaPessoasScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();
const Stack = createNativeStackNavigator();

function DisciplinasStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="DisciplinasList" component={DisciplinasScreen} />
      <Stack.Screen
        name="DisciplinaAtividades"
        component={DisciplinaAtividadesScreen}
      />
      <Stack.Screen
        name="DisciplinaNotas"
        component={DisciplinaNotasScreen}
      />
      <Stack.Screen
        name="DisciplinaPessoas"
        component={DisciplinaPessoasScreen}
      />
    </Stack.Navigator>
  );
}

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {display: 'none'},
      }}>
      <Tab.Screen name="HomeTab" component={HomeScreen} />
      <Tab.Screen name="DisciplinasTab" component={DisciplinasStack} />
      <Tab.Screen name="CalendarioTab" component={CalendarioScreen} />
      <Tab.Screen
        name="NotificacoesTab"
        component={NotificacoesScreen}
      />
      <Tab.Screen name="PerfilTab" component={PerfilScreen} />
    </Tab.Navigator>
  );
}
