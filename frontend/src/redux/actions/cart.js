// add to cart
export const addToCart = (data) => async (dispatch, getState) => {
  dispatch({
    type: "addToCart",
    payload: data,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
  return data;
};

// remove from cart
export const removeFromCart = (data) => async (dispatch, getState) => {
  dispatch({
    type: "removeFromCart",
    payload: data._id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
  return data;
};

// toggle select item
export const toggleSelectItem = (productId) => async (dispatch, getState) => {
  dispatch({
    type: "toggleSelectItem",
    payload: productId,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
};

// clear cart
export const clearCart = () => async (dispatch, getState) => {
  dispatch({
    type: "clearCart",
  });

  localStorage.setItem("cartItems", JSON.stringify([]));
};

// select all items
export const selectAllItems = (selectAll) => async (dispatch, getState) => {
  dispatch({
    type: "selectAllItems",
    payload: selectAll,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
};
