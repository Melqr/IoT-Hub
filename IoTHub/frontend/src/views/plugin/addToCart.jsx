import apiInstance from '../../utils/axios';
import { useState } from 'react';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
});

// let [isAddingToCart, setIsAddingToCart] = useState("Add To Cart");
// Function to add a product to the cart
export const addToCart = async (product_id, user_id, qty, price, shipping_amount, current_address, color, cart_id,rental_start_date,rental_end_date,rental_days, setIsAddingToCart) => {

    const axios = apiInstance;
    // Set the loading state to "Processing..." while the request is in progress
    // setIsAddingToCart('Processing...');

   
    try {
        // Log all inputs to identify which one is missing
        console.log('product_id:', product_id);
        console.log('user_id:', user_id);
        console.log('qty:', qty);
        console.log('price:', price);
        console.log('shipping_amount:', shipping_amount);
        console.log('current_address:', current_address);
        console.log('color:', color);
        console.log('cart_id:', cart_id);
        console.log('rental_start_date:', rental_start_date);
        console.log('rental_end_date:', rental_end_date);
        console.log('rental_days:', rental_days);

        // Validate the inputs
        if (!product_id || !user_id || !qty || !price || !shipping_amount || !current_address || !color || !cart_id || !rental_start_date || !rental_end_date || !rental_days) {
            throw new Error('Missing required fields');
        }

        // Create a new FormData object to send product information to the server
        const formData = new FormData();
        formData.append('product', product_id);
        formData.append('user', user_id);
        formData.append('qty', qty);
        formData.append('rental_start_date', rental_start_date);
        formData.append('rental_end_date', rental_end_date);
        formData.append('rental_days', rental_days);
        formData.append('price', price);
        formData.append('shipping_amount', shipping_amount);
        formData.append('country', current_address);
        formData.append('color', color);
        formData.append('cart_id', cart_id);

        // Send a POST request to the server's 'cart-view/' endpoint with the product information
        const response = await axios.post('cart-view/', formData);

        // Log the response data from the server
        console.log(response.data);

        Toast.fire({
            icon: 'success',
            title: 'Added To Cart'
        });
    } catch (error) {
        // Log any errors that occur during the request
        console.log('Error in addToCart:', error);
        if (error.response) {
            console.log('Response data:', error.response.data);
        }

        // Set the loading state to "An Error Occurred" in case of an error
        setIsAddingToCart('An Error Occurred');
    }
};
