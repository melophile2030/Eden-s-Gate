import { useState, useEffect } from "react";
import styles from "./Products.module.css";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("title-asc");


  const itemsPerPage = 20;

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=190")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className={styles.loading}><img src="loading.png" alt="loading" /></div>;
  }

  // Filter by search
  const filteredProducts = products.filter((product) => {
    const term = searchTerm.toLowerCase();

    const matchTitle = product.title?.toLowerCase().includes(term);
    const matchCategory = product.category?.toLowerCase().includes(term);
    const matchTags = product.tags?.some((tag) =>
      tag.toLowerCase().includes(term)
    );

    return matchTitle || matchCategory || matchTags;
  });

  // Sorting logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "price-low-high") {
      return a.price - b.price;
    } else if (sortOption === "price-high-low") {
      return b.price - a.price;
    } else if (sortOption === "title-asc") {
      return a.title.localeCompare(b.title);
    } else if (sortOption === "title-desc") {
      return b.title.localeCompare(a.title);
    }
    return 0;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  return (
    <>
      <h2 className={styles.productsTitle}>Products</h2>

      <div className={styles.searchBar}>
        <form action="">
          {" "}
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
          <button className={styles.searchButton}>
            <img src="search.png" alt="search" />
          </button>
        </form>
      </div>

      <div className={styles.sortContainer}>
        <label htmlFor="sort"><img src="sort.png" alt="sort" />Sort</label>
        <select
          id="sort"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
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
              <div className={styles.discountTag}><p>{product.discountPercentage}% off</p></div>
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

      {/* Pagination Controls */}
      {filteredProducts.length > itemsPerPage && (
        <div className={styles.pagination}>
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
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
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
