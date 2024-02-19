import React, { useEffect, useState } from "react";
import axios from "axios";
import { isLoggedIn, getLoggedUser } from "../utils/login.utils";

function OrdersHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!isLoggedIn()) {
          console.log("tienes que loguearte");
          // return;
        }
        const user = getLoggedUser();

        const response = await axios.get(
          `http://localhost:8000/api/orderhistory/list/${user.id}`
        );

        setOrders(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();
  }, []);
  console.log(orders);
  return (
    <div className="grid grid-cols-1 gap-4">
      {orders.length === 0 ? (
        <p>No orders available</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="bg-white rounded-md shadow-md p-4">
            <h3 className="text-lg font-bold mb-2">
              Orden ID: {order.order_id}
            </h3>
            {order.order_details_by_product
              .map((item) => JSON.parse(item))
              .map((ord, index) => (
                <div key={index}>
                  <p className="text-gray-500 mt-4">
                    ID del producto: {ord.id}
                  </p>
                  <p className="text-gray-700 font-bold">
                    Precio del producto: ${ord.price}
                  </p>
                  <p className="text-gray-700 font-bold">
                    Cantidad de productos: {ord.quantity}
                  </p>
                  <p className="text-gray-700 font-bold">
                    Cantidad Total: ${ord.quantity * ord.price}
                  </p>
                </div>
              ))}
          </div>
        ))
      )}
    </div>
  );
}

export default OrdersHistory;
