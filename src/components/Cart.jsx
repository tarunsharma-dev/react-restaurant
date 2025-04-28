import { useSelector, useDispatch } from "react-redux";
import {
  removeItem,
  updateQuantity,
  clearCart,
} from "../utils/slice/cartSlice";
import { useState } from "react";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const formatPrice = (price) => {
    if (!price) return "0.00";
    return (price / 100).toFixed(2);
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    try {
      if (newQuantity < 0) return;
      dispatch(updateQuantity({ id: itemId, quantity: newQuantity }));
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleRemoveItem = (itemId) => {
    try {
      dispatch(removeItem(itemId));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handleClearCart = () => {
    try {
      setIsLoading(true);
      dispatch(clearCart());
    } catch (error) {
      console.error("Error clearing cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  console.log(cartItems);

  if (isLoading) {
    return (
      <div className="p-4 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-2">Processing...</p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-xl font-semibold">Your cart is empty</h2>
        <p className="text-gray-600">Add some delicious items to your cart!</p>
      </div>
    );
  }

  const total = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">
          Cart ({cartItems.length} items)
        </h2>
        <button
          onClick={handleClearCart}
          className="text-red-600 hover:text-red-800 disabled:opacity-50"
          disabled={isLoading}
        >
          Clear Cart
        </button>
      </div>
      <div className="space-y-4">
        {cartItems.map((item, idx) => (
          <div
            key={item?.id ? item?.id : idx}
            className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="flex-1">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-gray-600">{item.description}</p>
              <p className="text-gray-600">₹{formatPrice(item.price)}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                className="px-2 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
                disabled={item.quantity <= 1}
              >
                -
              </button>
              <span className="min-w-[2rem] text-center">{item.quantity}</span>
              <button
                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                className="px-2 py-1 border rounded hover:bg-gray-100"
              >
                +
              </button>
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="text-red-600 hover:text-red-800 ml-2"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 p-4 border-t">
        <h3 className="text-xl font-semibold">Total: ₹{formatPrice(total)}</h3>
      </div>
    </div>
  );
};

export default Cart;
