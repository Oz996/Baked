import { useState } from "react";
import arrow from "/images/arrow.png";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slice/cartSlice";

const Ware_info = ({ ware }) => {
  const [showNutrition, setShowNutrition] = useState(false);
  const [showIngredients, setShowIngredients] = useState(false);
  const [show, setShow] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const cartItems = useSelector((state) => state.cart);
  console.log(cartItems);

  const dispatch = useDispatch();

  const handleNutritionClick = () => {
    setShowNutrition((prev) => !prev);
  };

  const handleIngredientsClick = () => {
    setShowIngredients((prev) => !prev);
  };

  const handleIncrement = (value) => {
    setQuantity(quantity + 1);
  };
  const handleDecrement = (value) => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };
  const handleArrowClick = () => {
    setShow((prev) => !prev);
  };

  const handleAddToCart = (ware) => {
    dispatch(addToCart(ware));
  };

  return (
    <>
      <div className="product-information">
        <h2>
          {ware.description} {ware.weight}
          <span>g</span>
        </h2>
        <p>{ware.details}</p>
        <h3>€{ware.price}</h3>
        <div className="quantity">
          <button onClick={handleDecrement}>-</button>
          <input value={quantity} readOnly type="number" />
          <button onClick={handleIncrement}>+</button>
        </div>
        <button onClick={() => handleAddToCart(ware)} className="btn-add">
          Add to cart
        </button>
        <div className="information-buttons">
          <button
            className="btn-ingredients"
            onClick={() => {
              handleIngredientsClick();
              handleArrowClick();
            }}
          >
            Ingredients{" "}
            <img
              className={`arrow ${show ? "rotate" : ""}`}
              src={arrow}
              alt=""
            />
          </button>
          {showIngredients && <p className="ingredients">{ware.ingredients}</p>}

          <button
            className="btn-ingredients"
            onClick={() => {
              handleNutritionClick();
              handleArrowClick();
            }}
          >
            Nutrition{" "}
            <img
              className={`arrow ${show ? "rotate" : ""}`}
              src={arrow}
              alt=""
            />
          </button>

          {showNutrition && (
            <table>
              <tr>
                <td className="table-description">Nutrition</td>
                <td className="table-description">Per 100g </td>
              </tr>
              <tbody>
                {ware.nutrition.map((nutrition, index) => (
                  <>
                    <tr key={index}>
                      <td>Energy</td>
                      <td>{nutrition.Energy}</td>
                    </tr>
                    <tr key={index}>
                      <td>Protein</td>
                      <td>{nutrition.Protein}</td>
                    </tr>
                    <tr key={index}>
                      <td>Fat</td>
                      <td>{nutrition.Fat}</td>
                    </tr>
                    <tr key={index}>
                      <td>Carbohydrate</td>
                      <td>{nutrition.Carbohydrate}</td>
                    </tr>
                    <tr key={index}>
                      <td>Sugars</td>
                      <td>{nutrition.Sugars}</td>
                    </tr>
                    <tr key={index}>
                      <td>Sodium</td>
                      <td>{nutrition.Sodium}</td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Ware_info;
