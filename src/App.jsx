import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Common/Layout";  // <-- यहाँ से import
import Home from "./pages/Home";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import ReminderForm from './components/Reminders/Form';

// App.jsx या AuthContext.jsx में
console.log("API URL:", import.meta.env.VITE_API_URL); // http://localhost:5000 आना चाहिए
function App() {
  return (
    <BrowserRouter>
      <Layout>  {/* <-- Layout का उपयोग */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          
          <Route path="/reminders/new" element={<ReminderForm />} />
          
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;