import { Outlet } from 'react-router-dom';
import { Footer } from "../components/Footer.jsx";
import { Header } from "../components/Header.jsx";

export const MainLayout = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex flex-col max-w-screen-xl mx-auto px-4 mt-8">
          <Outlet/>
        </main>
        <Footer />
      </div>
    </>
  );
};
