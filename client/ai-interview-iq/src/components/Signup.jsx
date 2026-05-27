import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Signup = () => {
    const [formValues, setFormValues] = useState({
        name: "",
        email: "",
        age: 0,
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    const cardRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!cardRef.current) return;

            const rect = cardRef.current.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            setMousePos({ x, y });

            const inCard =
                e.clientX >= rect.left &&
                e.clientX <= rect.right &&
                e.clientY >= rect.top &&
                e.clientY <= rect.bottom;

            setIsHovering(inCard);
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

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
            toast("⚠️ Passwords do not match", {
                position: "top-right",
                autoClose: 4000,
                theme: "dark",
            });

            return;
        }

        try {
            const data = await axios.post(
                "http://localhost:4000/auth/signup",
                formValues
            );

            console.log(data);
        } catch (err) {
            console.error(err);
        }
    }

    const fields = [
        {
            id: "name",
            label: "Full Name",
            type: "text",
            placeholder: "John Doe",
            full: true,
        },
        {
            id: "email",
            label: "Email Address",
            type: "text",
            placeholder: "john@example.com",
            full: true,
        },
        {
            id: "age",
            label: "Age",
            type: "number",
            placeholder: "25",
        },
        {
            id: "phone",
            label: "Phone",
            type: "text",
            placeholder: "9876543210",
        },
        {
            id: "password",
            label: "Password",
            type: "password",
            placeholder: "••••••••",
        },
        {
            id: "confirmPassword",
            label: "Confirm Password",
            type: "password",
            placeholder: "••••••••",
        },
    ];

    const glareX = isHovering
        ? (mousePos.x / (cardRef.current?.offsetWidth || 1)) * 100
        : 50;

    const glareY = isHovering
        ? (mousePos.y / (cardRef.current?.offsetHeight || 1)) * 100
        : 50;

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#050507] flex items-center justify-center px-6 py-10 font-mono">

            {/* Grid Background */}
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(99,102,241,0.08) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(99,102,241,0.08) 1px, transparent 1px)
                    `,
                    backgroundSize: "48px 48px",
                }}
            />

            {/* Glow Orbs */}
            <div className="absolute top-[-200px] right-[-200px] h-[600px] w-[600px] rounded-full bg-indigo-500/10 blur-3xl animate-pulse" />

            <div className="absolute bottom-[-150px] left-[-150px] h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-3xl animate-pulse" />

            {/* Card */}
            <div
                ref={cardRef}
                className="relative z-10 w-full max-w-[520px] overflow-hidden rounded-3xl border border-indigo-500/20 bg-[#0c0c12]/80 p-8 backdrop-blur-xl transition-all duration-300 hover:border-indigo-500/40"
            >
                {/* Top Line */}
                <div className="absolute left-[15%] right-[15%] top-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />

                {/* Glare Effect */}
                <div
                    className="pointer-events-none absolute inset-0 rounded-3xl"
                    style={{
                        background: isHovering
                            ? `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(99,102,241,0.08) 0%, transparent 60%)`
                            : "none",
                    }}
                />

                <div className="relative z-10">

                    {/* Badge */}
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1">
                        <div className="h-2 w-2 animate-pulse rounded-full bg-indigo-500" />
                        <span className="text-[11px] uppercase tracking-[0.2em] text-indigo-300">
                            AI Interview Platform
                        </span>
                    </div>

                    {/* Heading */}
                    <h1 className="mb-2 text-4xl font-black leading-tight text-slate-100">
                        Start Your
                        <br />
                        <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                            Interview Journey
                        </span>
                    </h1>

                    <p className="mb-8 text-sm text-slate-500">
                        Create your account to access AI-powered interviews
                    </p>

                    {/* Form */}
                    <form onSubmit={signUp}>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                            {fields.map((field) => (
                                <div
                                    key={field.id}
                                    className={`flex flex-col gap-2 ${
                                        field.full ? "sm:col-span-2" : ""
                                    }`}
                                >
                                    <label
                                        htmlFor={field.id}
                                        className="text-[11px] uppercase tracking-[0.15em] text-slate-500"
                                    >
                                        {field.label}
                                    </label>

                                    <input
                                        type={field.type}
                                        id={field.id}
                                        name={field.id}
                                        value={formValues[field.id]}
                                        onChange={updateFormData}
                                        placeholder={field.placeholder}
                                        className="
                                            w-full rounded-xl border border-slate-700
                                            bg-[#0f0f19]/80 px-4 py-3 text-sm text-slate-200
                                            outline-none transition-all duration-200
                                            placeholder:text-slate-700
                                            hover:border-indigo-500/40
                                            focus:border-indigo-500
                                            focus:bg-[#0f0f22]
                                            focus:ring-4 focus:ring-indigo-500/10
                                        "
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Divider */}
                        <div className="my-6 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />

                        {/* Button */}
                        <button
                            type="submit"
                            className="
                                relative w-full overflow-hidden rounded-xl
                                bg-gradient-to-r from-indigo-600 to-purple-600
                                py-3 text-sm font-bold tracking-wide text-white
                                transition-all duration-200
                                hover:-translate-y-[1px]
                                hover:shadow-[0_8px_30px_rgba(99,102,241,0.35)]
                                active:translate-y-0
                            "
                        >
                            Create Account →
                        </button>
                    </form>

                    {/* Footer */}
                    <p className="mt-5 text-center text-xs text-slate-600">
                        Already have an account?{" "}
                        <a
                            href="#"
                            className="text-indigo-400 transition hover:text-indigo-300"
                        >
                            Sign in
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;