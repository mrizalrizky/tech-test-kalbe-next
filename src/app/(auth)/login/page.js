"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  // const { auth } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("FORMM", form);
    const response = await axios.post(
      "http://localhost:5130/api/v1/auth/login",
      {
        Username: form.username,
        Password: form.password,
      }
    );

    console.log("ERSPONSE", response);

    if (response.data.data) {
      router.push("/");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Masuk ke Kalbepedia
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-xl hover:bg-blue-700 transition duration-200"
          >
            Masuk
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Belum punya akun?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Daftar
          </Link>
        </p>
      </div>
    </main>
  );
}
