import { useState } from "react";
import {
  User,
  BadgeCheck,
  Building2,
  UserCircle,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import { isUsernameTaken, saveUserProfile } from "../../firebase/userService";
import { signupWithEmail } from "../../firebase/authService";
import toast from "react-hot-toast";

export default function StudentRegistration() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    studentName: "",
    department: "",
    username: "",
    password: "",
    reenterPassword: "",
  });

  const [focusedField, setFocusedField] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showReenterPassword, setShowReenterPassword] = useState(false);

  const departments = [
    "Computer Science",
    "Information Technology",
    "Electronics & Communication",
    "Mechanical Engineering",
    "Civil Engineering",
    "Electrical Engineering",
    "Business Administration",
    "Data Science",
    "Artificial Intelligence",
    "Software Engineering",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      email,
      studentName,
      department,
      username,
      password,
      reenterPassword,
    } = formData;

    if (password !== reenterPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const usernameExists = await isUsernameTaken(username);
    if (usernameExists) {
      toast.error("Username already taken. Please choose another one.");
      return;
    }

    try {
      const userCredential = await signupWithEmail(email, password);
      const uid = userCredential.user.uid;

      await saveUserProfile(uid, {
        email,
        name: studentName,
        department,
        username,
        role: "student",
        createdAt: new Date(),
      });

      toast.success("Account created");
      navigate("/auth/login");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("This email is already registered");
      } else if (error.code === "auth/weak-password") {
        toast.error("Password must be at least 6 characters");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-white flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-blue-300/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-indigo-300/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-[-15%] left-[30%] w-[400px] h-[400px] bg-purple-300/15 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="relative w-full max-w-4xl">
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 p-8 md:p-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4 shadow-lg">
              <UserCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Create Student Account
            </h1>
            <p className="text-sm text-gray-500">
              Register to begin your AI-powered interview preparation journey
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InputField
                icon={<BadgeCheck />}
                label="Email Address"
                name="email"
                value={formData.email}
                focusedField={focusedField}
                setFocusedField={setFocusedField}
                onChange={handleChange}
              />

              <InputField
                icon={<User />}
                label="Student Name"
                name="studentName"
                value={formData.studentName}
                focusedField={focusedField}
                setFocusedField={setFocusedField}
                onChange={handleChange}
              />

              <div className="relative">
                <div
                  className={`relative ${
                    focusedField === "department" ? "scale-[1.02]" : ""
                  }`}
                >
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <Building2 className="w-5 h-5 text-gray-400" />
                  </div>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("department")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full pl-11 pr-10 py-3 bg-gray-50 border rounded-xl outline-none"
                  >
                    <option value="" disabled>
                      Select Department
                    </option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <InputField
                icon={<UserCircle />}
                label="Username"
                name="username"
                value={formData.username}
                focusedField={focusedField}
                setFocusedField={setFocusedField}
                onChange={handleChange}
              />

              <PasswordField
                label="Password"
                name="password"
                value={formData.password}
                show={showPassword}
                toggle={() => setShowPassword(!showPassword)}
                focusedField={focusedField}
                setFocusedField={setFocusedField}
                onChange={handleChange}
              />

              <PasswordField
                label="Re-enter Password"
                name="reenterPassword"
                value={formData.reenterPassword}
                show={showReenterPassword}
                toggle={() =>
                  setShowReenterPassword(!showReenterPassword)
                }
                focusedField={focusedField}
                setFocusedField={setFocusedField}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:scale-[1.02]"
            >
              Create Account
            </button>
          </form>

          <div className="text-center mt-6 text-sm">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-blue-600 font-medium">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Reusable Components */

function InputField({
  icon,
  label,
  name,
  value,
  focusedField,
  setFocusedField,
  onChange,
}) {
  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        {icon}
      </div>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocusedField(name)}
        onBlur={() => setFocusedField(null)}
        className="w-full pl-11 py-3 bg-gray-50 border rounded-xl outline-none"
        placeholder={label}
      />
    </div>
  );
}

function PasswordField({
  label,
  name,
  value,
  show,
  toggle,
  focusedField,
  setFocusedField,
  onChange,
}) {
  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        <Lock />
      </div>
      <input
        type={show ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocusedField(name)}
        onBlur={() => setFocusedField(null)}
        className="w-full pl-11 pr-12 py-3 bg-gray-50 border rounded-xl outline-none"
        placeholder={label}
      />
      <button
        type="button"
        onClick={toggle}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
      >
        {show ? <EyeOff /> : <Eye />}
      </button>
    </div>
  );
}
