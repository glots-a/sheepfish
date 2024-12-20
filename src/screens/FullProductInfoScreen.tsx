import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {colors} from '../constans';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {NavParamList} from '../types/NavParamList';
import {CustomButton, DotLoader} from '../components';
import {useProduct} from '../hooks/useProduct';

type FullProductInfoScreenRouteProp = RouteProp<
  NavParamList,
  'FullProductInfoScreen'
>;
type FullProductInfoScreenNavigationProp = StackNavigationProp<
  NavParamList,
  'FullProductInfoScreen'
>;

type Props = {
  route: FullProductInfoScreenRouteProp;
  navigation: FullProductInfoScreenNavigationProp;
};

export const FullProductInfoScreen: React.FC<Props> = ({route, navigation}) => {
  const {id} = route.params;
  const {product, isLoading} = useProduct(id);

  if (isLoading) {
    return <DotLoader />;
  }

  if (!product) {
    return <Text>Product not found</Text>;
  }

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.padding}>
      <View style={styles.card}>
        <FastImage
          style={styles.image}
          source={{uri: product.image}}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>
            {product.title}
          </Text>
          <Text style={styles.price}>${product.price}</Text>
          <View style={styles.ratingContainer}>
            <Text
              style={
                styles.ratingText
              }>{`Rating: ${product.rating.rate}`}</Text>
            <Text
              style={styles.ratingCount}>{`(${product.rating.count})`}</Text>
          </View>
        </View>
      </View>
      <CustomButton title={'Go back'} onHandle={handleGoBack} />
    </View>
  );
};

const styles = StyleSheet.create({
  padding: {
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: colors.white,
    overflow: 'hidden',
    marginTop: 4,
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 8,
    marginBottom: 32,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 8,
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.orange,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: colors.gray,
  },
  ratingCount: {
    fontSize: 12,
    color: colors.gray,
    marginLeft: 4,
  },
});
