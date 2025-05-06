import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Modal } from 'react-native';
import { useForm, SubmitHandler } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StringInput } from '@/components/StringInput';
import { DropDownInput } from '@/components/DropDownInput';
import { Button } from '@/components/Button';
import CustomAlert from '@/components/CustomAlert';
import { useFetchCategories, useFetchProductsByCategory, useAddProduct } from '@/api/productApi';
import { Item } from 'react-native-picker-select';
import { useTranslation } from 'react-i18next';

// Define form input types
type AddProductInputs = {
  category: string;
  product: string;
  productionCapacity: number;
  pricePerKg: number;
};

export default function AddProductScreen() {
  const { t } = useTranslation();
  
  const { control, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm<AddProductInputs>();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [alertVisible, setAlertVisible] = useState<boolean>(false);
  const [alertProps, setAlertProps] = useState<{ title: string; body: string; }>({ title: '', body: '' });

  // Fetch categories and products
  const { data: categories, isLoading: categoriesLoading, error: categoriesError } = useFetchCategories();
  const { data: products, isLoading: productsLoading, error: productsError } = useFetchProductsByCategory(selectedCategory);
  const { mutate: addProduct } = useAddProduct();

  // Watch for category selection
  const watchCategory = watch('category');

  // Update products based on selected category
  useEffect(() => {
    if (watchCategory) {
      setSelectedCategory(watchCategory);
      setValue('product', ''); // Reset product field when category changes
    }
  }, [watchCategory, setValue]);

  // Handle form submission
  const onSubmit: SubmitHandler<AddProductInputs> = (data) => {
    setIsSubmitting(true);
    const productData = {
      category: data.category,
      product: data.product,
      production_capacity: data.productionCapacity,
      price_per_kg: data.pricePerKg,
    };

    // Call the addProduct mutation
    addProduct(productData, {
      onSuccess: () => {
        setAlertProps({ title: t('Success'), body: t('Product sent for approval successfully!') });
        setAlertVisible(true);

        // Reset the form fields after successful submission
        reset();
        setSelectedCategory('');
        
        setIsSubmitting(false);
      },
      onError: (error) => {
        console.error('Error adding product:', error);
        setAlertProps({ title: t('Error'), body: t('Failed to send product for approval.') });
        setAlertVisible(true);
        setIsSubmitting(false);
      },
    });
  };

  // Convert categories to RNPickerSelect format
  const categoryItems: Item[] = (categories || []).map((category, index) => ({
    label: t(typeof category === 'string' ? category : category.name),
    value: typeof category === 'string' ? category : category.name,
    key: `category_${index}`,
  }));
  
  const productItems: Item[] = (products || []).map((product, index) => ({
    label: t(product.name),
    value: product.name,
    key: `product_${index}`,
  }));
  

  // Log errors if present
  if (categoriesError) console.error('Error fetching categories:', categoriesError);
  if (productsError) console.error('Error fetching products:', productsError);

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          {/* <Text style={styles.title}>{t('Add New Product')}</Text> */}
        </View>

        {/* Dropdown for category selection */}
        <DropDownInput
          name="category"
          items={categoryItems.length ? categoryItems : [{ label: t('No Categories Available'), value: 'no_category', key: 'no_category' }]}
          rules={{ required: t('Please select a category') }}
          placeholder={t('Choose category')}
          control={control}
          error={errors.category}
          loading={categoriesLoading}
        />

        {/* Conditionally render the product dropdown */}
        {selectedCategory && selectedCategory !== 'no_category' && (
          <DropDownInput
            name="product"
            items={productItems.length ? productItems : [{ label: t('No Products Available'), value: 'no_product', key: 'no_product' }]}
            rules={{ required: t('Please select a product') }}
            placeholder={t('Choose product')}
            control={control}
            error={errors.product}
            loading={productsLoading}
          />
        )}

        {/* Input for production capacity */}
        <StringInput
          name="productionCapacity"
          rules={{
            required: t('Production capacity is required'),
            min: {
              value: 200,
              message: t('Minimum: 200 kg'),
            },
          }}
          placeholder={t('Production Capacity')}
          keyboardType="number-pad"
          control={control}
          error={errors.productionCapacity}
          rightText={t('Kg/year')}
        />

        {/* Input for price per Kg */}
        <StringInput
          name="pricePerKg"
          rules={{ required: t('Price per Kg is required') }}
          placeholder={t('Price per Kg')}
          keyboardType="number-pad"
          control={control}
          error={errors.pricePerKg}
          rightText={t('DT')}
        />

        {/* Submit button with spinner */}
        <Button
          title={isSubmitting ? t("Submitting...") : t("Send for Approval")}
          onPress={handleSubmit(onSubmit)}
          loading={isSubmitting}
          disabled={isSubmitting || Object.keys(errors).length > 0}
        />
      </KeyboardAwareScrollView>

      {/* Custom Alert for notifications */}
      <Modal
        visible={alertVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setAlertVisible(false)}
      >
        <View style={styles.overlay}>
          <CustomAlert
            messageTitle={alertProps.title}
            messageBody={alertProps.body}
            buttonText={t("Close")}
            onClose={() => setAlertVisible(false)}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
