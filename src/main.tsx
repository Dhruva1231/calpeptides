// main.tsx or index.tsx
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import App from "./App.tsx";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import FAQ from "./pages/FAQ";
import About from "./pages/About";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/about" element={<About />} />
      {/* Add other routes if needed */}
    </Routes>
  </HashRouter>
);