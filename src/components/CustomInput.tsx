import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

export const CustomInput = () => {
  return (
    <View>
      <View style={S.CTR}>
        <TextInput />
      </View>
    </View>
  );
};

const S = StyleSheet.create({
  CTR: {
    width: '100%',
    marginBottom: 12,
  },
  INPUT: {
    height: 40,
    color: '#fff',
  },
  TEXT: {
    color: 'red',
    alignSelf: 'stretch',
    fontSize: 12,
    position: 'absolute',
    bottom: -4,
  },
});
