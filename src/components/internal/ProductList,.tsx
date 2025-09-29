import { products } from '../../dummyData/products.js';
import { ProductCard } from './ProductCard.js';


export const ProductList = () => {
  return (
    <div className="mt-20 grid grid-cols-2 gap-6  lg:grid-cols-3 xl:grid-cols-4">
      {products.map(({ id, ...productProps }) => (
        // Menggunakan key={id} dari destructuring sebelumnya
        <ProductCard key={id} {...productProps} />
      ))}
    </div>
  );
};
