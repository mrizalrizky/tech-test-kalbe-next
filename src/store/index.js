import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import productReducer from "./slice/productSlice";
import productCategoryReducer from "./slice/productCategorySlice";
import authReducer from "./slice/authSlice";

const authPersistConfig = {
  key: "root",
  storage,
  whitelist: ["currentUser", "accessToken", "isAuthenticated"],
};

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    products: productReducer,
    productCategories: productCategoryReducer,
    auth: persistReducer(authPersistConfig, authReducer),
  },
  // middleware
});

export const persistor = persistStore(store);
