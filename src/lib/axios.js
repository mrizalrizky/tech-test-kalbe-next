import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  resetCurrentUser,
  userLogout,
  userRefreshToken,
} from "@/store/slice/authSlice";
const getStore = async () => {
  const module = await import("../store");
  return module.store;
};
const MySwal = withReactContent(Swal);

const swalOptions = {
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 4000,
  timerProgressBar: true,
};

export const api = axios.create({
  // baseURL: import.meta.env.VITE_APP_API_URL,
  baseURL: "http://localhost:5130/api/v1",
  withCredentials: true,
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

export const axiosPublic = axios.create({
  baseURL: "http://localhost:5130/api/v1",
  // baseURL: import.meta.env.VITE_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  async (config) => {
    try {
      const store = await getStore();
      const token = store.getState().auth.accessToken;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (err) {
      console.err("Token fetch error", err);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let isRefreshing = false;
let failedQueue = [];
const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // if (response.status === 201 || response.status === 204) {
    const contentModifyActions = ["put", "delete"];
    if (contentModifyActions.includes(response.config.method)) {
      MySwal.mixin(swalOptions).fire({
        icon: "success",
        title: response?.data?.message || "Success",
      });
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const message = error?.response?.data?.message;

    if (
      error.response?.status === 401 &&
      message == "Token expired. Please refresh the page." &&
      !originalRequest._retry
    ) {
      console.log("MASUK IF LINE 93");
      try {
        console.log("TRY LINE 95");
        const store = await getStore();
        if (isRefreshing) {
          console.log("IS REFRESHING LINE 98");
          return new Promise((resolve, reject) => {
            failedQueue.push({
              resolve: (token) => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                resolve(api(originalRequest));
              },
              reject,
            });
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        console.log("BEFORE DISPATCH REFTOKEN LINE 113");
        await store.dispatch(userRefreshToken()).unwrap();
        const newAccessToken = store.getState().auth.accessToken;
        processQueue(null, newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (error) {
        console.log("CATCH 1 LINE 121");
        const store = await getStore();
        processQueue(error, null);
        console.log("BEFORE DISPATCH LOGOUT LINE 124");
        // await store.dispatch(userLogout());
        store.dispatch(resetCurrentUser());
        console.log("AFTER DISPATCH LOGOUT LINE 126");
        window.location.href = "/login";
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }

    console.log("LINE 134");
    // Refresh token expired
    if (
      error.response?.status === 401 &&
      message === "Refresh token expired. Please relogin."
    ) {
      const store = await getStore();
      console.log("BEFORE! IF 401 AND PLEASE RELOGIN LINE 141");
      await store.dispatch(userLogout());
      console.log("AFTER! IF 401 AND PLEASE RELOGIN LINE 141");
      window.location.href = "/login";
      return Promise.reject(error);
    }

    console.log("KELAURIN ERROR");
    MySwal.mixin(swalOptions).fire({
      icon: "error",
      title: message || "Internal Server Error",
    });

    return Promise.reject(error);
  }
);

axiosPublic.interceptors.response.use(
  (response) => {
    // if (response.status === 201 || response.status === 204) {
    if ([201, 204].includes(response.status)) {
      MySwal.mixin(swalOptions).fire({
        icon: "success",
        title: response?.data?.message || "Success",
      });
    }
    return response;
  },
  async (error) => {
    const message = error?.response?.data?.message;
    MySwal.mixin(swalOptions).fire({
      icon: "error",
      title: message || "Internal Server Error",
    });
    if (error.response?.status === 401) {
      window.location.href = "/login";
      // Handle unauthorized access
      // getAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);

export default api;
