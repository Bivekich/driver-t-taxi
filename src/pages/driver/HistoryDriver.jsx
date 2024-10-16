import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HistoryDriver = ({ phoneNumber }) => {
  const [rides, setRides] = useState([]);
  const [activeTab, setActiveTab] = useState("active");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const response = await axios.get(
          `https://api.24t-taxi.ru/api/orders/dget/${phoneNumber}`
        );
        console.log(response);
        setRides(response.data);
      } catch (error) {
        console.error("Ошибка при получении поездок:", error);
      }
    };
    fetchRides();
  }, []);
  const filterRides = (status) => {
    return rides.filter((ride) => ride.status.toLowerCase() === status);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-between">
      <div className="bg-white shadow-md rounded-md p-4 mb-4">
        <div className="flex items-center mb-4">
          <button
            className="bg-white p-2 rounded-full shadow-md mr-4"
            onClick={() => navigate(-1)}
          >
            <i className="fas fa-arrow-left"></i>
          </button>
          <h2 className="text-xl font-semibold">Все поездки</h2>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === "active" ? "bg-black text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("active")}
          >
            Заказанные
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === "pending" ? "bg-black text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("pending")}
          >
            В поездке
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === "complete" ? "bg-black text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("complete")}
          >
            Завершенные
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === "cancel" ? "bg-black text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("cancel")}
          >
            Отмененные
          </button>
        </div>
        <div className="h-[60vh] overflow-y-auto">
          {activeTab === "active" && (
            <RideList rides={filterRides("заказан")} />
          )}
          {activeTab === "pending" && (
            <RideList rides={filterRides("ожидает")} />
          )}
          {activeTab === "complete" && (
            <RideList rides={filterRides("завершен")} />
          )}
          {activeTab === "cancel" && (
            <RideList rides={filterRides("отменен")} />
          )}
        </div>
      </div>
    </div>
  );
};

const RideList = ({ rides }) => {
  if (rides.length === 0) {
    return <div className="text-center text-gray-500">Поездок нет</div>;
  }

  return (
    <div className="space-y-4">
      {rides.map((ride) => (
        <div key={ride.id} className="bg-white shadow-md rounded-md p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm">
              <span className="font-semibold">ID:</span> {ride.id}
            </div>
            <div className="text-green-500 text-lg font-semibold">
              {ride.price}
            </div>
          </div>
          <div className="mb-2">
            <span className="font-semibold">{ride.status}</span>
            <span className="ml-2 text-gray-500">
              {new Date(ride.created_at).toLocaleString()}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600 mb-2">
            <i className="fas fa-map-marker-alt"></i>
            <div>{ride.pickup_address}</div>
          </div>
          <div className="flex items-center space-x-2 text-gray-600 mb-2">
            <i className="fas fa-location-arrow"></i>
            <div>{ride.destination_address}</div>
          </div>
          {ride.completed_at && (
            <div className="text-sm text-gray-500">
              Завершено: {new Date(ride.completed_at).toLocaleString()}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default HistoryDriver;
