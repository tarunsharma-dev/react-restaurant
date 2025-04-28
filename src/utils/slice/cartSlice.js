import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
      // Check if item already exists in cart
      // const existingItem = state.items.find(
      //   (item) => item.id === action.payload.id
      // );
      // if (existingItem) {
      //   // If item exists, increase quantity
      //   existingItem.quantity += 1;
      // } else {
      //   // If item doesn't exist, add it with quantity 1
      //   state.items.push({ ...action.payload, quantity: 1 });
      // }
    },
    removeItem: (state, action) => {
      // Remove specific item by id
      // state.items = state.items.filter((item) => item.id !== action.payload);
      state.items.pop();
    },
    updateQuantity: (state, action) => {
      // const { id, quantity } = action.payload;
      // const item = state.items.find((item) => item.id === id);
      // if (item) {
      //   item.quantity = quantity;
      //   // Remove item if quantity becomes 0
      //   if (quantity === 0) {
      //     state.items = state.items.filter((item) => item.id !== id);
      //   }
      // }
      console.log(action.payload);
    },
    clearCart: (state) => {
      // Return new empty array instead of mutating
      state.items = [];
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
