import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/slice/productSlice";
import LoaderBig from "../../utils/Loader/LoaderBig";
import "./Products.scss";

const Products = () => {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const { products } = useSelector((state) => state.products);
  const isLoading = useSelector((state) => state.products.isLoading);

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
    };
    scrollToTop();
  }, []);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleCategoryFilter = (category) => {
    if (category == categoryFilter) {
      setCategoryFilter("");
    } else {
      setCategoryFilter(category);
    }
  };

  const handleBrandFilter = (brand) => {
    if (brand == brandFilter) {
      setBrandFilter("");
    } else {
      setBrandFilter(brand);
    }
  };
  return (
    <section className="product-div">
      <div className="loader-div">{isLoading && <LoaderBig />}</div>
      <div className="filter-container">
        <input
          onChange={(e) => setSearch(e.target.value)}
          className="search"
          type="text"
          name="search"
          placeholder="Search..."
        />
        <h1>Filters</h1>

        <select
          name="Category"
          id="Category"
          onChange={(e) => handleCategoryFilter(e.target.value)}
        >
          <option value="">Category</option>
          <option value="Bread">Bread</option>
          <option value="Pastry">Pastry</option>
        </select>
        <div className="filter-div">
          <select
            name="Manufacturer"
            id="Manufacturer"
            onChange={(e) => handleBrandFilter(e.target.value)}
          >
            <option value="">Manufacturer</option>
            <option value="Abbott's Bakery">Abbott's Bakery</option>
            <option value="9 Grain">9 Grain</option>
            <option value="Wonder White">Wonder White</option>
            <option value="Great Temptations">Great Temptations</option>
            <option value="Marcels">Marcels</option>
          </select>
          {/* <input
            type="checkbox"
            name="Abbott's Bakery"
            onChange={(e) => handleBrandFilter(e.target.name)}
          />
          <label>Abbott's Bakery</label>
        </div>
        <div className="filter-div">
          <input
            type="checkbox"
            name="9 Grain"
            onChange={(e) => handleBrandFilter(e.target.name)}
          />
          <label>9 Grain</label>
        </div>
        <div className="filter-div">
          <input
            type="checkbox"
            name="Wonder White"
            onChange={(e) => handleBrandFilter(e.target.name)}
          />
          <label>Wonder White</label>
        </div>
        <div className="filter-div">
          <input
            type="checkbox"
            name="Great Temptations"
            onChange={(e) => handleBrandFilter(e.target.name)}
          />
          <label>Great Temptations</label>
        </div>
        <div className="filter-div">
          <input
            type="checkbox"
            name="Marcels"
            onChange={(e) => handleBrandFilter(e.target.name)}
          />
          <label>Marcels</label> */}
        </div>
      </div>
      {products
        .filter((ware) => {
          const searchWare =
            search.trim() === "" ||
            ware.name.toLowerCase().includes(search.toLowerCase()) ||
            ware.description.toLowerCase().includes(search.toLowerCase());
          const filterCategory =
            categoryFilter === "" || ware.category === categoryFilter;
          const filterBrand = brandFilter === "" || ware.brand === brandFilter;
          return searchWare && filterCategory && filterBrand;
        })
        .map((ware) => (
          <ProductCard key={ware.id} ware={ware} />
        ))}
    </section>
  );
};

export default Products;
