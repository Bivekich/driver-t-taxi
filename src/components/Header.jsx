const Header = () => {
  return (
    <header className="flex justify-center items-center px-4 py-4 bg-white shadow-md">
      <div className="flex items-center">
        <img src="/logo.webp" alt="T-Taxi Logo" className="h-8 w-8 mr-2" />
        <div className="text-2xl font-bold">T Taxi</div>
      </div>
    </header>
  );
};

export default Header;
