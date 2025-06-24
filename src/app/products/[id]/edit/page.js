"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

// const fakeFetchProductById = async (id: string) => {
//   // Simulate fetching product (replace with real API call)
//   return {
//     id,
//     name: "Kalbe Vitamin C",
//     price: 45000,
//     image: "/vitamin.jpg",
//   };
// };

// const fakeUpdateProduct = async (id: string, data: any) => {
//   // Simulate update call
//   console.log("Updating product:", id, data);
//   return { success: true };
// };

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState({
    name: "",
    price: 0,
    image: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof id === "string") {
      // fakeFetchProductById(id).then((data) => {
      //   setProduct(data);
      //   setLoading(false);
      // });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (typeof id === "string") {
      const res = true;
      // const res = await fakeUpdateProduct(id, product);
      if (res.success) {
        router.push("/");
      }
    }
  };

  if (loading)
    return <p className="text-center py-10">Memuat data produk...</p>;

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-6 flex items-center justify-center">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Produk</h1>
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
              Link Gambar
            </label>
            <input
              type="text"
              name="image"
              value={product.image}
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
