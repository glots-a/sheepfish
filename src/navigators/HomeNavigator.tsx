import React from 'react';
import {FullProductInfoScreen, HomeScreen} from '../screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

type RootStackParamList = {
  HomeScreen: undefined;
  FullProductInfoScreen: {id: number};
};

const {Navigator, Screen} = createNativeStackNavigator<RootStackParamList>();

export const HomeNavigator = () => {
  return (
    <Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name="HomeScreen" component={HomeScreen} />
      <Screen name="FullProductInfoScreen" component={FullProductInfoScreen} />
    </Navigator>
  );
};
