import { useNavigate } from "react-router-dom";

const NavButton = ({ icon, label, path }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(path);
  };

  return (
    <button
      onClick={handleClick}
      className="flex flex-col items-center text-gray-700"
    >
      <i className={`${icon} text-2xl`}></i>
      <span className="text-xs mt-1">{label}</span>
    </button>
  );
};

export default NavButton;
