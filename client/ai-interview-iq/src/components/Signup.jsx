import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
    const [formValues, setFormValues] = useState({
        name: "",
        email: "",
        dob: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });
    const navigate = useNavigate()

    function updateFormData(e) {
        const { name, value } = e.target;

        if (name === "phone" && value.length > 10) return;

        setFormValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    async function signUp(e) {
        e.preventDefault();

        if (formValues.password !== formValues.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }



        try {
            const res = await axios.post(
                "http://localhost:4000/auth/signup",
                formValues
            );

            console.log(res.data);

            toast.success("Account created successfully", { theme: "colored" });
            navigate("/login")
        } catch (err) {
            console.error(err.response.data.message, err);
            toast.error("Signup failed", { theme: "dark" });
        }
    }

    return (
        <main className="bg-[#050507] min-h-screen">
            <div className="grid md:grid-cols-2 min-h-screen">

                {/* Left Side Image */}
                <div className="bg-[#0c0c12] flex items-center justify-center p-6">
                    <img
                        src="https://readymadeui.com/signin-image.webp"
                        alt="signup"
                        className="w-full max-w-lg object-contain"
                    />
                </div>

                {/* Right Side Form */}
                <div className="flex items-center justify-center px-6 py-12">
                    <div className="w-full max-w-md rounded-3xl border border-indigo-500/20 bg-[#0c0c12]/80 p-8 backdrop-blur-xl">

                        {/* Heading */}
                        <div className="mb-8">
                            <h1 className="text-3xl font-black text-white leading-tight">
                                Create Your
                                <span className="block bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                                    Interview Account
                                </span>
                            </h1>

                            <p className="mt-3 text-sm text-slate-400">
                                Access AI-powered interview experiences
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={signUp} className="space-y-5">

                            {/* Full Name */}
                            <div>
                                <label className="mb-2 block text-sm text-slate-300">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    required
                                    name="name"
                                    value={formValues.name}
                                    onChange={updateFormData}
                                    placeholder="John Doe"
                                    className="w-full rounded-xl border border-slate-700 bg-[#111118] px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="mb-2 block text-sm text-slate-300">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    required
                                    name="email"
                                    value={formValues.email}
                                    onChange={updateFormData}
                                    placeholder="john@example.com"
                                    className="w-full rounded-xl border border-slate-700 bg-[#111118] px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                                />
                            </div>

                            {/* Age + Phone */}
                            <div className="grid grid-cols-2 gap-4">

                                <div>
                                    <label className="mb-2 block text-sm text-slate-300">
                                        Dob
                                    </label>

                                    <input
                                        type="date"
                                        name="dob"
                                        value={formValues.dob}
                                        onChange={updateFormData}
                                        placeholder="22"
                                        className="w-full rounded-xl border border-slate-700 bg-[#111118] px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm text-slate-300">
                                        Phone
                                    </label>

                                    <input
                                        type="text"
                                        name="phone"
                                        value={formValues.phone}
                                        onChange={updateFormData}
                                        placeholder="9876543210"
                                        className="w-full rounded-xl border border-slate-700 bg-[#111118] px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label className="mb-2 block text-sm text-slate-300">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    name="password"
                                    required
                                    value={formValues.password}
                                    onChange={updateFormData}
                                    placeholder="••••••••"
                                    className="w-full rounded-xl border border-slate-700 bg-[#111118] px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                                />
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="mb-2 block text-sm text-slate-300">
                                    Confirm Password
                                </label>

                                <input
                                    type="password"
                                    name="confirmPassword"
                                    required
                                    value={formValues.confirmPassword}
                                    onChange={updateFormData}
                                    placeholder="••••••••"
                                    className="w-full rounded-xl border border-slate-700 bg-[#111118] px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                                />
                            </div>

                            {/* Terms */}
                            <div className="flex items-center gap-2 text-sm text-slate-400">
                                <input type="checkbox" required />
                                <span>
                                    I agree to the{" "}
                                    <a
                                        href="#"
                                        className="text-indigo-400 hover:text-indigo-300"
                                    >
                                        Terms & Conditions
                                    </a>
                                </span>
                            </div>

                            {/* Button */}
                            <button
                                type="submit"
                                className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-3 text-sm font-bold tracking-wide text-white transition hover:shadow-[0_8px_30px_rgba(99,102,241,0.35)]"
                            >
                                Create Account
                            </button>
                        </form>

                        {/* Footer */}
                        <p className="mt-6 text-center text-sm text-slate-500">
                            Already have an account?
                            <Link
                                to='/login'
                                className="ml-2 text-indigo-400 hover:text-indigo-300"
                            >
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Signup;