import { Text, View, StyleSheet, Pressable, FlatList, Image } from "react-native";
import { useState, useCallback, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link, useRouter } from "expo-router";
import { useFetchAllProducts } from "@/api/productApi";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/api/schemas/types";
import Spinner from "@/components/Spinner";
import { HeadingTabs } from "@/components/HeadingTabs";
import { useTranslation } from "react-i18next";
import { getImage } from "@/data/imageHelper";
import { useFocusEffect } from "@react-navigation/native";
import faceImg from "@/assets/face-content.png"; // Sad face image for no validated products
import happyImg from "@/assets/happy-face.png"; // Happy face image for no rejected products
import { styles } from "@/globalStyles";

export default function ProductsScreen() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar"; // Check if the selected language is Arabic
  const router = useRouter();

  const { data: products, isLoading, error, refetch } = useFetchAllProducts();

  useFocusEffect(
    useCallback(() => {
      refetch(); // Refetch products when screen is focused
    }, [refetch])
  );

  // Tab items and reverse logic for Arabic
  const originalTabItems = [t("Validated"), t("Pending"), t("Rejected")];
  const tabItems = isArabic ? [...originalTabItems].reverse() : originalTabItems;

  // Determine the default tab index dynamically
  const defaultTabIndex = isArabic
    ? tabItems.indexOf(t("Validated")) // Get the reversed index of "Validated"
    : 0;

  const [tabIndex, setTabIndex] = useState(defaultTabIndex);

  useEffect(() => {
    // Update tabIndex dynamically if language changes
    setTabIndex(defaultTabIndex);
  }, [defaultTabIndex]);

  // Filter products by status based on the tabIndex
  const filteredProducts: Product[] = Array.isArray(products)
    ? products.filter((product) => {
        if (tabIndex === tabItems.indexOf(t("Validated"))) return product.status === "validated";
        if (tabIndex === tabItems.indexOf(t("Pending"))) return product.status === "pending";
        if (tabIndex === tabItems.indexOf(t("Rejected"))) return product.status === "rejected";
        return false;
      })
    : [];

  const handleProductAction = (product: Product) => {
    router.push({
      pathname: "/products/updateProductModal",
      params: {
        id: product.id,
        name: product.name,
        category: product.categ_id,
        capacity: product.total_production_capacity,
        price: product.price,
      },
    });
  };

  return (
    <>
      <View style={styles.headingProduct}>
        <HeadingTabs
          tabItems={tabItems}
          tabIndex={tabIndex}
          setTabIndex={setTabIndex}
        />
        <Link href="/products/addProductModal" asChild>
          <Pressable hitSlop={20}>
            <Ionicons name="add-circle-outline" size={60} color="#4B7447" />
          </Pressable>
        </Link>
      </View>

      {isLoading ? (
        <Spinner message={t("Loading products...")} />
      ) : (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ProductCard
              productName={item.name}
              productImage={getImage(item.name)}
              productionCapacity={item.total_production_capacity}
              category={item.categ_id?.length ? item.categ_id[1] : ""}
              price={item.price}
              status={item.status}
              onAction={handleProductAction}
            />
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainerProduct}>
              {!products?.length ? (
                <>
                  <Ionicons
                    name="arrow-up"
                    size={80}
                    color="#4B7447"
                    style={styles.arrowProduct}
                  />
                  <Text style={styles.addProductText}>
                    {t("No products found. Add a product from here!")}
                  </Text>
                </>
              ) : tabIndex === tabItems.indexOf(t("Pending")) && !filteredProducts.length ? (
                <>
                  <Image source={faceImg} style={styles.imageFace} resizeMode="contain" />
                  <Text style={styles.addProductText}>
                    {t("No pending products. Add a new product or check your validated products!")}
                  </Text>
                </>
              ) : tabIndex === tabItems.indexOf(t("Validated")) && !filteredProducts.length ? (
                <>
                  <Image source={faceImg} style={styles.imageFace} resizeMode="contain" />
                  <Text style={styles.addProductText}>
                    {t(
                      "No validated products exist. Our team will check it soon. You can check the pending tab or add a product using the + button."
                    )}
                  </Text>
                </>
              ) : tabIndex === tabItems.indexOf(t("Rejected")) && !filteredProducts.length ? (
                <>
                  <Image source={happyImg} style={styles.imageFace} resizeMode="contain" />
                  <Text style={styles.addProductText}>
                    {t(
                      "No rejected products! Great job! Keep checking for updates and continue to grow your offerings. 😊"
                    )}
                  </Text>
                </>
              ) : (
                <Text style={styles.addProductText}>
                  {t("No products found in this category.")}
                </Text>
              )}
            </View>
          }
        />
      )}
    </>
  );
}
