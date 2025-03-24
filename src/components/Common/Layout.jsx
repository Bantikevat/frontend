// components/Common/Layout.jsx
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {  // <-- default export होना चाहिए
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}