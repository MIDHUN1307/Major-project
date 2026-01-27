import { useState } from "react";
import { Mail } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Demo-only logic
    if (email.trim() !== "") {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Forgot Password
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Enter your registered email or username.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Input */}
            <div className="relative">
              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Email or Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition"
            >
              Send Reset Link
            </button>
          </form>
        ) : (
          /* Success State */
          <div className="text-center">
            <p className="text-green-600 font-semibold mb-2">
              Reset link sent!
            </p>
            <p className="text-sm text-gray-500">
              If an account exists for <b>{email}</b>, you’ll receive an email shortly.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
