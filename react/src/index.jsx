import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage"
import HomeContents from "./HomeContents.jsx"
import Login from "./Login";
import SignUp from "./SignUp";
import Products from "./products";
import HowItWorks from "./howItWorks";
import About from "./aboutUs";
import "./index.css";
import LoginSuccess from "./LoginSuccess";
import LogOut from "./LogOut";
import Upload from "./Upload";
import UploadSuccess from "./UploadSuccess";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />}>
          <Route index element={<HomeContents />} />
          <Route path="login" element={<Login />} />
          <Route path="loggedin" element={<LoginSuccess />} />
          <Route path="loggedout" element={<LogOut />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="products" element={<Products />} />
          <Route path="howitworks" element={<HowItWorks />} />
          <Route path="about" element={<About />} />
          <Route path="upload" element={<Upload />} />
          <Route path="uploadcomplete" element={<UploadSuccess />} />
          <Route path="*" element={<Homepage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
