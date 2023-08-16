import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slice/cartSlice";
import { motion } from "framer-motion";

const Ware_info = ({ ware }) => {
  const [ingredientDisplay, setIngredientDisplay] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const cartItems = useSelector((state) => state.cart);
  console.log(cartItems);

  const dispatch = useDispatch();

  const handleIncrement = (value) => {
    setQuantity(quantity + 1);
  };
  const handleDecrement = (value) => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
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
            onClick={() => setIngredientDisplay(1)}
          >
            Ingredients
          </button>
          <button
            className="btn-ingredients"
            onClick={() => setIngredientDisplay(2)}
          >
            Nutrition
          </button>
        </div>
        <div className="display-div">
          {ingredientDisplay === 1 ? (
            <motion.p
              className="ingredients"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {ware.ingredients}
            </motion.p>
          ) : ingredientDisplay === 2 ? (
            <motion.table initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
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
            </motion.table>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Ware_info;
