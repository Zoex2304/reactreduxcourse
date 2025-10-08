import CartPage from "./pages/CartPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import NotFoundPage from "./pages/NoutFoundPage,.jsx";

import { MainLayout } from "./layouts/MainLayout.jsx";
import { Route, Routes } from "react-router-dom";
import { AuthLayout } from "./layouts/AuthLayout.jsx";
import LoginPage from './pages/LoginPage.tsx';

function App() {
  return (
    <Routes>
      <Route Component={MainLayout}>
        <Route path="/" Component={HomePage} />
        <Route path="/cart" Component={CartPage} />
        <Route path="*" Component={NotFoundPage} />
      </Route>
    
      <Route Component={AuthLayout}>
        <Route path="/login" Component={LoginPage} />
      </Route>
    </Routes>
  );
}

export default App;
