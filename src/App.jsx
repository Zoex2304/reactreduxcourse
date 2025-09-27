import { Box } from "./components/Box.jsx";
import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";
import { ProductCard } from "./components/internal/ProductCard.jsx";
function App() {
  return (
    <>
      <Header />
      <main className="min-h-[80vh] max-w-screen-md mx-auto px-4 mt-8">
        <div className="mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Become a trend-setter with us.
          </h1>
          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
            FastCampusCommerce provides you with the finest clothings and
            ensures your confidence throuasd ghout your days.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-4">
          <ProductCard
            imageUrl="https://i.pinimg.com/736x/9f/92/8b/9f928be98e533aee756028fd42066070.jpg"
            price="Rp 20.000"
            stock={23}
            tittle="t shirt gaul"
          />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
