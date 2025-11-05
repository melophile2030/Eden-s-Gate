import { useState, useEffect } from "react";
import styles from "./Products.module.css";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=180")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <>
      <h2 className={styles.productsTitle}>Products</h2>
      <div className={styles.productsContainer}>
        {products.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <img
              src={product.thumbnail}
              alt={product.title}
              className={styles.productImage}
            />
            <h3 className={styles.productTitle}>{product.title}</h3>
            <h3 className={styles.productPrice}>${product.price}</h3>
            <p className={styles.productDescription}>{product.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}
