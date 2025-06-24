"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProductCategories } from "@/store/slice/productCategorySlice";
import axios from "axios";

export default function ProductCreatePage() {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.productCategories);

  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock_qty: "",
    image_link: "",
  });

  // const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post('http://localhost:5130/api/v1/products', {
      ...product,
      category: e.target[2].value, // Assuming the category is selected from the dropdown
    });
    )

  };

  if (loading)
    return <p className="text-center py-10">Memuat data produk...</p>;

  useEffect(() => {
    dispatch(fetchAllProductCategories());
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-6 flex items-center justify-center">
      <div className="w-full max-aw-lg bg-white rounded-2xl shadow p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Buat Produk</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nama Produk
            </label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Deskripsi Produk
            </label>
            <input
              type="text"
              name="description"
              value={product.description}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Kategori Produk
            </label>
            <select className="border border-gray-300 w-full p-2 rounded-xl" onChange={(e) => setSelectedCategory(e.target.value)} required>
              {categories?.map((category) => {
                return <option value={category?.id}>{category?.name}</option>;
              })}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Harga
            </label>
            <input
              type="number"
              prefix="Rp"
              min={1}
              name="price"
              value={product.price}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Stok
            </label>
            <input
              type="number"
              prefix="Rp"
              min={1}
              name="stock_qty"
              value={product.stock_qty}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Link Gambar
            </label>
            <input
              type="text"
              name="image_link"
              value={product.image_link}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Simpan Perubahan
          </button>
        </form>
      </div>
    </main>
  );
}
