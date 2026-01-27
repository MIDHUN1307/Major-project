import { User, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const auth = getAuth();
  const navigate = useNavigate();

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          name: currentUser.displayName || currentUser.email.split("@")[0],
          email: currentUser.email,
        });
      } else {
        navigate("/auth/login");
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/auth/login");
  };

  return (
    <header className="bg-white border-b px-6 py-3 flex justify-end">
      <div className="relative">
        <button
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center hover:opacity-90"
        >
          <User className="w-5 h-5 text-white" />
        </button>

        {showProfileMenu && (
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-slate-200">
            <div className="px-4 py-3 border-b border-slate-200">
              <p className="font-semibold text-slate-800">{user.name}</p>
              <p className="text-sm text-slate-500">{user.email}</p>
            </div>

            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 rounded-b-lg"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
