import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import About from "./static/AboutUs.jsx";
import ScrollToTop from "./ScrollToTop.jsx";
import AllCoupons from "./coupons/AllCoupons.jsx";
import Cart from "./cart/Cart";
import Checkout from "./checkout/CheckoutComplete.jsx";
import CheckoutDetails from "./checkout/CheckoutDetails.jsx";
import CostCalculator from "./calculator/CostCalculator.jsx";
import CreateCategories from "./categories/CreateCategories.jsx";
import CreateCoupon from "./coupons/CreateCoupon.jsx";
import Dashboard from "./dashboard/Dashboard";
import EditCoupons from "./coupons/EditCoupons.jsx";
import EditProducts from "./products/EditProducts";
import EmailConfirmation from "./login/EmailConfirmation.jsx";
import ForgotPassword from "./login/ForgotPassword.jsx";
import FourOFour from "./errorPages/404.jsx";
import HomeContents from "./homepage/HomeContents.jsx";
import Navbar from "./homepage/Navbar.jsx";
import HowItWorks from "./static/howItWorks.jsx";
import Login from "./login/Login.jsx";
import LogOut from "./login/LogOut.jsx";
import NoResults from "./products/NoResults.jsx";
import Order from "./order/Order";
import Products from "./products/Products";
import SearchResults from "./products/SearchResults";
import SignUp from "./login/SignUp.jsx";
import ResetPassword from "./login/ResetPassword.jsx";
import ReturnPolicy from "./static/ReturnPolicy.jsx";
import Upload from "./upload/Upload.jsx";
import UploadSuccess from "./upload/UploadSuccess.jsx";
import "./index.css";
import FiveHundred from "./errorPages/500.jsx";
import EditNavbar from "./homepage/EditNavbar.jsx";
import EditHomepage from "./homepage/EditHomepage.jsx";
import EditAbout from "./static/EditAbout.jsx";
import EditHowItWorks from "./static/EditHowItWorks.jsx";
import EditPickupLocations from "./checkout/EditPickupLocations.jsx";
import ProductCategoryRedirect from "./products/ProductCategoryRedirect.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<HomeContents />} />
          <Route path="login" element={<Login />} />
          <Route path="loggedout" element={<LogOut />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:category" element={<ProductCategoryRedirect />} />
          <Route path="products/:category/:subcategory" element={<ProductCategoryRedirect />} />
          <Route path="howitworks" element={<HowItWorks />} />
          <Route path="about" element={<About />} />
          <Route path="upload" element={<Upload />} />
          <Route path="uploadcomplete" element={<UploadSuccess />} />
          <Route path="searchResults" element={<SearchResults />} />
          <Route path="noResults" element={<NoResults />} />
          <Route path="cart" element={<Cart />} />
          <Route path="order" element={<Order />} />
          <Route path="order/:productKey" element={<Order />} />
          <Route path="ordercomplete/:orderId/:paid/:stripe/:complete" element={<Checkout />} />
          <Route path="returnpolicy" element={<ReturnPolicy />} />
          <Route path="checkout" element={<CheckoutDetails />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="categories" element={<CreateCategories />} />
          <Route path="editproduct/:productId" element={<EditProducts />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword/:token" element={<ResetPassword />} />
          <Route path="/emailconfirmation" element={<EmailConfirmation />} />
          <Route path="/costcalculator" element={<CostCalculator />} />
          <Route path="/404" element={<FourOFour />} />
          <Route path="/500" element={<FiveHundred />} />
          <Route path="/coupons" element={<AllCoupons />} />
          <Route path="/coupons/create" element={<CreateCoupon />} />
          <Route path="/coupons/edit/:code" element={<EditCoupons />} />
          <Route path="/editNavbar" element={<EditNavbar />} />
          <Route path="/editHomepage" element={<EditHomepage />} />
          <Route path="/editAbout" element={<EditAbout />} />
          <Route path="/editHowItWorks" element={<EditHowItWorks />} />
          <Route path="/editPickupLocations" element={<EditPickupLocations />} />
          <Route path="*" element={<FourOFour />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
