import { useState, useEffect } from "react";
import styles from "./Products.module.css";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;

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

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <>
      <h2 className={styles.productsTitle}>All Products</h2>
      <div className={styles.productsContainer}>
        {currentProducts.map((product) => (
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

      {/* Pagination controls */}
      <div className={styles.pagination}>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ⬅️Prev
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={currentPage === index + 1 ? styles.activePage : ""}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next➡️
        </button>
      </div>
    </>
  );
}
