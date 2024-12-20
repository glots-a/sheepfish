import {useState, useEffect} from 'react';
import {useAppSelector} from '../redux/hooks/redux-hooks';
import {Product} from '../types/Product';

export const useProduct = (id: number) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const products = useAppSelector(state => state.product.products);

  useEffect(() => {
    const getProduct = async (
      productId: number,
      allProducts: Product[] | null,
    ): Promise<Product | null> => {
      if (!allProducts) {
        return null;
      }
      return (
        allProducts.find(productItem => productItem.id === productId) || null
      );
    };

    const fetchProduct = async () => {
      setIsLoading(true);
      const result = await getProduct(id, products);
      setProduct(result);
      setIsLoading(false);
    };

    fetchProduct();
  }, [id, products]);

  return {product, isLoading};
};
