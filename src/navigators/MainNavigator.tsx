import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import React, {useEffect} from 'react';
import {Wrapper} from '../components';
import {AddProductScreen, ProfileScreen} from '../screens';
import {PersonSvg, AddSvg, HomeSvg} from '../assets';
import {useTheme} from '@react-navigation/native';
import {HomeNavigator} from './HomeNavigator';
import {useAppDispatch, useAppSelector} from '../redux/hooks/redux-hooks';
import {productApi} from '../redux/api/productApi';

const {Navigator, Screen} = createMaterialTopTabNavigator();

const renderTabBarIcon = (focused: boolean, instance: string) => {
  const options: {[key: string]: React.JSX.Element} = {
    home: <HomeSvg focused={focused} />,
    ad: <AddSvg focused={focused} />,
    profile: <PersonSvg focused={focused} />,
  };
  return options[instance];
};

export const MainNavigator = () => {
  const {colors} = useTheme();
  const products = useAppSelector(state => state.product.products);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (products === null) {
      dispatch(productApi.endpoints.getProducts.initiate(undefined));
    }
  }, []); // eslint-disable-line

  return (
    <Wrapper>
      <Navigator
        screenOptions={{
          lazy: true,
          tabBarIndicatorStyle: {backgroundColor: colors.border, height: 2},
          tabBarShowIcon: true,
          tabBarStyle: {backgroundColor: colors.card},
          tabBarIconStyle: {
            justifyContent: 'center',
            alignItems: 'center',
          },
          tabBarItemStyle: {flexDirection: 'row', alignItems: 'center'},
        }}>
        <Screen
          name="HomeNavigator"
          component={HomeNavigator}
          options={{
            title: 'PRODUCTS',
            tabBarIcon: ({focused}: any) => renderTabBarIcon(focused, 'home'),
          }}
        />
        <Screen
          name="AddProductScreen"
          component={AddProductScreen}
          options={{
            title: 'Add',
            tabBarIcon: ({focused}: any) => renderTabBarIcon(focused, 'ad'),
          }}
        />
        <Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{
            title: 'PROFILE',
            tabBarIcon: ({focused}: any) =>
              renderTabBarIcon(focused, 'profile'),
          }}
        />
      </Navigator>
    </Wrapper>
  );
};
