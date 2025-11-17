// import React, { createContext, useContext, useState, useEffect } from "react";

// interface User {
//   id: number;
//   email: string;
//   role: string;
// }

// interface AuthContextType {
//   user: User | null;
//   token: string | null;
//   userName: string | null;
//   isAuthenticated: boolean;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [token, setToken] = useState<string | null>(null);
//   const [userName, setUserName] = useState<string | null>(null);

//   useEffect(() => {
//     const storedToken = localStorage.getItem("token");
//     const storedUser = localStorage.getItem("user");
//     const storedUserName = localStorage.getItem("userName");

//     if (storedToken && storedUser) {
//       setToken(storedToken);
//       setUser(JSON.parse(storedUser));
//       // Fixed: Only set userName if it exists
//       if (storedUserName) {
//         setUserName(storedUserName);
//       }
//     }
//   }, []);

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     localStorage.removeItem("userName");
//     setToken(null);
//     setUser(null);
//     setUserName(null);
//   };

//   const value: AuthContextType = {
//     user,
//     token,
//     userName,
//     isAuthenticated: !!token && !!user,
//     logout,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };
