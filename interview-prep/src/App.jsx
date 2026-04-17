import './App.css'
import { Routes, Route } from "react-router-dom";
import Landing from './Pages/Landing/Landing'
import StudentLogin from './Pages/Auth/StudentLogin';
import StudentRegistration from './Pages/Auth/StudentRegistration';
import ForgotPassword from './Pages/Auth/ForgotPassword';
import Dashboard from './Pages/Student/Dashboard';
import TopicList from './Pages/aptitude/TopicList';
import Test from './Pages/aptitude/Test';
import Result from './Pages/aptitude/Result';
import CodingTopics from './Pages/coding/CodingTopics';
import HRInterview from './Pages/Hr/HRInterview';
import CoreSubject from './Pages/Core/CoreSubject';
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthContext";
import HrSummary from './Pages/Hr/HrSummary';
function App() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (

    <>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            minWidth: "360px",
            padding: "16px 20px",
            fontSize: "15px",
            borderRadius: "14px",
            background: "#111827",
            color: "#ffffff",
          },
          success: {
            iconTheme: {
              primary: "#22c55e",
              secondary: "#111827",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#111827",
            },
          },
        }}
      />
      <Routes>
        {/* Home */}
        <Route path='/' element={<Landing />} />

        {/* Auth */}
        <Route path="/auth/login" element={<StudentLogin />} />
        <Route path="/auth/register" element={<StudentRegistration />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />

        {/* Student Dashboard */}
        <Route path="/student/dashboard" element={<Dashboard />} />

        {/*aptitude */}
        <Route path="/aptitude" element={<TopicList />} />
        <Route path="/aptitude/test" element={<Test />} />
        <Route path="/aptitude/result" element={<Result />} />

        {/* Coding Section */}
        <Route path="/coding" element={<CodingTopics />} />


        {/* hr interview */}
        <Route path="/hr" element={<HRInterview />} />
        <Route path="/hr-summary" element={<HrSummary />} />

        {/* core subject */}
        <Route path="/core" element={<CoreSubject />} />


        {/* Fallback */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>



    </>




  )
}

export default App
