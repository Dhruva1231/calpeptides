import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

const peptides = [
  { id: 1, name: "BPC-157", price: 39.99, inStock: true },
  { id: 2, name: "TB-500", price: 44.99, inStock: true },
  { id: 3, name: "GHK-Cu", price: 34.99, inStock: true },
  { id: 4, name: "Ipamorelin", price: 49.99, inStock: false },
  { id: 5, name: "CJC-1295", price: 54.99, inStock: true },
  { id: 6, name: "Sermorelin", price: 42.99, inStock: true },
  { id: 7, name: "PT-141", price: 47.99, inStock: true },
  { id: 8, name: "Epithalon", price: 59.99, inStock: false },
  { id: 9, name: "Selank", price: 36.99, inStock: true },
];

export default function Shop() {
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [showInStock, setShowInStock] = useState(true);
  const [showOutOfStock, setShowOutOfStock] = useState(true);

  const filtered = peptides.filter((p) => {
    if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
    if (!showInStock && p.inStock) return false;
    if (!showOutOfStock && !p.inStock) return false;
    return true;
  });

  return (
    <div className="container py-10">
      <h1 className="font-heading text-3xl font-bold">Shop Peptides</h1>
      <div className="mt-8 flex flex-col gap-8 lg:flex-row">
        {/* Sidebar */}
        <aside className="w-full shrink-0 space-y-6 rounded-lg border bg-card p-5 lg:w-64">
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Price Range
            </h3>
            <Slider
              min={0}
              max={100}
              step={1}
              value={priceRange}
              onValueChange={setPriceRange}
              className="mt-4"
            />
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Availability
            </h3>
            <label className="mt-3 flex items-center gap-2 text-sm">
              <Checkbox checked={showInStock} onCheckedChange={(v) => setShowInStock(!!v)} />
              In Stock
            </label>
            <label className="mt-2 flex items-center gap-2 text-sm">
              <Checkbox checked={showOutOfStock} onCheckedChange={(v) => setShowOutOfStock(!!v)} />
              Out of Stock
            </label>
          </div>
        </aside>

        {/* Grid */}
        <div className="flex-1">
          {filtered.length === 0 ? (
            <p className="text-muted-foreground">No products match your filters.</p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="group rounded-lg border bg-card p-5 transition-shadow hover:shadow-md"
                >
                  <div className="mb-4 flex h-32 items-center justify-center rounded bg-muted">
                    <span className="font-heading text-2xl font-bold text-muted-foreground/40">{p.name}</span>
                  </div>
                  <h3 className="font-heading font-semibold">{p.name}</h3>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-lg font-bold text-secondary">${p.price.toFixed(2)}</span>
                    <span className={`text-xs font-medium ${p.inStock ? "text-secondary" : "text-destructive"}`}>
                      {p.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                  <Button
                    size="sm"
                    className="mt-3 w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
                    disabled={!p.inStock}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
