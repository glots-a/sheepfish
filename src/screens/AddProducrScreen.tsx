import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {launchImageLibrary} from 'react-native-image-picker';
import {Container, CustomButton} from '../components';
import {colors} from '../constans';
import {useAppDispatch} from '../redux/hooks/redux-hooks';
import {addNewProduct} from '../redux/productSlice';

const ProductSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  price: Yup.number()
    .typeError('Price must be a number')
    .required('Price is required'),
  description: Yup.string().required('Description is required'),
  category: Yup.string().required('Category is required'),
  image: Yup.string().required('Image is required'),
});

export const AddProductScreen = () => {
  const [imageUri, setImageUri] = useState<string | null | undefined>(null);
  const dispatch = useAppDispatch();

  const pickImage = async (
    setFieldValue: (field: string, value: any) => void,
  ) => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
      quality: 1,
    });

    if (result.assets && result.assets.length > 0) {
      const imageuri = result.assets[0].uri;
      setImageUri(imageuri);
      setFieldValue('image', imageuri);
    }
  };

  return (
    <Container>
      <Formik
        initialValues={{
          title: '',
          price: '',
          description: '',
          category: '',
          image: '',
        }}
        validationSchema={ProductSchema}
        onSubmit={(values, {resetForm}) => {
          dispatch(addNewProduct(values));
          setImageUri(null);
          resetForm();
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <View style={S.FORM}>
            <View style={S.INPUT_CONTAINER}>
              <TextInput
                placeholder="Title"
                placeholderTextColor="#aaa"
                style={S.INPUT}
                onChangeText={handleChange('title')}
                onBlur={handleBlur('title')}
                value={values.title}
              />
              {touched.title && errors.title && (
                <Text style={S.ERROR_TEXT}>{errors.title}</Text>
              )}
            </View>

            <View style={S.INPUT_CONTAINER}>
              <TextInput
                placeholder="Price"
                placeholderTextColor="#aaa"
                style={S.INPUT}
                keyboardType="numeric"
                onChangeText={handleChange('price')}
                onBlur={handleBlur('price')}
                value={values.price}
              />
              {touched.price && errors.price && (
                <Text style={S.ERROR_TEXT}>{errors.price}</Text>
              )}
            </View>

            <View style={S.INPUT_CONTAINER}>
              <TextInput
                placeholder="Category"
                placeholderTextColor="#aaa"
                style={S.INPUT}
                onChangeText={handleChange('category')}
                onBlur={handleBlur('category')}
                value={values.category}
              />
              {touched.category && errors.category && (
                <Text style={S.ERROR_TEXT}>{errors.category}</Text>
              )}
            </View>

            <View style={S.INPUT_CONTAINER}>
              <TextInput
                placeholder="Description"
                placeholderTextColor="#aaa"
                style={S.INPUT}
                multiline
                numberOfLines={3}
                onChangeText={handleChange('description')}
                onBlur={handleBlur('description')}
                value={values.description}
              />
              {touched.description && errors.description && (
                <Text style={S.ERROR_TEXT}>{errors.description}</Text>
              )}
            </View>

            <TouchableOpacity
              style={S.IMAGE_PICKER}
              onPress={() => pickImage(setFieldValue)}>
              <Text style={S.PICKER_TEXT}>
                {imageUri ? 'Change Image' : 'Pick an Image'}
              </Text>
            </TouchableOpacity>
            {imageUri && <Image source={{uri: imageUri}} style={S.IMAGE} />}
            {touched.image && errors.image && (
              <Text style={S.ERROR_TEXT}>{errors.image}</Text>
            )}

            <CustomButton title="Submit" onHandle={handleSubmit} />
          </View>
        )}
      </Formik>
    </Container>
  );
};

const S = StyleSheet.create({
  FORM: {
    paddingVertical: 16,
  },
  INPUT_CONTAINER: {
    marginBottom: 12,
  },
  INPUT: {
    borderRadius: 8,
    padding: 10,
    backgroundColor: colors.white,
    color: colors.black,
  },
  ERROR_TEXT: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  IMAGE_PICKER: {
    backgroundColor: colors.orange,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  PICKER_TEXT: {
    color: colors.white,
    fontSize: 16,
  },
  IMAGE: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
});
