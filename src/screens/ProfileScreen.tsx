import {View, StyleSheet} from 'react-native';
import React from 'react';
import {Container, CustomButton} from '../components';
import {useAppSelector, useAppDispatch} from '../redux/hooks/redux-hooks';
import {swithcThemeMode} from '../redux/productSlice';

export const ProfileScreen = () => {
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector(state => state.product.isDarkTheme);

  const handleThemeChange = () => {
    dispatch(swithcThemeMode());
  };

  return (
    <Container>
      <View style={S.CTR}>
        <CustomButton
          title={`Change theme to ${isDarkMode ? 'ligth' : 'dark'}`}
          onHandle={handleThemeChange}
        />
      </View>
    </Container>
  );
};

const S = StyleSheet.create({
  CTR: {
    paddingVertical: 24,
    justifyContent: 'flex-end',
    flex: 1,
  },
});
