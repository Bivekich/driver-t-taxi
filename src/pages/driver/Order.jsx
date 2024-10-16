import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Order = ({ phoneNumber }) => {
  const { id } = useParams(); // Get the order id from the URL
  const [order, setOrder] = useState({
    id: "",
    phone_number: "",
    status: "",
    pickup_address: "",
    destination_address: "",
    yandex_route_link: "",
    price: "",
    createdAt: "",
    completedAt: "",
    driverId: "",
    pickupTime: "",
    endingTime: "",
  });
  const [price, setPrice] = useState(89);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tripStarted, setTripStarted] = useState(false); // Track if trip was started
  const [tripEnded, setTripEnded] = useState(false); // Track if trip was ended

  // Fetch order details from the server
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(
          `https://api.24t-taxi.ru/api/orders/order/${id}/${phoneNumber}`
        ); // Fetch order by ID
        setOrder(response.data); // Set the fetched data into state

        setLoading(false);
      } catch (err) {
        setError("Ошибка при получении данных о заказе");
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]); // Run this effect when the id changes

  // Handle "Позвонить" button click
  const handleCall = () => {
    window.location.href = `tel:${order.phone_number}`; // Simulate call action
  };

  // Handle "Начать поездку" button click
  const handleStartTrip = async () => {
    try {
      await axios.post(
        `https://api.24t-taxi.ru/api/orders/set/${id}/start-trip`
      );
      setOrder((prevOrder) => ({
        ...prevOrder,
        status: "В поездке",
      }));
      setTripStarted(true); // Set trip started to true
      alert("Поездка начата");
    } catch (err) {
      console.error("Ошибка при начале поездки", err);
    }
  };

  // Handle "Закончить поездку" button click
  const handleEndTrip = async () => {
    try {
      const response = await axios.post(
        `https://api.24t-taxi.ru/api/orders/set/${id}/end-trip`
      );
      setOrder((prevOrder) => ({
        ...prevOrder,
        status: "Завершена",
      }));
      setTripEnded(true); // Set trip ended to true
      alert("Поездка завершена");
      console.log(response);
      setPrice(response.data.price);
    } catch (err) {
      console.error("Ошибка при завершении поездки", err);
    }
  };

  if (loading) return <p>Загрузка данных заказа...</p>;
  if (error) return <p>{error}</p>;

  // Disable conditions based on the status of the order
  const isCompleted = order.status === "завершен";
  const isCanceled = order.status === "отменен";
  const isPending = order.status === "ожидает";
  const isInProgress = order.status === "В поездке";

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Детали заказа</h1>

      {/* Check if trip is ended */}
      {tripEnded ? (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Сумма к оплате</h2>
          <p className="mt-1 p-2 border rounded-md text-xl">{price} Р</p>
        </div>
      ) : (
        <>
          <h3 className="mb-4">
            Чтобы взять заказ необходимо позвонить клиенту, назвать время, когда
            подъедите и номер своей машины
          </h3>
          <div className="space-y-4 mb-10">
            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Номер телефона
              </label>
              <p className="mt-1 p-2 border rounded-md">
                +{order.phone_number}
              </p>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Статус
              </label>
              <p className="mt-1 p-2 border rounded-md">{order.status}</p>
            </div>

            {/* Pickup Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Адрес отправления
              </label>
              <p className="mt-1 p-2 border rounded-md">
                {order.pickup_address}
              </p>
            </div>

            {/* Destination Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Адрес назначения
              </label>
              <p className="mt-1 p-2 border rounded-md">
                {order.destination_address}
              </p>
            </div>

            {/* Yandex Route Link */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Ссылка на маршрут Яндекс
              </label>
              <a
                href={order.yandex_route_link}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-1 p-2 border rounded-md text-blue-600"
              >
                Ссылка на маршрут на карте
              </a>
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Цена
              </label>
              <p className="mt-1 p-2 border rounded-md">{order.price}</p>
            </div>

            {/* Buttons */}
            <div className="space-y-2 mt-4">
              {/* Позвонить button */}
              <button
                onClick={handleCall}
                className={`w-full bg-blue-500 text-white py-2 px-4 rounded-md ${
                  isCompleted || isCanceled
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={isCompleted || isCanceled}
              >
                Позвонить
              </button>

              {/* Если заказ завершен, нельзя начать поездку */}
              {!tripStarted && !isCompleted && !isCanceled && !isPending && (
                <button
                  onClick={handleStartTrip}
                  className={`w-full bg-green-500 text-white py-2 px-4 rounded-md ${
                    isPending ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={isPending}
                >
                  Начать поездку
                </button>
              )}

              {/* Если поездка начата, показываем кнопку для завершения */}
              {tripStarted && !isCompleted && !isCanceled && (
                <button
                  onClick={handleEndTrip}
                  className="w-full bg-red-500 text-white py-2 px-4 rounded-md"
                >
                  Закончить поездку
                </button>
              )}

              {/* Если заказ отменен, блокируем все действия */}
              {isCanceled && (
                <button
                  className="w-full bg-gray-500 text-white py-2 px-4 rounded-md cursor-not-allowed opacity-50"
                  disabled
                >
                  Действие недоступно (Отменен)
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Order;
