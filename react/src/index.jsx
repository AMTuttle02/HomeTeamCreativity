import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage"
import HomeContents from "./HomeContents.jsx"
import Login from "./Login";
import SignUp from "./SignUp";
import Products from "./Products";
import HowItWorks from "./howItWorks";
import About from "./about/AboutUs.jsx";
import "./index.css";
import LoginSuccess from "./LoginSuccess";
import LogOut from "./LogOut";
import Upload from "./Upload";
import UploadSuccess from "./UploadSuccess";
import SearchResults from "./SearchResults";
import NoResults from "./NoResults";
import Cart from "./cart/Cart";
import Order from "./Order";
import CustomOrder from "./CustomOrder";
import Checkout from "./checkout/CheckoutComplete.jsx";
import CheckoutFailed from "./checkout/CheckoutFailed.jsx";
import ReturnPolicy from "./ReturnPolicy";
import CheckoutDetails from "./checkout/CheckoutDetails.jsx";
import PayLater from "./PayLater";
import Dashboard from "./Dashboard";
import CreateCategories from "./categories/CreateCategories.jsx";
import EditProducts from "./EditProducts";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import EmailConfirmation from "./EmailConfirmation.jsx";
import CostCalculator from "./calculator/CostCalculator.jsx";
import FourOFour from "./errorPages/404.jsx";
import AllCoupons from "./coupons/AllCoupons.jsx";
import CreateCoupon from "./coupons/CreateCoupon.jsx";
import EditCoupons from "./coupons/EditCoupons.jsx";

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
          <Route path="products/:category" element={<Products />} />
          <Route path="products/:category/:subcategory" element={<Products />} />
          <Route path="howitworks" element={<HowItWorks />} />
          <Route path="about" element={<About />} />
          <Route path="upload" element={<Upload />} />
          <Route path="uploadcomplete" element={<UploadSuccess />} />
          <Route path="searchResults" element={<SearchResults />} />
          <Route path="noResults" element={<NoResults />} />
          <Route path="cart" element={<Cart />} />
          <Route path="order" element={<Order />} />
          <Route path="order/:productKey" element={<Order />} />
          <Route path="customOrder" element={<CustomOrder />} />
          <Route path="ordercomplete" element={<Checkout />} />
          <Route path="orderfailed" element={<CheckoutFailed />} />
          <Route path="returnpolicy" element={<ReturnPolicy />} />
          <Route path="checkout" element={<CheckoutDetails />} />
          <Route path="paylater" element={<PayLater />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="categories" element={<CreateCategories />} />
          <Route path="editproducts" element={<EditProducts />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword/:token" element={<ResetPassword />} />
          <Route path="/emailconfirmation" element={<EmailConfirmation />} />
          <Route path="/costcalculator" element={<CostCalculator />} />
          <Route path="/404" element={<FourOFour />} />
          <Route path="/coupons" element={<AllCoupons />} />
          <Route path="/coupons/create" element={<CreateCoupon />} />
          <Route path="/coupons/edit/:code" element={<EditCoupons />} />
          <Route path="*" element={<Homepage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
