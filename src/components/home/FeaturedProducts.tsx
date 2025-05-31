import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '@/components/products/ProductCard';
import { Product } from '@/data/products'; // Import also import fallback data
import products from '@/data/products'; // Import fallback data
import { ArrowRight, Loader2, RefreshCcw, AlertCircle } from 'lucide-react';
import { getDatabase, ref, onValue, DatabaseReference, get } from 'firebase/database';
import { database } from '@/lib/firebase';

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  // Fetch products function with error handling
  const fetchProducts = useCallback(() => {
    setLoading(true);
    setError(null);
    
    try {
      if (!database) {
        throw new Error("Firebase database is not initialized");
      }
      
      const productsRef = ref(database, 'products');
      
      // First try to get data once
      get(productsRef).then((snapshot) => {
        if (snapshot.exists()) {
          processProductData(snapshot.val());
        } else {
          // If no data, fall back to static data
          const filteredProducts = products.filter(p => p.featured);
          setFeaturedProducts(filteredProducts);
          setLoading(false);
        }
      }).catch((error) => {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again.");
        
        // Fall back to static data
        const filteredProducts = products.filter(p => p.featured);
        setFeaturedProducts(filteredProducts);
        setLoading(false);
      });
      
      // Then set up real-time listener
      const unsubscribe = onValue(productsRef,
        (snapshot) => {
          if (snapshot.exists()) {
            processProductData(snapshot.val());
          } else {
            // If real-time data is empty but we already have fallback data, keep it
            if (featuredProducts.length === 0) {
              const filteredProducts = products.filter(p => p.featured);
              setFeaturedProducts(filteredProducts);
            }
            setLoading(false);
          }
        },
        (error) => {
          console.error("Real-time database error:", error);
          setError("Connection to database lost. Using cached data.");
          
          // Only fall back if we don't already have products
          if (featuredProducts.length === 0) {
            const filteredProducts = products.filter(p => p.featured);
            setFeaturedProducts(filteredProducts);
          }
          setLoading(false);
        }
      );
      
      return unsubscribe;
    } catch (error) {
      console.error("Fatal error in Firebase setup:", error);
      setError("Could not connect to the database. Using offline data.");
      
      // Fall back to static data
      const filteredProducts = products.filter(p => p.featured);
      setFeaturedProducts(filteredProducts);
      setLoading(false);
      
      // Return empty function as unsubscribe
      return () => {};
    }
  }, [retryCount]);
  
  // Process product data helper function
  const processProductData = (productsData: any) => {
    const productsList: Product[] = [];
    
    Object.keys(productsData).forEach((key) => {
      const product = productsData[key];
      
      // Ensure images is always an array
      if (!product.images) {
        product.images = [];
      }
      
      // Only include featured products
      if (product.featured) {
        productsList.push({
          ...product,
          id: key
        });
      }
    });
    
    setFeaturedProducts(productsList);
    setLoading(false);
    setError(null);
  };

  // Set up products fetch
  useEffect(() => {
    const unsubscribe = fetchProducts();
    return () => unsubscribe();
  }, [fetchProducts]);
  
  // Function to retry loading
  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
  };

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-semibold mb-4">
              المنتجات المميزة
            </h2>
            <p className="text-foreground/60 max-w-2xl">
              اكتشف مجموعتنا المختارة من المنتجات الاستثنائية التي تجمع بين الشكل والوظيفة.
            </p>
          </div>
          <Link 
            to="/products" 
            className="mt-6 md:mt-0 group inline-flex items-center font-medium text-primary hover:text-primary/80 transition-colors"
          >
            عرض جميع المنتجات
            <ArrowRight className="mr-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
            <p className="text-foreground/60">جاري تحميل المنتجات المميزة...</p>
          </div>
        ) : featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {featuredProducts.map((product, index) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                className="animate-in from-bottom"
                style={{ '--index': index } as React.CSSProperties}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-2xl font-medium mb-2">لا توجد منتجات مميزة</p>
            <p className="text-foreground/60">
              لم نتمكن من العثور على منتجات مميزة. يرجى التحقق مرة أخرى لاحقًا.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
