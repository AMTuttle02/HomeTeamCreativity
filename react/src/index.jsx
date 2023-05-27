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
import SearchResults from "./SearchResults";
import NoResults from "./NoResults";
import Cart from "./Cart";
import Order from "./Order";
import CustomOrder from "./CustomOrder";
import Checkout from "./Checkout";
import CheckoutFailed from "./CheckoutFailed";
import ReturnPolicy from "./ReturnPolicy";
import CheckoutDetails from "./CheckoutDetails";
import PayLater from "./PayLater";

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
          <Route path="searchResults" element={<SearchResults />} />
          <Route path="noResults" element={<NoResults />} />
          <Route path="cart" element={<Cart />} />
          <Route path="order" element={<Order />} />
          <Route path="customOrder" element={<CustomOrder />} />
          <Route path="ordercomplete" element={<Checkout />} />
          <Route path="orderfailed" element={<CheckoutFailed />} />
          <Route path="returnpolicy" element={<ReturnPolicy />} />
          <Route path="checkout" element={<CheckoutDetails />} />
          <Route path="paylater" element={<PayLater />} />
          <Route path="*" element={<Homepage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
