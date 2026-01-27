import { Brain, Sparkles, Code, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";


const Landing = () => {

  const navigate=useNavigate();

  const HandleLogin=()=>{
    navigate("/auth/login");
  }
  const HandleSignup=()=>{
    navigate("/auth/register");
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      
      {/* Background Shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-gradient-to-br from-blue-200/30 to-indigo-300/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-gradient-to-tr from-purple-200/30 to-blue-200/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="absolute top-16 left-8 opacity-[0.06]">
          <Brain className="w-24 h-24 text-indigo-600" strokeWidth={1} />
        </div>
        <div className="absolute bottom-24 right-12 opacity-[0.06]">
          <Sparkles className="w-20 h-20 text-purple-600" strokeWidth={1} />
        </div>
        <div className="absolute top-1/2 right-1/4 opacity-[0.06]">
          <Code className="w-20 h-20 text-blue-600" strokeWidth={1} />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-5xl w-full text-center space-y-5">

          {/* Logo */}
          <div className="flex justify-center">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-3 rounded-xl shadow-xl">
              <Brain className="w-10 h-10 text-white" />
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            AI-Driven Adaptive Interview Preparation System
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Personalized tests, coding practice, and AI-powered interview feedback.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button onClick={HandleLogin} className="px-7 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all text-base">
              Login
            </button>

            <button onClick={HandleSignup}  className="px-7 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow-sm border border-indigo-600 hover:bg-indigo-50 transition-all text-base">
              Sign Up
            </button>
          </div>

          {/* Forgot Password */}
          

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 max-w-4xl mx-auto">
            <FeatureCard
              icon={<Brain className="w-7 h-7 text-blue-600" />}
              title="AI-Powered"
              text="Adaptive algorithms personalize your journey"
            />
            <FeatureCard
              icon={<Code className="w-7 h-7 text-purple-600" />}
              title="Coding Practice"
              text="Real-world challenges with feedback"
            />
            <FeatureCard
              icon={<Users className="w-7 h-7 text-indigo-600" />}
              title="HR & Technical"
              text="Complete interview preparation"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, text }) => (
  <div className="bg-white/70 backdrop-blur-sm rounded-xl p-5 shadow-md hover:shadow-lg transition-all">
    <div className="flex justify-center mb-3">
      <div className="bg-gray-100 p-3 rounded-lg">
        {icon}
      </div>
    </div>
    <h3 className="font-semibold text-gray-900 mb-1 text-sm">{title}</h3>
    <p className="text-xs text-gray-600">{text}</p>
  </div>
);

export default Landing;
