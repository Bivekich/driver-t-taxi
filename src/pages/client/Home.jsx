import Header from "../../components/Header";
import CategoryCard from "../../components/CategoryCard";
import NavButton from "../../components/NavButton";
import Banner from "../../components/Banner";

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex justify-center">
      <div className="bg-gray-100 w-[375px] min-h-screen shadow-lg relative">
        <Header />
        <div className="p-4">
          <Banner imageUrl="images/banner.webp" link="https://example.com" />
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-3">Категории</h2>
          <div className="grid grid-cols-3 gap-4">
            <CategoryCard title="Поездка" icon="fas fa-car" />
          </div>
        </div>
        <nav className="fixed bottom-0 w-[375px] bg-white shadow-md p-4 flex justify-around">
          <NavButton icon="fas fa-home" label="Главная" path="/" />
          <NavButton icon="fas fa-car" label="Мои поездки" path="/my-rides" />
        </nav>
      </div>
    </div>
  );
};

export default Home;
