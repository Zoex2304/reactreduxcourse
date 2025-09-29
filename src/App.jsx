import { MainLayout } from "./layouts/MainLayout.jsx";
import CartPage from './pages/CartPage.jsx';
import HomePage from "./pages/HomePage.jsx";
import { Route, Routes } from "react-router-dom";

const NotFoundPage = () => (
  <div className="flex flex-col flex-grow justify-center items-center gap-3">
    <h1 className="text-2xl md:text-6xl font-bold">404 - Not Found</h1>
    <p className="text-muted-foreground text-xs md:text-base">
      The page you are looking for doesnt exist
    </p>
  </div>
);

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/cart" Component={CartPage} />
        <Route path="*" Component={NotFoundPage} />
      </Routes>
    </MainLayout>
  );
}

export default App;
