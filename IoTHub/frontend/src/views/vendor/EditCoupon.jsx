import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';

import apiInstance from '../../utils/axios';
import UserData from '../plugin/UserData';
import Sidebar from './Sidebar';
import Swal from 'sweetalert2'


function EditCoupon() {
    const [coupon, setCoupon] = useState([])

    if (UserData()?.vendor_id === 0) {
        window.location.href = '/vendor/register/'
    }
    
    const axios = apiInstance
    const userData = UserData()
    const param = useParams()

    const fetchData = async () => {
        try {
            await axios.get(`vendor-coupon-detail/${userData?.vendor_id}/${param.id}`).then((res) => {
                setCoupon(res.data);
            })
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleUpdateCouponChange = (event) => {
        setCoupon({
            ...coupon,
            [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value,
        })
        console.log(coupon);
    }

    const handleUpdateCoupon = async (e) => {
        e.preventDefault()
        const formdata = new FormData()

        formdata.append("vendor", userData?.vendor_id)
        formdata.append("code", coupon.code)
        formdata.append("discount", coupon.discount)
        formdata.append("active", coupon.active)

        await axios.patch(`vendor-coupon-detail/${userData?.vendor_id}/${param.id}/`, formdata).then((res) => {
            console.log(res.data);
            Swal.fire({
                icon: 'success',
                title: 'Coupon Updated',
            })
        })
    }
    return (
        <div className="container-fluid" id="main" >
            <div className="row row-offcanvas row-offcanvas-left h-100">
                <Sidebar />
                <div className="col-md-9 col-lg-10 main mt-4">
                    <h4 className="mt-3 mb-4"><i className="bi bi-tag" /> Coupons</h4>
                    <form onSubmit={handleUpdateCoupon} className='card shadow p-3'>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                Code
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                name='code'
                                placeholder='Enter Coupon Code'
                                onChange={handleUpdateCouponChange}
                                value={coupon.code}
                            />
                            <div id="emailHelp" className="form-text">
                                E.g DESTINY2024
                            </div>
                        </div>
                        <div className="mb-3 mt-4">
                            <label htmlFor="exampleInputPassword1" className="form-label">
                                Discount
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                id="exampleInputPassword1"
                                name='discount'
                                placeholder='Enter Discount'
                                onChange={handleUpdateCouponChange}
                                value={coupon.discount}
                            />
                            <div id="emailHelp" className="form-text">
                                NOTE: Discount is in <b>percentage</b>
                            </div>
                        </div>
                        <div className="mb-3 form-check">
                            <input checked={coupon.active} onChange={handleUpdateCouponChange} name='active' type="checkbox" className="form-check-input" id="exampleCheck1" />
                            <label className="form-check-label" htmlFor="exampleCheck1">
                                Activate Coupon
                            </label>
                        </div>
                        <div className="d-flex">
                            <Link to="/vendor/coupon/" className="btn btn-secondary">
                                <i className='fas fa-arrow-left'></i> Go Back
                            </Link>
                            <button type="submit" className="btn btn-success ms-2">
                                Update Coupon <i className='fas fa-check-circle'></i>
                            </button>
                        </div>
                    </form>
                </div>


            </div>


        </div >
    )
}

export default EditCoupon