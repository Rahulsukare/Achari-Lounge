import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItemCount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItemCount: (state, action) => {
      state.cartItemCount = action.payload;
    },
    incrementCartItemCount: (state) => {
      state.cartItemCount += 1;
    },
    decrementCartItemCount: (state) => {
      if (state.cartItemCount > 0) {
        state.cartItemCount -= 1;
      }
    },
  },
});

export const { setCartItemCount, incrementCartItemCount, decrementCartItemCount } = cartSlice.actions;

export default cartSlice.reducer;
