
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getProductById } from "@/services/productService";
import useCartStore from "@/store/cartStore";
import useAuthStore from "@/store/authStore";

export default function ProductDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const addToCart = useCartStore((state) => state.addToCart);
  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated
  );

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let active = true;

    async function loadProduct() {
      setLoading(true);
      setError("");
      setProduct(null);
      setQuantity(1);
      setMessage("");

      try {
        const data = await getProductById(id);

        if (active) {
          setProduct(data);
        }
      } catch {
        if (active) {
          setError("Unable to load this product. Please try again.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadProduct();

    return () => {
      active = false;
    };
  }, [id]);

  const handleAddToCart = () => {
    setMessage("");

    
    if (!isAuthenticated) {
      navigate("/login", {
        state: {
          from: location.pathname,
          message: "Please sign in to add products to your cart.",
        },
      });
      return;
    }

    addToCart(product, quantity);
    setMessage("Added to your cart!");
  };

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-16">
        <p role="status">Loading product details...</p>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-16">
        <p role="alert" className="text-red-600">
          {error || "Product not found."}
        </p>

        <Link to="/" className="mt-4 inline-block underline">
          Back to products
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Link
        to="/"
        className="mb-8 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to products
      </Link>

      <div className="grid gap-10 rounded-2xl border bg-white p-5 sm:p-8 md:grid-cols-2 md:gap-14">
        <div className="flex min-h-72 items-center justify-center rounded-xl bg-gray-50 p-8">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-96 w-full object-contain"
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-sm capitalize text-gray-500">
            {product.category}
          </p>

          <h1 className="mt-3 text-2xl font-bold sm:text-3xl">
            {product.title}
          </h1>

          <div className="mt-4 flex items-center gap-2 text-amber-600">
            <Star className="h-5 w-5 fill-current" />
            <span>{product.rating?.rate ?? "N/A"}</span>

            <span className="text-sm text-gray-500">
              ({product.rating?.count ?? 0} reviews)
            </span>
          </div>

          <p className="mt-6 text-3xl font-bold">
            ${Number(product.price).toFixed(2)}
          </p>

          <p className="mt-5 leading-7 text-gray-600">
            {product.description}
          </p>

          <div className="mt-8 flex items-center gap-4">
            <label htmlFor="quantity" className="font-medium">
              Quantity
            </label>

            <div className="flex items-center rounded-md border">
              <button
                type="button"
                className="px-4 py-2 hover:bg-gray-100"
                onClick={() =>
                  setQuantity((current) => Math.max(1, current - 1))
                }
                aria-label="Decrease quantity"
              >
                −
              </button>

              <span
                id="quantity"
                className="min-w-10 text-center"
                aria-live="polite"
              >
                {quantity}
              </span>

              <button
                type="button"
                className="px-4 py-2 hover:bg-gray-100"
                onClick={() =>
                  setQuantity((current) => current + 1)
                }
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          <Button
            className="mt-6 w-full"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>

          {message && (
            <p role="status" className="mt-3 text-sm text-green-700">
              {message}{" "}
              <Link to="/cart" className="font-semibold underline">
                View cart
              </Link>
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
