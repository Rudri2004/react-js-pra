
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default function ProductCard({ product }) {
  return (
    <Card className="flex h-full flex-col overflow-hidden bg-white transition-shadow hover:shadow-lg">
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

        <div className="mt-auto flex items-center gap-1 text-sm text-amber-600">
          <Star className="h-4 w-4 fill-current" />
          <span>{product.rating?.rate ?? "N/A"}</span>
          <span className="text-gray-500">
            ({product.rating?.count ?? 0} reviews)
          </span>
        </div>

        <p className="text-xl font-bold">
          ${Number(product.price).toFixed(2)}
        </p>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Link
  to={`/products/${product.id}`}
  className="inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
>
  View Product
</Link>
      </CardFooter>
    </Card>
  );
}