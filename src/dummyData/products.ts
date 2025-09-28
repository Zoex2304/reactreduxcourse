export interface Product {
  id: number;
  imageUrl: string;
  title: string;
  price: number;
  stock: number;
}

export const products: Product[] = [
  {
    id: 1,
    imageUrl:
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&q=80",
    title: "Classic White Tee",
    price: 150000,
    stock: 25,
  },
  {
    id: 2,
    imageUrl:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&q=80",
    title: "Red Polo Shirt",
    price: 225000,
    stock: 15,
  },
  {
    id: 3,
    imageUrl:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80",
    title: "Heather Grey T-Shirt",
    price: 175000,
    stock: 30,
  },
  {
    id: 4,
    imageUrl:
      "https://i.pinimg.com/1200x/e0/7b/14/e07b14990bb36ecbd5c6c85bc40e8c80.jpg", // URL diperbarui
    title: "Vintage Denim Jacket",
    price: 750000,
    stock: 8,
  },
  {
    id: 5,
    imageUrl:
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500&q=80",
    title: "Black Graphic Hoodie",
    price: 450000,
    stock: 12,
  },
  {
    id: 6,
    imageUrl:
      "https://i.pinimg.com/1200x/ca/55/d7/ca55d79bb85cf03d21e91bf918031ca2.jpg", // URL diperbarui
    title: "Slim-Fit Chino Pants",
    price: 350000,
    stock: 18,
  },
  {
    id: 7,
    imageUrl:
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=500&q=80",
    title: "Linen Short-Sleeve Shirt",
    price: 275000,
    stock: 20,
  },
  {
    id: 8,
    imageUrl:
      "https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?w=500&q=80",
    title: "Grey Knit Beanie",
    price: 120000,
    stock: 0,
  },
  {
    id: 9,
    imageUrl:
      "https://i.pinimg.com/736x/88/f8/0c/88f80cb7fe200c673fd44d92fb6183a6.jpg", // URL diperbarui
    title: "Leather Crossbody Bag",
    price: 650000,
    stock: 7,
  },
  {
    id: 10,
    imageUrl:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
    title: "Red Running Shoes",
    price: 899000,
    stock: 5,
  },
];
