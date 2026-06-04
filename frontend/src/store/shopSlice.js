import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const fetchProducts = createAsyncThunk(
  "shop/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        return response.data.products;
      } else {
        toast.error(response.data.message);
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  currency: "Rs",
  delivery_fee: 100,
  backendUrl: backendUrl,
  search: "",
  showSearch: false,
  cartItems: {},
  products: [],
  token: localStorage.getItem("token") || "",
  status: "idle",
  error: null,
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setShowSearch: (state, action) => {
      state.showSearch = action.payload;
    },
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      if (action.payload) {
        localStorage.setItem("token", action.payload);
      } else {
        localStorage.removeItem("token");
      }
    },
    addToCart: (state, action) => {
      const { itemId, size } = action.payload;
      if (!size) {
        toast.error("select product size");
        return;
      }

      if (!state.cartItems[itemId]) {
        state.cartItems[itemId] = {};
      }

      if (state.cartItems[itemId][size]) {
        state.cartItems[itemId][size] += 1;
      } else {
        state.cartItems[itemId][size] = 1;
      }

      const product = state.products.find((p) => p._id === itemId);
      if (product) {
        toast.success(`${product.name} (${size}) added to cart`);
      } else {
        toast.success("Product added to cart");
      }
    },
    updateQuantity: (state, action) => {
      const { itemId, size, quantity } = action.payload;
      if (state.cartItems[itemId]) {
        state.cartItems[itemId][size] = quantity;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const {
  setSearch,
  setShowSearch,
  setCartItems,
  setToken,
  addToCart,
  updateQuantity,
} = shopSlice.actions;

// Selectors
export const selectCartCount = (state) => {
  let totalCount = 0;
  const cartItems = state.shop.cartItems;
  for (const itemId in cartItems) {
    for (const size in cartItems[itemId]) {
      try {
        if (cartItems[itemId][size] > 0) {
          totalCount += cartItems[itemId][size];
        }
      } catch (error) {}
    }
  }
  return totalCount;
};

export const selectCartAmount = (state) => {
  let totalAmount = 0;
  const { cartItems, products } = state.shop;
  for (const itemId in cartItems) {
    let itemInfo = products.find((product) => product._id === itemId);
    if (!itemInfo) continue;
    for (const size in cartItems[itemId]) {
      try {
        if (cartItems[itemId][size] > 0) {
          totalAmount += itemInfo.price * cartItems[itemId][size];
        }
      } catch (error) {}
    }
  }
  return totalAmount;
};

export default shopSlice.reducer;
