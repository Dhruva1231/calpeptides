import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ShoppingCart, FileText, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProductImage {
  src: string;
  alt: string;
}

interface TestResult {
  purity: string;
  date: string;
  lab: string;
}

interface ProductDetailProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: {
    name: string;
    price: number;
    inStock: boolean;
    images: ProductImage[];
    sizes: string[];
    description: string;
    testResult?: TestResult;
  } | null;
}

export function ProductDetailModal({ open, onOpenChange, product }: ProductDetailProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  if (!product) return null;

  const hasMultipleImages = product.images.length > 1;

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % product.images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length);

  return (
    <Dialog open={open} onOpenChange={(v) => { onOpenChange(v); setCurrentImage(0); setSelectedSize(null); }}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden">
        <DialogTitle className="sr-only">{product.name}</DialogTitle>
        <div className="grid md:grid-cols-2">
          {/* Image Gallery */}
          <div className="relative bg-muted flex items-center justify-center min-h-[300px] md:min-h-[450px]">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImage}
                src={product.images[currentImage]?.src}
                alt={product.images[currentImage]?.alt}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="h-full w-full object-contain p-6"
              />
            </AnimatePresence>
            {hasMultipleImages && (
              <>
                <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1.5 shadow hover:bg-white">
                  <ChevronLeft className="h-5 w-5 text-primary" />
                </button>
                <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1.5 shadow hover:bg-white">
                  <ChevronRight className="h-5 w-5 text-primary" />
                </button>
              </>
            )}
            {hasMultipleImages && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {product.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={`h-2 w-2 rounded-full transition-colors ${i === currentImage ? "bg-primary" : "bg-primary/30"}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="p-6 flex flex-col">
            <h2 className="font-heading text-2xl font-bold">{product.name}</h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{product.description}</p>

            <div className="mt-4 flex items-center gap-3">
              <span className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</span>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${product.inStock ? "bg-secondary/20 text-secondary-foreground" : "bg-destructive/10 text-destructive"}`}>
                {product.inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            {/* Size Selection */}
            <div className="mt-5">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Size</h4>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`rounded-md border px-4 py-2 text-sm font-medium transition-colors ${
                      selectedSize === size
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-foreground hover:border-primary/50"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Test Results */}
            {product.testResult && (
              <div className="mt-5 rounded-lg border bg-muted/50 p-4">
                <h4 className="flex items-center gap-2 text-sm font-semibold">
                  <FileText className="h-4 w-4 text-primary" />
                  Test Results
                </h4>
                <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <span className="text-muted-foreground">Purity</span>
                    <p className="font-bold text-primary">{product.testResult.purity}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Date</span>
                    <p className="font-medium">{product.testResult.date}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Lab</span>
                    <p className="font-medium">{product.testResult.lab}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-auto pt-5">
              <Button
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={!product.inStock || !selectedSize}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                {!selectedSize ? "Select a Size" : "Add to Cart"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
