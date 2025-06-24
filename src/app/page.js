"use client";

import { userLogout } from "@/store/slice/authSlice";
import { fetchAllProducts } from "@/store/slice/productSlice";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ProductDashboardPage() {
  const router = useRouter();
  // const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  // const { products } = useSelector((state) => state.products);
  const handleAddToCart = (productId) => {};
  const handleLogout = () => {
    // dispatch(userLogout())
    //   .then(() => router.push("/login"))
    //   .catch((err) => console.error("Logout failed:", err));
  };

  const fetchAllProducts = async () => {
    const response = await axios.get("http://localhost:5130/api/v1/products");
    console.log("RESPONSE", response.data);
    if (response.data.data) {
      setProducts(response.data.data);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Selamat datang, {"Pengguna"} 👋
          </h1>
          <button
            onClick={() => handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
          >
            Logout
          </button>
        </header>

        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Semua Produk
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products?.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4"
              >
                <div className="w-full h-40 relative mb-3">
                  <img src={product.imageUrl} alt={product.name} />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {product.name}
                </h3>
                <p className="text-blue-600 font-medium mt-1">
                  Rp{product.price.toLocaleString("id-ID")}
                </p>
                <button
                  onClick={() => handleAddToCart(product.id)}
                  className="mt-3 w-full py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
                >
                  Tambah ke Keranjang
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
