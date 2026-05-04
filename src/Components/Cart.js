import { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem, clearCart } from "../../redux/CartSlice";
import { CDN_URL } from "../../utils/links";
import userContext from "../../utils/userContext";

let Cart = () => {
  const cartitems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const { loggedInUser, setShowLoginModal, authToken } = useContext(userContext);

  // ✅ Group items by ID and count quantity
  const groupedItems = cartitems.reduce((acc, item) => {
    const id = item?.card?.info?.id;
    if (acc[id]) {
      acc[id].quantity += 1;
    } else {
      acc[id] = { ...item, quantity: 1 };
    }
    return acc;
  }, {});

  // Convert object to array
  const uniqueItems = Object.values(groupedItems);

  const total = uniqueItems.reduce((sum, item) => {
    const price = (item?.card?.info?.price || item?.card?.info?.defaultPrice || 0) / 100;
    return sum + price * item.quantity;
  }, 0);

  const totalItemCount = cartitems.length;
  const delivery = total > 0 ? 40 : 0;
  const gst = Math.round(total * 0.05);
  const finalTotal = total + delivery + gst;

  const requireLogin = () => {
    if (!loggedInUser) {
      setShowLoginModal(true);
      return true;
    }
    return false;
  };

  const handleAdd = (item) => {
    if (requireLogin()) return;
    dispatch(addItem(item));
  };

  const handleRemove = (id) => {
    if (requireLogin()) return;
    dispatch(removeItem(id));
  };

  const handleClearCart = () => {
    if (requireLogin()) return;
    dispatch(clearCart());

    fetch("http://127.0.0.1:8000/cart/clear", {
      method: "POST",
      headers: { Authorization: `Bearer ${authToken}` },
    }).catch((err) => console.log("Clear cart error", err));
  };

  const handleOrder = async () => {
    if (requireLogin()) return;
    if (cartitems.length === 0) return;

    try {
      const res = await fetch("http://127.0.0.1:8000/order", {
        method: "POST",
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const data = await res.json();
      alert(`✅ ${data.message}!`);
      dispatch(clearCart());
    } catch (err) {
      alert("❌ Order failed. Try again.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6 pt-32">
      <div className="max-w-6xl mx-auto grid grid-cols-3 gap-6">

        {/* ========== CART ITEMS ========== */}
        <div className="col-span-2 bg-white p-5 rounded-xl shadow-sm">

          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">
              🛒 Your Cart
              {totalItemCount > 0 && (
                <span className="text-sm font-normal text-gray-400 ml-2">
                  ({totalItemCount} items)
                </span>
              )}
            </h2>

            {cartitems.length > 0 && (
              <button
                onClick={handleClearCart}
                className="px-4 py-2 text-xs font-semibold text-red-600 bg-red-50 border border-red-200 rounded-full hover:bg-red-100 transition-all duration-200 active:scale-95"
              >
                Clear Cart 🧹
              </button>
            )}
          </div>

          {uniqueItems.length === 0 ? (
            <div className="text-center py-16">
              <span className="text-5xl mb-4 block">🛒</span>
              <p className="text-gray-500 text-lg font-medium">Your cart is empty</p>
              <p className="text-gray-400 text-sm mt-1">Add some delicious food!</p>
            </div>
          ) : (
            <div>
              {uniqueItems.map((item) => {
                const info = item?.card?.info;
                const price = (info?.price || info?.defaultPrice || 0) / 100;

                return (
                  <div
                    key={info?.id}
                    className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0"
                  >
                    {/* Item Info */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm text-gray-800">
                        {info?.name}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {info?.description}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        ₹{price} × {item.quantity} = 
                        <span className="font-bold text-gray-800 ml-1">
                          ₹{(price * item.quantity).toFixed(0)}
                        </span>
                      </p>
                    </div>

                    {/* Image + Controls */}
                    <div className="flex items-center gap-4">

                      {/* Quantity Controls */}
                      <div className="flex items-center bg-white border rounded shadow">
                        <button
                          className="px-2.5 py-1 text-red-500 font-bold text-sm"
                          onClick={() => handleRemove(info?.id)}
                        >
                          −
                        </button>
                        <span className="px-2 py-1 text-green-600 font-bold text-xs min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          className="px-2.5 py-1 text-green-600 font-bold text-sm"
                          onClick={() => handleAdd(item)}
                        >
                          +
                        </button>
                      </div>

                      {/* Image */}
                      {info?.imageId && (
                        <img
                          src={CDN_URL + info?.imageId}
                          className="w-16 h-16 object-cover rounded-lg"
                          alt={info?.name}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ========== BILL SUMMARY ========== */}
        <div className="bg-white p-5 rounded-xl shadow-sm h-fit sticky top-28">
          <h2 className="text-lg font-bold mb-4">Bill Summary</h2>

          <div className="text-sm space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Item Total ({totalItemCount} items)</span>
              <span>₹{total.toFixed(0)}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Delivery Fee</span>
              <span>₹{delivery}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">GST (5%)</span>
              <span>₹{gst}</span>
            </div>

            <hr />

            <div className="flex justify-between font-bold text-lg">
              <span>TO PAY</span>
              <span>₹{finalTotal.toFixed(0)}</span>
            </div>
          </div>

          <button
            onClick={handleOrder}
            disabled={cartitems.length === 0}
            className="w-full mt-5 bg-orange-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition active:scale-[0.98]"
          >
            {cartitems.length === 0 ? "Cart is Empty" : `Place Order — ₹${finalTotal.toFixed(0)}`}
          </button>

          {!loggedInUser && cartitems.length > 0 && (
            <p className="text-center text-xs text-gray-400 mt-3">
              You'll need to{" "}
              <button
                onClick={() => setShowLoginModal(true)}
                className="text-teal-600 font-semibold underline"
              >
                login
              </button>{" "}
              to place your order
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
