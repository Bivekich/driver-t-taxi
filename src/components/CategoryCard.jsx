import { useNavigate } from "react-router-dom";

const CategoryCard = ({ title, icon }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (title === "Поездка") {
      navigate("/trip");
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md cursor-pointer"
    >
      <i className={`${icon} text-3xl mb-2`}></i>
      <span>{title}</span>
    </div>
  );
};

export default CategoryCard;
