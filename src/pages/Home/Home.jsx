import Flickity from "react-flickity-component";
import "flickity/css/flickity.css";
import "./Home.scss";
import LatestCard from "../../components/LatestCard/LatestCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getProducts } from "../../redux/slice/productSlice";
import { Link } from "react-router-dom";
import LoaderBig from "../../utils/Loader/LoaderBig";

const Home = () => {
  const [displayLatestProducts, setDisplayLatestProducts] = useState([]);
  const { products } = useSelector((state) => state.products);
  const isLoading = useSelector((state) => state.products.isLoading);
  const dispatch = useDispatch();

  const latestProducts = () => {
    const New = products.filter((product) => product.new);
    setDisplayLatestProducts(New);
  };
  const flickityOptions = {
    wrapAround: true,
    autoPlay: 4000,
  };

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  useEffect(() => {
    latestProducts();
  }, [products]);
  console.log(displayLatestProducts);

  return (
    <>
      <main>
        <div className="carousel-container">
          <Flickity options={flickityOptions}>
            <div className="carousel-one">
              <div className="carousel-overlay" />
              <div className="carousel-inner">
                <span>Bread For Every Occasion</span>
                <Link to="/products">
                  <button className="carousel-button">Start Browsing</button>
                </Link>
              </div>
            </div>
            <div className="carousel-two">
              <div className="carousel-overlay" />
              <div className="carousel-inner">
                <span>Unlimited Creativity</span>
                <Link to="/products">
                  <button className="carousel-button">Start Browsing</button>
                </Link>
              </div>
            </div>
            <div className="carousel-three">
              <div className="carousel-overlay" />
              <div className="carousel-inner">
                <span>Lorem, ipsum dolor.</span>
                <Link to="/products">
                  <button className="carousel-button">Start Browsing</button>
                </Link>
              </div>
            </div>
          </Flickity>
          <h1>Latest Products</h1>
          {isLoading && (
            <div className="loader-latest">
              <LoaderBig />
            </div>
          )}
        </div>
      </main>
      <section className="latest">
        {displayLatestProducts.map((product) => (
          <LatestCard product={product} key={product.id} />
        ))}
      </section>
    </>
  );
};

export default Home;
