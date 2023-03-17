import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage"
import HomeContents from "./HomeContents"
import UserAccess from "./userAccess";
import Products from "./products";
import HowItWorks from "./howItWorks";
import About from "./aboutUs";
import "./index.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />}>
          <Route index element={<HomeContents />} />
          <Route path="useraccess" element={<UserAccess />} />
          <Route path="products" element={<Products />} />
          <Route path="howitworks" element={<HowItWorks />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<Homepage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
