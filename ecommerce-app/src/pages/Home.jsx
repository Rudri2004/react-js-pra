
import { useEffect, useMemo, useState } from "react";
import {
  Search,
  RefreshCw,
  ArrowUpDown,
  SlidersHorizontal,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProductCard from "@/components/ProductCard";

import {
  getProducts,
  getCategories,
} from "@/services/productService";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [maxPrice, setMaxPrice] = useState(1000);
  const [appliedPrice, setAppliedPrice] = useState(1000);
  const [minRating, setMinRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadProducts() {
    setLoading(true);
    setError("");

    try {
      const [productData, categoryData] = await Promise.all([
        getProducts(),
        getCategories(),
      ]);

      setProducts(productData);
      setCategories(categoryData);
    } catch (err) {
      setError(err.message || "Unable to load products.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(search.trim().toLowerCase());

      const matchesCategory =
        category === "all" || product.category === category;

      const matchesPrice =
        Number(product.price) <= appliedPrice;

      const matchesRating =
        Number(product.rating?.rate ?? 0) >= minRating;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPrice &&
        matchesRating
      );
    });

    if (sortBy === "price-low") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      result = [...result].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    }

    return result;
  }, [
    products,
    search,
    category,
    sortBy,
    appliedPrice,
    minRating,
  ]);

  const resetFilters = () => {
    setSearch("");
    setCategory("all");
    setSortBy("default");
    setMaxPrice(1000);
    setAppliedPrice(1000);
    setMinRating(0);
  };

  
return (
  
  <main className="min-h-screen bg-gray-50">
    <div className="w-full px-8 py-6 sm:px-10 lg:px-12 xl:px-16">
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[300px_minmax(0,1fr)] xl:gap-8">


     
   
       <aside className="sticky top-24 self-start max-h-[calc(100vh-7rem)] w-full overflow-y-auto overscroll-contain rounded-xl border border-gray-200 bg-white p-5 shadow-sm">            <div className="mb-5 flex items-center gap-2">
              <SlidersHorizontal className="h-5 w-5" />
              <h2 className="text-xl font-bold">Filters</h2>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={resetFilters}
            >
              Clear All
            </Button>

        
            <div className="mt-8">
              <h3 className="mb-4 text-lg font-semibold">
                Categories
              </h3>

              <div className="space-y-3">
                {categories.map((item) => (
                  <label
                    key={item}
                    className="flex cursor-pointer items-center gap-3 text-sm capitalize text-gray-700"
                  >
                    <input
                      type="checkbox"
                      checked={category === item}
                      onChange={() =>
                        setCategory(
                          category === item ? "all" : item
                        )
                      }
                      className="h-4 w-4 accent-black"
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="my-7 border-t border-gray-200" />

           
            <div>
              <h3 className="mb-4 text-lg font-semibold">
                Price Range
              </h3>

              <input
                type="range"
                min="0"
                max="1000"
                step="10"
                value={maxPrice}
                onChange={(event) =>
                  setMaxPrice(Number(event.target.value))
                }
                aria-label="Maximum product price"
                className="w-full cursor-pointer accent-black"
              />

              <div className="mt-2 flex justify-between text-sm text-gray-500">
                <span>$0</span>
                <span>${maxPrice}</span>
              </div>

              <Button
                type="button"
                variant="outline"
                className="mt-5 w-full"
                onClick={() => setAppliedPrice(maxPrice)}
              >
                Apply Price Filter
              </Button>
            </div>

            <div className="my-7 border-t border-gray-200" />

         
            <div>
              <h3 className="mb-4 text-lg font-semibold">
                Minimum Rating
              </h3>

              <div className="space-y-3">
                {[4, 3, 2, 1].map((rating) => (
                  <label
                    key={rating}
                    className="flex cursor-pointer items-center gap-3 text-sm text-gray-700"
                  >
                    <input
                      type="checkbox"
                      checked={minRating === rating}
                      onChange={() =>
                        setMinRating(
                          minRating === rating ? 0 : rating
                        )
                      }
                      className="h-4 w-4 accent-black"
                    />

                    <span className="tracking-wide text-amber-400">
                      {"★".repeat(rating)}
                      <span className="text-gray-300">
                        {"★".repeat(5 - rating)}
                      </span>
                    </span>

                    <span>{rating}+ Stars</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

        
          <section className="min-w-0">
          
            <div className="mb-7 flex flex-col gap-4 sm:flex-row">
              <div className="relative min-w-0 flex-1">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                <Input
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search products..."
                  aria-label="Search products"
                  className="h-12 w-full rounded-xl border-gray-200 bg-white pl-12"
                />
              </div>

              <div className="relative sm:w-52">
                <ArrowUpDown className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                <select
                  value={sortBy}
                  onChange={(event) =>
                    setSortBy(event.target.value)
                  }
                  aria-label="Sort products"
                  className="h-12 w-full appearance-none rounded-xl border border-gray-200 bg-white pl-10 pr-9 text-sm outline-none focus:ring-2 focus:ring-gray-300"
                >
                  <option value="default">Default</option>
                  <option value="price-low">
                    Price: Low to High
                  </option>
                  <option value="price-high">
                    Price: High to Low
                  </option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>
            </div>

            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <p className="text-gray-500">
                {loading
                  ? "Loading products..."
                  : `${filteredProducts.length} products found`}
              </p>

              <Button
                type="button"
                variant="outline"
                onClick={resetFilters}
                className="lg:hidden"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset Filters
              </Button>
            </div>

          
            {loading && (
              <div
                role="status"
                className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
              >
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-[430px] animate-pulse rounded-2xl bg-gray-200"
                  />
                ))}
                <span className="sr-only">
                  Loading products
                </span>
              </div>
            )}

    
            {!loading && error && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center">
                <p className="font-semibold text-red-700">
                  {error}
                </p>

                <Button
                  onClick={loadProducts}
                  className="mt-4"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
              </div>
            )}

           
            {!loading &&
              !error &&
              filteredProducts.length === 0 && (
                <div className="rounded-xl border bg-white px-6 py-16 text-center">
                  <h3 className="text-lg font-semibold">
                    No products found
                  </h3>

                  <p className="mt-2 text-gray-500">
                    Try changing your search or filters.
                  </p>

                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={resetFilters}
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}

           
            {!loading &&
              !error &&
              filteredProducts.length > 0 && (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                    />
                  ))}
                </div>
              )}
          </section>
        </div>
      </div>
    </main>
  );
}
