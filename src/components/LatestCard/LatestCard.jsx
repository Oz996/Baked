import { Link } from "react-router-dom";
import "./LatestCard.scss";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slice/cartSlice";

const LatestCard = ({ product }) => {
  console.log(product);
  const dispatch = useDispatch();

  const addProduct = () => {
    dispatch(addToCart(product));
  };
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <article>
      <div className="latest-card">
        <img src={product.image} alt={product.name} />
        <h2>{product.name}</h2>
        <span>€{product.price}</span>
        <div className="latest-buttons">
          <button className="green-button" onClick={addProduct}>
            Add Ware
          </button>
          <Link to={`/products/${product.id}`} onClick={scrollToTop}>
            <button>More Info</button>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default LatestCard;
