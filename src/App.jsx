import { Box } from "./components/Box.jsx";
import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";
import { ProductCard } from "./components/internal/ProductCard.jsx";
import { products } from "./dummyData/products.js";
function App() {
  return (
    <>
      <Header />
      <main className="min-h-[80vh] max-w-screen-xl mx-auto px-4 mt-8">
        <div className="mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Become a trend-setter with us.
          </h1>
          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
            FastCampusCommerce provides you with the finest clothings and
            ensures your confidence throuasd ghout your days.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-6  lg:grid-cols-3 xl:grid-cols-4">
          {products.map(({ id, ...productProps }) => (
            // Menggunakan key={id} dari destructuring sebelumnya
            <ProductCard key={id} {...productProps} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
