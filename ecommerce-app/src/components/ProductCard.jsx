
import { Link, useNavigate } from "react-router-dom";
import { Star, Heart, ShoppingCart, Minus, Plus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import useWishlistStore from "@/store/wishlistStore";
import useCartStore from "@/store/cartStore";
import useAuthStore from "@/store/authStore";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  const wishlist = useWishlistStore((state) => state.wishlist);
  const toggleWishlist = useWishlistStore(
    (state) => state.toggleWishlist
  );

  const cartItems = useCartStore((state) => state.items);
  const addToCart = useCartStore((state) => state.addToCart);
  const updateQuantity = useCartStore(
    (state) => state.updateQuantity
  );

  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated
  );

  const isWishlisted = wishlist.some(
    (item) => item.id === product.id
  );

  const cartItem = cartItems.find(
    (item) => item.id === product.id
  );

  const quantity = cartItem?.quantity ?? 0;
  

  const handleWishlist = () => {
    toggleWishlist(product);

    if (isWishlisted) {
      toast.success("Product removed from wishlist!");
    } else {
      toast.success("Product added to wishlist!");
    }
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error("Please log in to add products to your cart.");
      navigate("/login");
      return;
    }

    addToCart(product, 1);
    toast.success("Product added to cart!");
  };

  const handleIncrease = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (cartItem) {
      updateQuantity(product.id, quantity + 1);
    } else {
      addToCart(product, 1);
    }
  };
  
  const handleDecrease = () => {
    if (quantity > 0) {
      updateQuantity(product.id, quantity - 1);
     

    }
  };

  return (
    <Card className="flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
  
      <div className="relative">
        <Link
          to={`/products/${product.id}`}
          className="flex h-56 items-center justify-center p-5"
        >
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain"
            loading="lazy"
          />
        </Link>

        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label={
            isWishlisted
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
          title={
            isWishlisted
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
          onClick={handleWishlist}
          className="absolute right-3 top-3 rounded-full border-0 bg-white shadow-none hover:bg-gray-100"
        >
          <Heart
            className={`h-5 w-5 ${
              isWishlisted
                ? "fill-red-500 text-red-500"
                : "text-gray-800"
            }`}
          />
        </Button>
      </div>


      <CardContent className="flex flex-1 flex-col gap-3 p-4">
        <span className="w-fit max-w-full truncate rounded-full bg-gray-100 px-3 py-1 text-xs capitalize text-gray-700">
          {product.category}
        </span>

        <Link
          to={`/products/${product.id}`}
          className="line-clamp-2 min-h-12 font-semibold leading-6 text-gray-900 hover:underline"
        >
          {product.title}
        </Link>

        <div className="flex items-center gap-2 text-sm">
          <div
            className="flex shrink-0 items-center gap-0.5 text-amber-400"
            aria-label={`${product.rating?.rate ?? 0} out of 5 stars`}
          >
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className={`h-5 w-5 ${
                  index < Math.round(product.rating?.rate ?? 0)
                    ? "fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>

          <span className="truncate text-gray-500">
            ({product.rating?.count ?? 0})
          </span>
        </div>

        <p className="mt-auto pt-1 text-xl font-bold text-gray-900">
          ${Number(product.price).toFixed(2)}
        </p>
      </CardContent>


      <CardFooter className="mt-auto p-4 pt-0">
        {!isAuthenticated ? (
          <Button
            type="button"
            onClick={handleAddToCart}
            className="h-11 w-full bg-gray-900 text-white hover:bg-gray-800"
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            Login to Shop
          </Button>
        ) : quantity === 0 ? (
          <Button
            type="button"
            onClick={handleAddToCart}
            className="h-11 w-full bg-gray-900 text-white hover:bg-gray-800"
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            Add to Cart
          </Button>
        ) : (
          <div className="flex h-11 w-full items-center justify-between overflow-hidden rounded-lg border border-gray-300">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={`Decrease quantity of ${product.title}`}
              onClick={handleDecrease}
              className="h-full rounded-none hover:bg-gray-100"
            >
              <Minus className="h-4 w-4" />
            </Button>

            <span
              aria-live="polite"
              aria-label={`Quantity: ${quantity}`}
              className="min-w-8 text-center font-semibold text-gray-900"
            >
              {quantity}
            </span>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={`Increase quantity of ${product.title}`}
              onClick={handleIncrease}
              className="h-full rounded-none hover:bg-gray-100"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
