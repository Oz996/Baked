import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../redux/slice/cartSlice";

const Product = ({ ware }) => {
  const [isHovering, setIsHovering] = useState(false);

  const cartItems = useSelector((state) => state.cart.cartItems);
  console.log(cartItems);

  const dispatch = useDispatch();

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleAddToCart = (ware) => {
    dispatch(addToCart(ware));
  };

  return (
    <div
      className="product"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isHovering ? (
        <div className="hovered">
          <p className="hover-description">
            {ware.description} {`${ware.weight} g`}
          </p>
          <div className="hover-div">
            <p className="hover-weight">{`€${ware.price}`}</p>
            <img className="hover-image" src={ware.image} alt="" />
          </div>
          <div className="hover-buttons">
            <button className="hover-button" onClick={() => handleAddToCart(ware)}>Add Ware</button>

            <Link to={`/products/${ware.id}`}>
              <button className="hover-button hover1">More Info</button>
            </Link>
          </div>
        </div>
      ) : (
        <>
          <img className="ware-image" src={ware.image} alt={ware.name} />
          <h3 className="ware-name">{ware.name}</h3>
          <p className="ware-weight"> {ware.weight}</p>
          <p className="ware-price">{`€${ware.price}`}</p>
          <div className="ware-buttons">
            <button className="btn-green">
              Add Ware
            </button>
            <button>More info</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Product;
