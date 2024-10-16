import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import axios from "axios"; // Добавляем axios для запросов к серверу
import Home from "./pages/client/Home";
import DriverDashboard from "./pages/driver/DriverDashboard";
import AllRidesDriver from "./pages/driver/AllRidesDriver";
import HistoryDriver from "./pages/driver/HistoryDriver";
import Order from "./pages/driver/Order";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const App = () => {
  const [phoneNumber, setPhoneNumber] = useState(
    localStorage.getItem("phoneNumber")
  );
  const [userRoles, setUserRoles] = useState([]); // Загружаем роли
  const query = useQuery();
  const navigate = useNavigate();

  useEffect(() => {
    const phoneFromUrl = query.get("phoneNumber");
    if (phoneFromUrl) {
      setPhoneNumber(phoneFromUrl);
      localStorage.setItem("phoneNumber", phoneFromUrl);
    }

    // Если телефон есть, но роли пользователя не сохранены, запрашиваем данные о пользователе
    const fetchUserProfile = async () => {
      if (phoneNumber && userRoles.length === 0) {
        try {
          const response = await axios.get(
            `https://api.24t-taxi.ru/api/user/profile/${phoneNumber}`
          );
          console.log(response);
          const roles = response.data.map((role) => role.type); // Извлекаем роли
          setUserRoles(roles); // Сохраняем массив ролей пользователя
        } catch (error) {
          console.error("Ошибка при получении профиля пользователя:", error);
        }
      }
    };

    if (phoneNumber) {
      fetchUserProfile();
    }
  }, [query, phoneNumber]);

  // Проверяем, есть ли у пользователя доступ к определённым ролям
  const hasAccess = (roles) => {
    if (roles.includes("driver")) return true;
    return false;
  };

  // Если роли пользователя загружены и у него нет доступа, перенаправляем на домашнюю страницу
  useEffect(() => {
    if (userRoles.length > 0 && !hasAccess(userRoles)) {
      navigate("/"); // Перенаправляем пользователя на домашнюю страницу, если нет доступа
    }
  }, [userRoles, navigate]);

  return (
    <Routes>
      {/* Маршруты для водителя */}
      {userRoles.includes("driver") && (
        <>
          <Route path="/" element={<DriverDashboard />}>
            <Route index element={<AllRidesDriver />} />
            <Route
              path="history"
              element={<HistoryDriver phoneNumber={phoneNumber} />}
            />
            <Route
              path="order/:id"
              element={<Order phoneNumber={phoneNumber} />}
            />
          </Route>
        </>
      )}

      {/* Общий fallback на случай, если у пользователя нет роли */}
      <Route path="*" element={<Home />} />
    </Routes>
  );
};

export default function Root() {
  return (
    <Router>
      <App />
    </Router>
  );
}
