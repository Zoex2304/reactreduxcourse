import { ProductList } from '../components/internal/ProductList,.js';


const HomePage = () => {
  return (
    <>
      <div className="mx-auto text-center flex flex-col items-center max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Become a trend-setter with us.
        </h1>
        <p className="mt-6 text-lg max-w-prose text-muted-foreground">
          FastCampusCommerce provides you with the finest clothings and ensures
          your confidence throuasd ghout your days.
        </p>
      </div>
      <ProductList/>
    </>
  );
};

export default HomePage;
