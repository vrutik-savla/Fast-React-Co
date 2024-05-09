import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import cartReducer from './features/cart/cartSlice';

// 313. Modeling the "User" State With Redux Toolkit
const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});

// with this we have our Redux store nicely configured and can now provide it to our React application. So all we did up until this point was in "Redux land", but now we have to of course connect the two. And so we usually do that at the very top of our component tree, which is actually inside "main.jsx".
export default store;
