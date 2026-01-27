import { useState } from "react";
import {
  Brain,
  Eye,
  EyeOff,
  User,
  Lock,
  AlertCircle,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// 🔥 Firebase imports
import { loginWithEmail } from "../../firebase/authService";
import { getUserProfile, getEmailByUsername } from "../../firebase/userService"; // ✅ added

export function StudentLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({
    username: false,
    password: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const validateForm = () => {
    const newErrors = {};

    if (!username.trim()) {
      newErrors.username = "Username is required";
    } else if (username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ MODIFIED: Username → Email → Firebase Login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ username: true, password: true });
    setErrors({});
    setIsSuccess(false);

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // 🔑 get email using username
      const email = await getEmailByUsername(username);

      // 🔐 Firebase login with email
      const userCredential = await loginWithEmail(email, password);
      const uid = userCredential.user.uid;

      const userProfile = await getUserProfile(uid);

      login(userProfile); // authenticate user in context
      setIsSuccess(true);

      setTimeout(() => {
        navigate("/student/dashboard");
      }, 800);

    } catch (error) {
      setErrors({
        general: "Invalid username or password",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateForm();
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (touched.username) validateForm();
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (touched.password) validateForm();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 px-4 py-8">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-3 shadow-lg">
            <Brain className="w-9 h-9 text-white" />
          </div>
          <h1 className="text-3xl text-gray-900 mb-1">
            AI Interview Preparation
          </h1>
          <p className="text-sm text-gray-600">
            Powered by Adaptive AI
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl text-gray-900 mb-1">
            Student Login
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Access your personalized interview dashboard
          </p>

          {isSuccess && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
              Login successful! Redirecting...
            </div>
          )}

          {errors.general && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex gap-2">
              <AlertCircle className="text-red-600 w-5 h-5" />
              <p className="text-sm text-red-700">
                {errors.general}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={username}
                  onChange={handleUsernameChange}
                  onBlur={() => handleBlur("username")}
                  placeholder="Enter your username"
                  className={`w-full pl-11 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    touched.username && errors.username
                      ? "border-red-300 focus:ring-red-200 bg-red-50"
                      : "border-gray-300 focus:ring-blue-200"
                  }`}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  onBlur={() => handleBlur("password")}
                  placeholder="Enter your password"
                  className={`w-full pl-11 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    touched.password && errors.password
                      ? "border-red-300 focus:ring-red-200 bg-red-50"
                      : "border-gray-300 focus:ring-blue-200"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 disabled:opacity-50"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Don’t have an account?{" "}
                <Link
                  to="/auth/register"
                  className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
                >
                  Create one
                </Link>
              </p>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}

export default StudentLogin;
