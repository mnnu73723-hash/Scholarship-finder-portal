"use client";

import { useState, FormEvent } from "react";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";
import { NextResponse } from "next/server";

export async function Post(request: Request){
    try{
        const { name,email } = await request.json();

        const password="anypassword"
        if (!name || !email) {
            return NextResponse.json({ message: "all fields are required"},{ status:400});

        }
        const existingUser = await prisma.user.findUnique({
            where: { email:email.toLowerCase() },
        });
        
        if (existingUser) {
            return NextResponse.json({message: "user already exists"},{ status:400});
        }

        const hashedPassword = await bcrypt.hash(password,10);

        await prisma.user.create({
            data: {
                name,
                email: email,toLowerCase(),
                password: hashedPassword,
            },
        });
    }
}

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message);

        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Register to continue
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">

          {/* Name */}
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border rounded-lg pl-11 pr-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border rounded-lg pl-11 pr-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={20} />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full border rounded-lg pl-11 pr-12 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3"
            >
              {showPassword ? (
                <EyeOff className="text-gray-500" size={20} />
              ) : (
                <Eye className="text-gray-500" size={20} />
              )}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={20} />

            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full border rounded-lg pl-11 pr-12 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
            />

            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-3"
            >
              {showConfirm ? (
                <EyeOff className="text-gray-500" size={20} />
              ) : (
                <Eye className="text-gray-500" size={20} />
              )}
            </button>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Register
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Already have an account?
          <a
            href="/login"
            className="text-indigo-600 font-semibold ml-2 hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}