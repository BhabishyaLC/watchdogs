import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios.js";
import toast from "react-hot-toast";
export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/auth/register", formData);
      const message = response.data.message;

      toast.success(message);

      setTimeout(() => {
        navigate("/login");
      }, 3000);

      setFormData("");
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong!!";
      toast.error(message);
    }
  };



  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1600&auto=format&fit=crop&q=80')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/65" />

      <div className="relative z-10 w-full max-w-sm bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-full bg-red-500/20 border border-red-400/40 flex items-center justify-center mb-4">
            <svg
              className="w-6 h-6 text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
              />
            </svg>
          </div>
          <h1 className="text-xl font-semibold text-white">
            CrimeWatch Portal
          </h1>
          <p className="text-sm text-white/50 mt-1">Create your account</p>
        </div>

        <form action="" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm text-white/70 mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full pl-9 pr-4 py-2.5 text-sm bg-white/10 border border-white/20 text-white placeholder-white/30 rounded-lg outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/20 transition"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm text-white/70 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-9 pr-4 py-2.5 text-sm bg-white/10 border border-white/20 text-white placeholder-white/30 rounded-lg outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/20 transition"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm text-white/70 mb-1.5">
              Phone Number
            </label>
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <input
                type="number"
                name="phone"
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full pl-9 pr-4 py-2.5 text-sm bg-white/10 border border-white/20 text-white placeholder-white/30 rounded-lg outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/20 transition"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm text-white/70 mb-1.5">
              Password
            </label>
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full pl-9 pr-10 py-2.5 text-sm bg-white/10 border border-white/20 text-white placeholder-white/30 rounded-lg outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/20 transition"
              />

              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition"
              >
                {showPassword ? (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            className="cursor-pointer w-full py-2.5 text-sm font-medium bg-red-600 hover:bg-red-500 text-white rounded-lg transition"
            type="submit"
          >
            Create Account
          </button>
        </form>
        <p className="text-center text-sm text-white/40 mt-6">
          Already have an account?{" "}
          <Link to="/login">
            <button className=" cursor-pointer   text-red-400 hover:text-red-300 font-medium transition">
              Sign in
            </button>
          </Link>
            <a
            href="#"
            class=" mt-2 bg-white w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-200 transition"
          >
            <img
              src="https://banner2.cleanpng.com/20240216/bqs/transparent-google-logo-google-logo-green-and-blue-g-in-1710875641440.webp"
              alt="Google"
              class="h-5 w-5 mr-2"
            />
            <span>
              <button className=" cursor-pointer text-gray-700" onClick={()=>window.open("http://localhost:3000/api/auth/google","_self")}>Signup with Google</button>
            </span>
          </a>
        </p>
      </div>
    </div>
  );
}
