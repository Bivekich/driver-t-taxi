import React from "react";
import Header from "../../components/Header";
import NavButton from "../../components/NavButton";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex justify-center">
      <div className="bg-gray-100 w-[375px] min-h-screen shadow-lg relative">
        <Header />
        <div className="p-4">
          {/* <Banner imageUrl="images/banner.webp" link="https://example.com" /> */}
          <Outlet />
        </div>
        <div className="p-4"></div>
        <nav className="fixed bottom-0 w-[375px] bg-white shadow-md p-4 flex justify-around">
          <NavButton icon="fas fa-car" label="Работа" path="/" />
          <NavButton
            icon="fas fa-history"
            label="Мои поездки"
            path="/history"
          />
        </nav>
      </div>
    </div>
  );
};

export default AdminDashboard;
