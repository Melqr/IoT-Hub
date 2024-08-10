import React, { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import moment from 'moment';
import Chart from "chart.js/auto";
import { Pie, Line } from "react-chartjs-2";
import { deleteProduct } from '../plugin/DeleteProduct';
import apiInstance from '../../utils/axios';
import UserData from '../plugin/UserData';
import Sidebar from './Sidebar';
import Swal from 'sweetalert2';



function Dashboard() {

  const [stats, setStats] = useState(null)
  const [products, setProducts] = useState(null)
  const [orders, setOrders] = useState(null)
  const [orderChartData, setOrderChartData] = useState(null)
  const [productsChartData, setProductsChartData] = useState(null)
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Default to current month
  const [selectedChart, setSelectedChart] = useState('yearly');

  const axios = apiInstance
  const userData = UserData()
  const navigate = useNavigate()

  if (UserData()?.vendor_id === 0) {
    window.location.href = '/vendor/register/'
  }


  if (userData?.vendor_id !== 0) {

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`vendor/stats/${userData?.vendor_id}/`)
          setStats(response.data[0]);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }, []);


    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`vendor/products/${userData?.vendor_id}/`)
          setProducts(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }, []);


    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`vendor/orders/${userData?.vendor_id}/`)
          setOrders(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }, []);

    
  }
 

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const order_response = await axios.get(`vendor-orders-report-chart/${userData?.vendor_id}/`);
        setOrderChartData(order_response.data);

        const product_response = await axios.get(`vendor-products-report-chart/${userData?.vendor_id}/`);
        setProductsChartData(product_response.data);

      } catch (error) {
        console.log(error);
      }
    };
    fetchChartData();
  }, [])

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        console.log(`Fetching data for month: ${selectedMonth}`);
        const orderResponse = await axios.get(`vendor-orders-report-chart/${userData?.vendor_id}/?month=${selectedMonth}`);
        console.log('Received order data:', orderResponse.data);
        setOrderChartData(orderResponse.data);
      } catch (error) {
        console.log('Error fetching report data:', error);
      }
    };

    fetchReportData();
  }, [selectedMonth, userData?.vendor_id]);

  // Define a function to map month numbers to month names
  const getMonthName = (monthNumber) => {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return monthNames[monthNumber - 1]; // monthNumber is 1-based
  };

  const order_months = orderChartData?.map(item => getMonthName(item.month));
  const order_counts = orderChartData?.map(item => item.orders);

  const product_labels = productsChartData?.map(item => getMonthName(item.month));
  const product_count = productsChartData?.map(item => item.orders);

  // Prepare data for daily orders chart
    // Prepare data for daily orders chart
    const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1); // Array of days from 1 to 31
    const order_count = Array(31).fill(0); // Initialize an array of 31 zeros
  
    if (orderChartData) {
      orderChartData.forEach(item => {
        const day = moment(item.date).date();
        order_count[day - 1] = item.orders;
      });
    }

  
  //chart 1
  const order_data = {
    labels: order_months,
    datasets: [
      {
        label: "Total Orders",
        data: order_counts,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      },


    ]
  }
  const chartOptions1 = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Total Orders'
        },
        beginAtZero: true
      }
    }
  };

  //chart 2
  const product_data = {
    labels: product_labels,
    datasets: [
      {
        label: "Total Products",
        data: product_count,
        fill: true,
        backgroundColor: "#ba9ede",
        borderColor: "#6100e0"
      },
    ]
  }
  // Chart options with axis labels
const chartOptions2= {
  plugins: {
    legend: {
      display: true,
      position: 'top',
    },
    title: {
      display: true,
      text: 'Products Report',  // Title of the chart
    }
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Month'  // Label for the x-axis
      },
      grid: {
        display: false
      }
    },
    y: {
      title: {
        display: true,
        text: 'Total Products'  // Label for the y-axis
      },
      beginAtZero: true,  // Optional: Starts y-axis from zero
    }
  }
};

  //chart 3
  const daily_order_data = {
    labels: daysInMonth,
    datasets: [
      {
        label: 'Number of Orders',
        data: order_count,
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)'
      }
    ]
  };

  const daily_chart_options = {
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: `Orders for ${getMonthName(selectedMonth)}`
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Day'
        },
        grid: {
          display: false
        }
      },
      y: {
        title: {
          display: true,
          text: 'Number of Orders'
        },
        beginAtZero: true,
      }
    }
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(Number(event.target.value));
  };
  const handleChartChange = (chartType) => {
    setSelectedChart(chartType);
  };

  const handleDeleteProduct = async (productPid) => {
    try {
      await deleteProduct(userData?.vendor_id, productPid);
      // Fetch updated products after deletion
      const response = await axios.get(`vendor/products/${userData?.vendor_id}/`);
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="container-fluid" id="main" >
      <div className="row row-offcanvas row-offcanvas-left h-100">
        <Sidebar />
        <div className="col-md-9 col-lg-10 main mt-4">
          <div className="row mb-3 text-white">
            <div className="col-xl-4 col-lg-6 mb-2">
              <div className="card card-inverse card-success">
                <div className="card-block bg-success p-3">
                  <div className="rotate">
                    <i className="bi bi-grid fa-5x" />
                  </div>
                  <h6 className="text-uppercase">Products</h6>
                  <h1 className="display-2">{stats?.products || 0}</h1>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 mb-2">
              <div className="card card-inverse card-danger">
                <div className="card-block bg-danger p-3">
                  <div className="rotate">
                    <i className="bi bi-cart-check fa-5x" />
                  </div>
                  <h6 className="text-uppercase">Orders</h6>
                  <h1 className="display-2">{stats?.orders || 0}</h1>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-lg-6 mb-2">
              <div className="card card-inverse card-warning">
                <div className="card-block bg-warning p-3">
                  <div className="rotate">
                    <i className="bi bi-currency-dollar fa-5x" />
                  </div>
                  <h6 className="text-uppercase">Revenue</h6>
                  <h1 className="display-2">RM{stats?.revenue || 0}</h1>
                </div>
              </div>
            </div>
          </div>
          {/*/row*/}
          <hr />
          <div className="row mb-1 mt-4">
            <div className="col">
              <h4>Chart Analytics</h4>
            </div>
          </div>
          <div className="mb-3">
        <button className='btn btn-primary me-2' onClick={() => handleChartChange('monthly')}>Monthly Report</button>
        <button className='btn btn-primary me-2' onClick={() => handleChartChange('yearly')}>Yearly Report</button>
        <button className='btn btn-primary me-2' onClick={() => handleChartChange('product')}>Product Report</button>
      </div>
      <div className="row my-2">
        {selectedChart === 'yearly' && (
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Yearly Report</h5>
                <Line data={order_data} options={chartOptions1} style={{ height: 25, width: '75%', margin: '0 auto' }} />
              </div>
            </div>
          </div>
        )}
        {selectedChart === 'monthly' && (
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Monthly Report</h5>
                <div className="d-flex justify-content-between mb-3">
                  <select value={selectedMonth} onChange={handleMonthChange} className="form-select w-auto">
                    <option value={1}>January</option>
                    <option value={2}>February</option>
                    <option value={3}>March</option>
                    <option value={4}>April</option>
                    <option value={5}>May</option>
                    <option value={6}>June</option>
                    <option value={7}>July</option>
                    <option value={8}>August</option>
                    <option value={9}>September</option>
                    <option value={10}>October</option>
                    <option value={11}>November</option>
                    <option value={12}>December</option>
                  </select>
                </div>
                <Line data={daily_order_data} options={daily_chart_options} style={{ height: 25, width: '75%', margin: '0 auto' }} />
              </div>
            </div>
          </div>
        )}
                {selectedChart === 'product' && (
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Product Report</h5>
                <Line data={product_data} options={chartOptions2} style={{ height: 25, width: '75%', margin: '0 auto' }} />
              </div>
            </div>
          </div>
        )}
      </div>
          
          <a id="layouts" />
          <div className="mb-3 mt-5" style={{ marginBottom: 300 }}>
            <nav className='mb-5'>
              <div className="nav nav-tabs" id="nav-tab" role="tablist">
                <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true"> <i className='bi bi-grid-fill'></i> Product</button>
                <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false"> <i className='fas fa-shopping-cart'></i> Orders</button>
              </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
              <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                <h4>Products</h4>
                <table className="table">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col">#ID</th>
                      <th scope="col">Name</th>
                      <th scope="col">Price</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Orders</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products?.map((p, index) => (
                      <tr key={index}>
                        <th scope="row">#{p.sku}</th>
                        <td>{p.title}</td>
                        <td>RM{p.price}</td>
                        <td>{p.stock_qty}</td>
                        <td>{p.order_count}</td>
                        <td>{p?.status?.toUpperCase()}</td>
                        <td>
                          <Link to={`/detail/${p.slug}`} className="btn btn-primary mb-1 me-2"><i className="fas fa-eye" /></Link>
                          <Link to={`/vendor/product/update/${p.pid}/`} className="btn btn-success mb-1 me-2"><i className="fas fa-edit" /></Link>
                          <button type='button' onClick={() => handleDeleteProduct(p.pid)} className="btn btn-danger mb-1 me-2"><i className="fas fa-trash" /></button>
                        </td>
                      </tr>
                    ))}

                    {products < 1 &&
                      <h5 className='mt-4 p-3'>No products yet</h5>
                    }


                  </tbody>
                </table>
              </div>
              <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                <h4>Products</h4>
                <table className="table">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col">#ID</th>
                      <th scope="col">Name</th>
                      <th scope="col">Date</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders?.map((o, index) => (
                      <tr key={index}>
                        <th scope="row">#{o.oid}</th>
                        <td>{o.full_name}</td>
                        <td>{moment(o.date).format("MM/DD/YYYY")}</td>
                        <td>{o.order_status}</td>
                        <td>
                          <Link to={`/vendor/orders/${o.oid}/`} className="btn btn-primary mb-1"><i className="fas fa-eye" /></Link>
                        </td>
                      </tr>
                    ))}


                    {orders < 1 &&
                      <h5 className='mt-4 p-3'>No orders yet</h5>
                    }

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div >
  )
}

export default Dashboard