import  { createContext, useContext, useState, useEffect, ReactNode } from 'react';
//import { useNavigate } from 'react-router-dom';
import axios from "axios" ; 

interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'faculty' | 'admin';
  institution: string;
}

interface AuthContextType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (name: string , email: string, password: string, role: string, institution: string ) => Promise<void>;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
 // const navigate = useNavigate();
  

  // useEffect(() => {
  //   // Check for saved user in localStorage
  //   const savedUser = localStorage.getItem('user');
  //   if (savedUser) {
  //     setUser(JSON.parse(savedUser));
  //   }
  //   setIsLoading(false);
  // }, []);
  useEffect(() => {
    axios.get("http://localhost:4000/api/auth/me", { withCredentials: true })
      .then(res => setUser(res.data.user))
      .catch(() => setUser(null));
  }, []);

  const login = async (email: string, password: string) => {
    await axios.post("http://localhost:4000/api/auth/login", { email, password }, { withCredentials: true });
    const res = await axios.get("http://localhost:4000/api/auth/me", { withCredentials: true });
    setUser(res.data.user);
  };

  //  register = async (userData: Omit<User, 'id'> & { password: string }) => {
  //   setIsLoading(true);
  //   try {
  //     // Simulate API delay
  //     await new Promise(resolve => setTimeout(resolve, 1000));
      
  //     // Mock user creation
  //     const newUser: User = {
  //       id: Math.random().toString(36).substr(2, 9),
  //       name: userData.name,
  //       email: userData.email,
  //       role: userData.role,
  //       institution: userData.institution
  //     };
      
  //     setUser(newUser);
  //     localStorage.setItem('user', JSON.stringify(newUser));
  //   } catch (error) {
  //     console.error('Registration failed:', error);
  //     throw error;
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const register = async (name: string, email: string, password: string, role: string, institution: string) => {
    await axios.post("http://localhost:4000/api/auth/register", 
        { name, email, password, role, institution }, 
        { withCredentials: true }  // Important for cookies & authentication
    );

    // Fetch user data after successful registration
    const res = await axios.get("http://localhost:4000/api/auth/me", { withCredentials: true });
    setUser(res.data.user);
};

  const logout = async () => {
    try {
        await fetch("http://localhost:4000/api/auth/logout", {
            method: "POST",
            credentials: "include" // Important to include cookies
        });
        setUser(null); // Clear user state
      //  navigate("/login"); // Redirect to login
    } catch (error) {
        console.error("Logout failed:", error);
    }
};
  
const isAuthenticated = !!user;


  return (
    <AuthContext.Provider value={{ user, login, logout , register ,isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};