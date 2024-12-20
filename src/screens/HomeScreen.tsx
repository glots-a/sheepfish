import {StyleSheet, FlatList} from 'react-native';
import React, {useCallback, useState} from 'react';
import {Container, DotLoader, ProductComponent} from '../components';
import {Product} from '../types/Product';
import {RefreshControl} from 'react-native-gesture-handler';
import {useAppSelector} from '../redux/hooks/redux-hooks';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {NavParamList} from '../types/NavParamList';

export const HomeScreen = () => {
  const [refresing, setRefreshing] = useState(false);
  const products = useAppSelector(state => state.product);
  const navigation = useNavigation<NavigationProp<NavParamList>>();

  const handleNavigate = useCallback((id: number): void => {
    navigation.navigate('FullProductInfoScreen', {id});
  }, []); //eslint-disable-line

  const renderItem = useCallback(
    ({item}: {item: Product}) => {
      return (
        <ProductComponent
          path={item.image}
          title={item.title}
          price={item.price}
          id={item.id}
          onNavigate={handleNavigate}
        />
      );
    },
    [refresing], //eslint-disable-line
  );

  const key = useCallback((item: Product) => item?.id.toString(), []);

  return (
    <Container>
      {!products.isLoading ? (
        <FlatList
          data={products.products || []}
          contentContainerStyle={S.FLATLIST}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          windowSize={19}
          initialNumToRender={3}
          keyExtractor={key}
          refreshControl={
            <RefreshControl
              refreshing={products.isLoading}
              onRefresh={() => {
                setRefreshing(!refresing);
              }}
            />
          }
        />
      ) : (
        <DotLoader />
      )}
    </Container>
  );
};

const S = StyleSheet.create({
  FLATLIST: {paddingTop: 4},
});
