interface ProductCardProps {
  imageUrl: string;
  tittle: string;
  price: number;
  stock: number;
  test: string;
}

tahap pertama
tahap kedua
ini adalah experiment deatched
export const ProductCard = ({
  imageUrl = "https://i.pinimg.com/736x/90/ff/78/90ff78c5ed21a770ec1ba1d4eb722b27.jpg",
  tittle = "Dark blue t-shirt",
  price = 100000,
  stock = 10,
} : ProductCardProps) => {
  return (
    <div className="p-4 border rounded-md md:max-w-96  flex flex-col gap-4">
      <div className="aspect-square w-full overvlow-hidden">
        <img
          src={imageUrl}
          alt="example product"
        />
      </div>

      <div>
        <p className="text-md ">{tittle}</p>
        <p className="text-md text-xl">{price}</p>
        <p className="text-muted-foreground text-sm">{stock}</p>
      </div>
    </div>
  );
};
