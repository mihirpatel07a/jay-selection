import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Order() {
  const { currentUser } = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      const res = await fetch(`/api/order/getorders/${currentUser.data.email}`);

      const data = await res.json();

      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setOrders(data);
    };

    getOrders();
  }, [currentUser.data._id]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg flex  justify-center">
      <table className="w-full sm:max-w-4xl md:max-w-2xl text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 p-3 mt-5">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-16 py-3">
              <span className="sr-only">Image</span>
            </th>
            <th scope="col" className="px-16 py-3">
              Order_Id
            </th>
            <th scope="col" className="px-6 py-3">
              Product
            </th>
            <th scope="col" className="px-6 py-3">
              Qty
            </th>
            <th scope="col" className="px-6 py-3">
              Size
            </th>
            <th scope="col" className="px-6 py-3">
              Color
            </th>
            <th scope="col" className="px-6 py-3">
              Total Price
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) =>
            order.cartItems.map((item) => (
              <tr
                key={item.id}
                className="bg-white border-b dark:bg-white dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="p-4">
                  <img
                    src={item.imageSrc}
                    className="h-10  w-10  rounded-full"
                    alt={item.title}
                  />
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-black">
                  {order._id}
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-black">
                  {item.name}
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-black">
                  {item.quantity}
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-black">
                  {item.size}
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-black">
                  {item.color}
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-black">
                  ${item.totalprice}
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-black">
                  {formatDate(order.createdAt)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
