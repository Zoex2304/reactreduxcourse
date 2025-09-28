import { title } from "process";
import { useState } from "react";
import { formatCurrency } from "../../utils/formatter.js";
import { Button } from "../ui/button.jsx";
import { Minus, Plus } from "lucide-react";
import { Input } from "../ui/input.jsx";

interface ProductCardProps {
  id?: number;
  imageUrl?: string;
  title?: string;
  price?: number;
  stock?: number;
}


export const ProductCard = ({
  imageUrl = "https://i.pinimg.com/736x/90/ff/78/90ff78c5ed21a770ec1ba1d4eb722b27.jpg",
  title = "Dark Blue T-Shirt",
  price = 20000,
  stock = 10,
}: ProductCardProps) => {
  const [quantity, setQuantity] = useState(0);

  const increaseQuantity = () => {
    setQuantity((prevVal) => Math.min(prevVal + 1, stock));
  };

  const decreaseQuantity = () => {
    setQuantity((prevVal) => Math.max(prevVal - 1, 0));
  };

  const handleDirectChangeQuantity = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const val = e.target.value;
    const sanitizedVal = val.replace(/[^0-9]/g, "");
    if (!sanitizedVal) {
      setQuantity(0);
      return;
    }
    let numVal = parseInt(sanitizedVal);
    if (numVal > stock) numVal = stock;
    setQuantity(numVal);
  };

  const addToCart = () => {
    if (quantity === 0) {
      setQuantity(1);
    }

    alert(
      `${
        quantity === 0 ? quantity + 1 : quantity
      } product of ${title} added to cart`
    );
  };

  return (
    <div className="border border-gray-300 text-card-foreground rounded-lg overflow-hidden flex flex-col text-sm">
      {/* image product */}
      <div className="aspect-square w-full overflow-hidden">
        <img
          src={imageUrl}
          alt="product card"
          className="object-cover size-full "
        />
      </div>

      {/* action product */}
      <div className="p-3 flex flex-col flex-grow">
        {/* detail product */}
        <div className="flex-grow mb-3 space-y-1">
          <h3 className="font-semibold md:text-base truncate leading-tight">
            {title}
          </h3>
          <p className="font-bold text-base md:text-lg">
            {formatCurrency(price)}
          </p>
          <p className="text-xs text-muted-foreground">In stock {stock}</p>
        </div>

        {/* quantity changer */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          {/* plus minus icon */}
          <div className="flex items-center justify-center gap-2 ">
            <Button
              variant="outline"
              size="icon"
              className="size-8 shrink-0"
              onClick={decreaseQuantity}
              disabled={quantity <= 0 || stock === 0}
            >
              <Minus className="size-4" />
            </Button>

            <Input
              type="text"
              inputMode="numeric"
              pattern="[0-9]"
              value={stock > 0 ? quantity : 0}
              onChange={handleDirectChangeQuantity}
              disabled={stock === 0}
              className="font-semibold w-10 text-center text-base"
            />

            <Button
              variant="outline"
              size="icon"
              className="size-8 shrink-0"
              onClick={increaseQuantity}
              disabled={quantity >= stock || stock === 0}
            >
              <Plus className="size-4" />
            </Button>
          </div>
          {/* add to chart button */}
          <Button
            className="w-full sm:w-auto sm:flex-grow text-xs h-8"
            disabled={stock === 0}
            onClick={addToCart}
          >
            {stock > 0 ? "Add to cart" : "Out of Stock"}
          </Button>
        </div>
      </div>
    </div>
  );
};
