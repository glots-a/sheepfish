import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import {colors} from '../constans';
import FastImage from 'react-native-fast-image';

type Props = {
  path: string;
  title: string;
  price: number | string;
  id: number;
  onNavigate: (id: number) => void;
};

export const ProductComponent: React.FC<Props> = memo(
  ({path, title, price, id, onNavigate}) => {
    return (
      <TouchableOpacity style={S.ITEM_CTR} onPress={() => onNavigate(id)}>
        <FastImage
          source={{
            uri: path,
            priority: FastImage.priority.low,
          }}
          style={S.IMAGE}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={S.ABSOLUTE}>
          <Text style={S.DESCRIPTION}> {title}</Text>
          <Text style={S.PRICE}> {price}$</Text>
        </View>
      </TouchableOpacity>
    );
  },
);

const S = StyleSheet.create({
  ITEM_CTR: {
    backgroundColor: colors.white,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 8,
  },
  IMAGE: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 8,
  },
  ABSOLUTE: {
    backgroundColor: colors.gray,
    padding: 16,
    opacity: 0.8,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  DESCRIPTION: {
    fontSize: 16,
    color: colors.white,
    width: '75%',
  },
  PRICE: {
    fontSize: 18,
    color: colors.white,
    fontWeight: '600',
  },
});
