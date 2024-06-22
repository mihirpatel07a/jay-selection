import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import img from '../assets/js.jpg';

const CheckoutPage = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [cartProducts, setCartProducts] = useState([]);
  const [razorpayKey, setRazorpayKey] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNo: '',
    addressLine: '',
    city: '',
    state: '',
    zipCode: '',
    cartItems: [],
    totalSum: 0
  });

  useEffect(() => {
    const fetchRazorpayKey = async () => {
      try {
        const res = await fetch('/api/payment/key');
        const data = await res.json();
        setRazorpayKey(data.key);
      } catch (error) {
        console.error('Error fetching Razorpay key:', error);
      }
    };

    fetchRazorpayKey();
  }, []);

  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await fetch(`/api/item/getcartdata/${currentUser.data._id}`, {
          method: 'GET'
        });

        const data = await res.json();

        if (data.success === false) {
          console.log(data.message);
          return;
        }

        setCartProducts(data);

        // Calculate total sum
        const sum = data.reduce((acc, item) => acc + item.totalprice, 0);
        setFormData(prevState => ({
          ...prevState,
          cartItems: data,
          totalSum: sum
        }));

      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };

    if (currentUser.data) {
      getItems();
    }
  }, [currentUser.data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phoneNo ||
      !formData.addressLine ||
      !formData.city ||
      !formData.state ||
      !formData.zipCode
    ) {
      alert('Please fill in all fields.');
      return;
    }

    const orderData = {
      amount: formData.totalSum,
      currency: 'INR',
      receipt: `receipt_${Math.floor(Math.random() * 10000)}`
    };

    try {
      const res = await fetch('/api/payment/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });

      const order = await res.json();
      if (order.id) {
        const options = {
          key: razorpayKey,
          amount: order.amount,
          currency: order.currency,
          name: 'jay Selection',
          description: 'Test Transaction',
          image: img, // Optional
          order_id: order.id,
          handler: async function (response) {
            alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);

            // Now pass the formData to /api/order/create
            try {
              const orderResponse = await fetch('/api/order/create', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
              });

              const orderData = await orderResponse.json();

              if (orderData.success) {
                alert('Order created successfully!');
                // You can redirect to a success page or clear the form
              } else {
                alert('Error creating order.');
              }
            } catch (error) {
              console.error('Error creating order:', error);
            }
          },
          prefill: {
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            contact: formData.phoneNo
          },
          theme: {
            color: '#3399cc'
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      }
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <div className="font-sans bg-white">
      <div className="flex max-sm:flex-col gap-12 max-lg:gap-4 h-full">
        <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 sm:h-screen sm:sticky sm:top-0 lg:min-w-[370px] sm:min-w-[300px]">
          <div className="relative h-full">
            <div className="px-4 py-8 sm:overflow-auto sm:h-[calc(100vh-60px)]">
              <div className="space-y-4">
                {cartProducts && cartProducts.map((product) => (
                  <div key={product._id} className="flex items-start gap-4">
                    <div className="w-32 h-28 max-lg:w-24 max-lg:h-24 flex p-3 shrink-0 bg-gray-300 rounded-md">
                      <img src={product.imageSrc} className="w-[100px] h-[100px] self-center" alt={product.name} />
                    </div>
                    <div className="w-full">
                      <h3 className="text-base text-white">{product.name}</h3>
                      <ul className="text-xs text-gray-300 space-y-2 mt-2">
                        <li className="flex flex-wrap gap-4">Size <span className="ml-auto">{product.size}</span></li>
                        <li className="flex flex-wrap gap-4">Quantity <span className="ml-auto">{product.quantity}</span></li>
                        <li className="flex flex-wrap gap-4">Total Price <span className="ml-auto">Rs {product.totalprice}</span></li>
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:absolute md:left-0 md:bottom-0 bg-gray-800 w-full p-4">
              <h4 className="flex flex-wrap gap-4 text-base text-white">
                Total <span className="ml-auto">Rs {formData.totalSum.toFixed(2)}</span>
              </h4>
            </div>
          </div>
        </div>

        <div className="max-w-4xl w-full h-max rounded-md px-4 py-8 sticky top-0">
          <h2 className="text-2xl font-bold text-gray-800">Complete your order</h2>
          <form className="mt-8" onSubmit={handleSubmit}>
            <div>
              <h3 className="text-base text-gray-800 mb-4">Personal Details</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 border focus:border-yellow-400"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 border focus:border-yellow-400"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 border focus:border-yellow-400"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Phone No"
                    name="phoneNo"
                    value={formData.phoneNo}
                    onChange={handleInputChange}
                    className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 border focus:border-yellow-400"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-base text-gray-800 mb-4">Shipping Details</h3>
              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Address Line"
                    name="addressLine"
                    value={formData.addressLine}
                    onChange={handleInputChange}
                    className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 border focus:border-yellow-400"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="City"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 border focus:border-yellow-400"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="State"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 border focus:border-yellow-400"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Zip Code"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 border focus:border-yellow-400"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button
                type="submit"
                className="px-4 py-3 bg-yellow-400 text-white text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 border focus:border-yellow-400"
              >
                Pay Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
