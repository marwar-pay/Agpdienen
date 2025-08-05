import { createStore } from "redux";
import { Provider } from "react-redux";

// Initial state
const initialState = {
  handleCart: [],
};

// Reducer
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        handleCart: [...state.handleCart, action.payload],
      };
    default:
      return state;
  }
};

// Create store
const store = createStore(cartReducer);

export default store;
