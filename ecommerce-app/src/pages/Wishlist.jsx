
import { Link } from "react-router-dom";
import { Heart, Trash2, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import useWishlistStore from "@/store/wishlistStore";
import useCartStore from "@/store/cartStore";

export default function Wishlist() {
  const wishlist = useWishlistStore((state) => state.wishlist);
  const removeFromWishlist = useWishlistStore(
    (state) => state.removeFromWishlist
  );

  const addToCart = useCartStore((state) => state.addToCart);

  const handleMoveToCart = (product) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center gap-3">
        <Heart className="h-7 w-7 text-red-500" />

        <h1 className="text-3xl font-bold">My Wishlist</h1>

        <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium">
          {wishlist.length} items
        </span>
      </div>

      {wishlist.length === 0 ? (
        <div className="rounded-lg border border-dashed p-10 text-center">
          <Heart className="mx-auto mb-4 h-12 w-12 text-gray-400" />

          <h2 className="text-xl font-semibold">
            Your wishlist is empty
          </h2>

          <p className="mt-2 text-gray-500">
            Save products you love and find them here later.
          </p>

          <Link
            to="/"
            className="mt-6 inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Explore Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {wishlist.map((product) => (
            <Card
              key={product.id}
              className="flex h-full flex-col overflow-hidden bg-white"
            >
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

              <CardContent className="flex flex-1 flex-col gap-3 p-4">
                <p className="text-xs capitalize text-gray-500">
                  {product.category}
                </p>

                <Link
                  to={`/products/${product.id}`}
                  className="line-clamp-2 font-semibold hover:underline"
                >
                  {product.title}
                </Link>

                <p className="mt-auto text-xl font-bold">
                  ${Number(product.price).toFixed(2)}
                </p>
              </CardContent>

              <CardFooter className="flex flex-col gap-2 p-4 pt-0">
                <Button
                  type="button"
                  className="w-full"
                  onClick={() => handleMoveToCart(product)}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Move to Cart
                </Button>

                <div className="flex w-full gap-2">
                  <Link
                    to={`/products/${product.id}`}
                    className="inline-flex h-10 flex-1 items-center justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-100"
                  >
                    View Product
                  </Link>

                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    aria-label="Remove from wishlist"
                    title="Remove from wishlist"
                    onClick={() => removeFromWishlist(product.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
