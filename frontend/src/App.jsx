import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import AllBooks from "./pages/AllBooks";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import ViewBookDetails from "./components/ViewBookDetails/ViewBookDetails";
import PersonalDetails from "./components/Profile/PersonalDetails";
import Favourites from "./components/Profile/Favourites";
import UserOrderHistory from "./components/Profile/UserOrderHistory";
import Settings from "./components/Profile/Settings";
import AllOrders from "./pages/AllOrders";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";

const App = () => {

  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (id && token && role) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(role));
    }
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/all-books" element={<AllBooks />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />}>
          <Route index element={<PersonalDetails />} />
          <Route path="favourites" element={role === "USER" ? <Favourites /> : <Navigate to="/profile" />} />
          <Route path="allOrders" element={role === "ADMIN" ? <AllOrders /> : <Navigate to="/profile" />} />
          <Route path="addBook" element={role === "ADMIN" ? <AddBook /> : <Navigate to="/profile" />} />
          <Route path="orderHistory" element={role === "USER" ? <UserOrderHistory /> : <Navigate to="/profile" />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/view-book-details/:id" element={<ViewBookDetails />} />
        <Route path="/editBook/:id" element={<EditBook />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;