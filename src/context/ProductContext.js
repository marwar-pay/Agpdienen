'use client';
import { createContext, useContext, useState } from 'react';
import { apiGet } from '@/api/apiMethods';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const referenceWebsite = process.env.NEXT_PUBLIC_REFERENCE_WEBSITE;

  const setInitialData = (initialProducts, initialTotal) => {
    setProducts(initialProducts);
    setTotalProducts(initialTotal);
    setLoading(false);
  };

  const fetchProducts = async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams({
        referenceWebsite,
        limit: filters.limit || 8,
        page: filters.page || 1,
        ...(filters.minPrice && { minPrice: filters.minPrice }),
        ...(filters.maxPrice && { maxPrice: filters.maxPrice }),
        ...(filters.minDiscount && { minDiscount: filters.minDiscount }),
        ...(filters.maxDiscount && { maxDiscount: filters.maxDiscount }),
        ...(filters.search && { search: filters.search }),
        ...(filters.sortBy && { sortBy: filters.sortBy }),
        ...(filters.sortOrder && { sortOrder: filters.sortOrder }),
        ...(filters.category && { category: filters.category }),
      });

      const response = await apiGet(`api/product/getproducts?${queryParams}`);
      setProducts(response.data?.products || []);
      setTotalProducts(response.data?.pagination?.totalDocuments || 0);
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        totalProducts,
        loading,
        error,
        fetchProducts,
        setInitialData, // ✅ Make it available
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);
