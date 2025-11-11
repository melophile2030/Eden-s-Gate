import { useState, useEffect, useMemo } from "react";
import styles from "../styles/Products.module.css";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("title-asc");

  const itemsPerPage = 20;

  // Fetch products safely
  useEffect(() => {
    const controller = new AbortController();

    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("https://dummyjson.com/products?limit=190", {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Failed to load products:", err);
          setError("Failed to load products. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
    return () => controller.abort();
  }, []);

  // Filter products by search term
  const filteredProducts = useMemo(() => {
    const term = searchTerm.toLowerCase();
    if (!term) return products;
    return products.filter((product) => {
      const matchTitle = product.title?.toLowerCase().includes(term);
      const matchCategory = product.category?.toLowerCase().includes(term);
      const matchTags = product.tags?.some((tag) =>
        tag.toLowerCase().includes(term)
      );
      return matchTitle || matchCategory || matchTags;
    });
  }, [products, searchTerm]);

  //  Sorting logic
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    sorted.sort((a, b) => {
      if (sortOption === "price-low-high") return a.price - b.price;
      if (sortOption === "price-high-low") return b.price - a.price;
      if (sortOption === "title-asc") return a.title.localeCompare(b.title);
      if (sortOption === "title-desc") return b.title.localeCompare(a.title);
      return 0;
    });
    return sorted;
  }, [filteredProducts, sortOption]);

  // 📄 Pagination
  const totalPages = Math.max(
    1,
    Math.ceil(sortedProducts.length / itemsPerPage)
  );
  const currentProducts = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return sortedProducts.slice(indexOfFirstItem, indexOfLastItem);
  }, [sortedProducts, currentPage]);

  // Keep page number valid when filtering changes the product count
  useEffect(() => {
    setCurrentPage((prev) => {
      if (prev > totalPages) return totalPages;
      if (prev < 1) return 1;
      return prev;
    });
  }, [totalPages]);

  // 🧾 Loading / Error UI
if (loading) {
  return (
    <div className={styles.loading}>
      <img src="loading.png" alt="Loading..." />
    </div>
  );
}

if (error) {
  return (
    <div className={styles.error}>
      <img src="error.png" alt="Error" />
      <p>{error}</p>
    </div>
  );
}

if (!loading && products.length === 0) {
  return (
    <div className={styles.loading}>
      <img src="loading.png" alt="Not found" />
    </div>
  );
}


  // 🧱 UI Layout
  return (
    <>
      <h2 className={styles.productsTitle}>Products</h2>

      {/* 🔍 Search */}
      <div className={styles.searchBar}>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // reset pagination
            }}
          />
          <button type="button" className={styles.searchButton}>
            <img src="search.png" alt="search" />
          </button>
        </form>
      </div>

      {/*  Sort */}
      <div className={styles.sortContainer}>
        <label htmlFor="sort">
          <img src="sort.png" alt="sort" /> Sort
        </label>
        <select
          id="sort"
          value={sortOption}
          onChange={(e) => {
            setSortOption(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="title-asc">Name: Ascending</option>
          <option value="title-desc">Name: Descending</option>
          <option value="price-low-high">Price: Low to High</option>
          <option value="price-high-low">Price: High to Low</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className={styles.productsContainer}>
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <img
                src={product.thumbnail}
                alt={product.title}
                className={styles.productImage}
              />
              <div className={styles.discountTag}>
                <p>{product.discountPercentage}% off</p>
              </div>
              <h3 className={styles.productTitle}>{product.title}</h3>
              <h3 className={styles.productPrice}>${product.price}</h3>
              <h5 className={styles.brandName}>{product.brand}</h5>
              <p className={styles.productDescription}>{product.description}</p>
            </div>
          ))
        ) : (
          <div className={styles.noProducts}>
            <img src="404.png" alt="Not found" />
            <p>No products found.</p>
          </div>
        )}
      </div>

      {/* 📄 Pagination */}
      {sortedProducts.length > itemsPerPage && (
        <div className={styles.pagination}>
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Prev
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
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
