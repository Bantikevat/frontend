// प्रोटेक्टेड रूट्स के लिए (सिर्फ़ logged-in यूजर्स)
import { useAuth } from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}