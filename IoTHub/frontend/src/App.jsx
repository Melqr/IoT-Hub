import './App.css'; // Importing the CSS file for styling.

import { Route, Routes, BrowserRouter } from 'react-router-dom'; // Importing necessary components from 'react-router-dom' for routing.
import { useEffect, useState } from 'react';
import Home from './views/shop/home'; // Importing the 'Home' component.
import MainWrapper from './layouts/MainWrapper'; // Importing the 'MainWrapper' component.
import Login from './views/auth/login'; // Importing the 'Login' component.
import PrivateRoute from './layouts/PrivateRoute'; // Importing the 'PrivateRoute' component.
import Logout from './views/auth/logout'; // Importing the 'Logout' component.
import Private from './views/auth/private'; // Importing the 'Private' component.
import Register from './views/auth/register'; // Importing the 'Register' component.
import StoreHeader from './views/base/StoreHeader';
import StoreFooter from './views/base/StoreFooter';
import ProductDetail from './views/shop/ProductDetail';
import Cart from './views/shop/Cart';
import Checkout from './views/shop/Checkout';
import PaymentSuccess from './views/shop/PaymentSuccess';
import Invoice from './views/shop/Invoice';
import Account from './views/customer/Account';
import Orders from './views/customer/Orders';
import OrderDetail from './views/customer/OrderDetail';
import Wishlist from './views/customer/Wishlist';
import Notifications from './views/customer/Notifications';
import Settings from './views/customer/Settings';
import { CartContext } from './views/plugin/Context';
import UserData from './views/plugin/UserData';
import CartID from './views/plugin/cartID';
import apiInstance from './utils/axios';
import Dashboard from './views/vendor/Dashboard';
import Products from './views/vendor/Products';
import AddProduct from './views/vendor/AddProduct';
import UpdateProduct from './views/vendor/UpdateProduct';
import VendorOrders from './views/vendor/Orders';
import VendorOrderDetail from './views/vendor/OrderDetail';
import Earning from './views/vendor/Earning';
import Reviews from './views/vendor/Reviews';
import ReviewDetail from './views/vendor/ReviewDetail';
import Coupon from './views/vendor/Coupon';
import EditCoupon from './views/vendor/EditCoupon';
import VendorNotifications from './views/vendor/Notifications';
import VendorSettings from './views/vendor/Settings';
import Shop from './views/vendor/Shop';
import Search from './views/shop/Search';
import ForgotPassword from './views/auth/forgotPassword';
import CreatePassword from './views/auth/createPassword';
import VendorRegister from './views/vendor/VendorRegister';
import OrderItemDetail from './views/vendor/OrderItemDetail';
import About from './views/web/About';
import Chatbot from './views/shop/Chatbot';
import ProdView from './views/shop/ProdView';
import ContactUs from './views/web/ContactUs';

function App() { // Define the main 'App' component.
    const [cartCount, setCartCount] = useState()
    const userData = UserData()
    let cart_id = CartID()
    const axios = apiInstance


    useEffect(() => {
        const url = userData?.user_id ? `cart-list/${cart_id}/${userData?.user_id}/` : `cart-list/${cart_id}/`;
        axios.get(url).then((res) => {
            setCartCount(res.data.length)
        });
    }, [])

    return (
        <CartContext.Provider value={[cartCount, setCartCount]} >
            {/* // Initialize the router with 'BrowserRouter'. */}
            <BrowserRouter>

                <StoreHeader />
                {/* // Wrap everything in the 'MainWrapper' component. */}
                <MainWrapper>
                    <Routes> {/*  Define a collection of routes.*/}
                        <Route // Define a specific route.
                            path="/private" // Set the route path to "/private".
                            element={ // Render the element when this route matches.
                                <PrivateRoute>
                                    <Private />
                                </PrivateRoute>
                            }
                        />
                        <Route path="/" element={<Home />} />
                        {/* Authentication Routes */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/logout" element={<Logout />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/create-new-password" element={<CreatePassword />} />
                        

                        {/* Web Routes */}
                        <Route path="/about" element={<About/>} />
                        <Route path="/chatbot" element={<Chatbot/>} />
                        <Route path="/contactus"element={<ContactUs/>}/>

                        {/* Store Routes */}
                        <Route path="/detail/:slug" element={<ProductDetail />} />
                        <Route path="/cart/" element={<Cart />} />
                        <Route path="/checkout/:order_oid" element={<Checkout />} />
                        <Route path="/payment-success/:order_oid/" element={<PaymentSuccess />} />
                        <Route path="/invoice/:order_oid/" element={<Invoice />} />
                        <Route path="/search" element={<Search />} />
                        <Route path="/products/" element={<ProdView/>} />

                        {/* Customer Routes */}
                        <Route path="/customer/account/" element={<PrivateRoute><Account /></PrivateRoute>} />
                        <Route path="/customer/orders/" element={<PrivateRoute><Orders /></PrivateRoute>} />
                        <Route path="/customer/order/detail/:order_oid/" element={<PrivateRoute><OrderDetail /></PrivateRoute>} />
                        <Route path="/customer/wishlist/" element={<PrivateRoute><Wishlist /></PrivateRoute>} />
                        <Route path="/customer/notifications/" element={<PrivateRoute><Notifications /></PrivateRoute>} />
                        <Route path="/customer/settings/" element={<PrivateRoute><Settings /></PrivateRoute>} />

                        {/* Vendor Routes */}
                        <Route path="/vendor/dashboard/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                        <Route path="/vendor/products/" element={<PrivateRoute> <Products /></PrivateRoute>} />
                        <Route path="/vendor/product/new/" element={<PrivateRoute> <AddProduct /></PrivateRoute>} />
                        <Route path="/vendor/product/update/:pid/" element={<PrivateRoute> <UpdateProduct /></PrivateRoute>} />
                        <Route path="/vendor/orders/" element={<PrivateRoute> <VendorOrders /></PrivateRoute>} />
                        <Route path="/vendor/orders/:oid/" element={<PrivateRoute> <VendorOrderDetail /></PrivateRoute>} />
                        <Route path="/vendor/earning/" element={<PrivateRoute> <Earning /></PrivateRoute>} />
                        <Route path="/vendor/reviews/" element={<PrivateRoute> <Reviews /></PrivateRoute>} />
                        <Route path="/vendor/reviews/:id/" element={<PrivateRoute> <ReviewDetail /></PrivateRoute>} />
                        <Route path="/vendor/coupon/" element={<PrivateRoute> <Coupon /></PrivateRoute>} />
                        <Route path="/vendor/coupon/:id/" element={<PrivateRoute> <EditCoupon /></PrivateRoute>} />
                        <Route path="/vendor/notifications/" element={<PrivateRoute> <VendorNotifications /></PrivateRoute>} />
                        <Route path="/vendor/settings/" element={<PrivateRoute> <VendorSettings /></PrivateRoute>} />
                        <Route path="/vendor/:slug/" element={<Shop />} />
                        <Route path="/vendor/register/" element={<VendorRegister />} />
                        <Route path="/vendor/orders/:oid/:id/" element={<OrderItemDetail />} />

                    </Routes>
                </MainWrapper>
                <StoreFooter />
            </BrowserRouter>
        </CartContext.Provider >

    );
}

export default App; // Export the 'App' component as the default export.
