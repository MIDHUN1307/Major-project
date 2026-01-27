import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../firebase/firebaseConfig";
import { getUserProfile } from "../firebase/userService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const auth = getAuth(app);

  // called after successful login
  const login = (userProfile) => {
    setUser(userProfile);
  };

  // logout if needed later
  const logout = async () => {
    await auth.signOut();
    setUser(null);
  };

  // 🔐 persist login after refresh
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const profile = await getUserProfile(firebaseUser.uid);
        setUser(profile);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
