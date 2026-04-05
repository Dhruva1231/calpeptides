import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { ShoppingCart, FileText, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import labResearch1 from "@/assets/lab-research-1.jpg";
import labResearch2 from "@/assets/lab-research-2.jpg";
import labVials from "@/assets/lab-vials.png";
import productGhkCu from "@/assets/product-ghk-cu.png";
import productGlp3Rt from "@/assets/product-glp3-rt.png";
import productBpc157 from "@/assets/product-bpc-157.png";
import lifestyleGlp3Rt from "@/assets/product-glp3-rt-lifestyle.png";
import lifestyleGhkCu from "@/assets/product-ghk-cu-lifestyle.png";
import { ProductDetailModal } from "@/components/ProductDetailModal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import heroBg from "@/assets/hero-bg.jpg";
import bannerImg from "@/assets/banner.png";

const peptides = [
  {
    id: 1, name: "BPC-157", price: 39.99, inStock: true, image: productBpc157,
    description: "BPC-157 is a synthetic peptide derived from a protective protein found in the stomach. Widely studied for its regenerative properties in research settings.",
    sizes: ["5mg", "10mg", "20mg"],
    testResult: { purity: "99.3%", date: "2024-12-15", lab: "Janssen Analytics" },
  },
  {
    id: 2, name: "TB-500", price: 44.99, inStock: true, image: null,
    description: "TB-500 is a synthetic fraction of Thymosin Beta-4. Investigated in research for its role in tissue repair and cell migration.",
    sizes: ["5mg", "10mg"],
    testResult: { purity: "99.1%", date: "2024-12-10", lab: "Janssen Analytics" },
  },
  {
    id: 3, name: "GHK-Cu", price: 34.99, inStock: true, image: productGhkCu,
    description: "GHK-Cu is a naturally occurring copper complex. Extensively researched for wound healing and skin remodeling applications.",
    sizes: ["5mg", "10mg", "20mg"],
    testResult: { purity: "99.5%", date: "2024-11-28", lab: "Novatek Labs" },
  },
  {
    id: 4, name: "Ipamorelin", price: 49.99, inStock: false, image: null,
    description: "Ipamorelin is a selective growth hormone secretagogue studied for its targeted approach to growth hormone release.",
    sizes: ["5mg", "10mg"],
    testResult: undefined,
  },
  {
    id: 5, name: "CJC-1295", price: 54.99, inStock: true, image: null,
    description: "CJC-1295 is a synthetic analogue of growth hormone-releasing hormone (GHRH) researched for sustained GH elevation.",
    sizes: ["5mg", "10mg"],
    testResult: { purity: "99.2%", date: "2024-11-20", lab: "Novatek Labs" },
  },
  {
    id: 6, name: "Sermorelin", price: 42.99, inStock: true, image: null,
    description: "Sermorelin is a growth hormone-releasing hormone analogue used in research to stimulate pituitary GH secretion.",
    sizes: ["5mg", "10mg", "15mg"],
    testResult: { purity: "99.4%", date: "2024-11-15", lab: "Janssen Analytics" },
  },
  {
    id: 7, name: "PT-141", price: 47.99, inStock: true, image: null,
    description: "PT-141 (Bremelanotide) is a melanocortin receptor agonist studied for its effects on the central nervous system.",
    sizes: ["5mg", "10mg"],
    testResult: { purity: "99.0%", date: "2024-11-01", lab: "Novatek Labs" },
  },
  {
    id: 8, name: "GLP-3 RT", price: 59.99, inStock: true, image: productGlp3Rt,
    description: "GLP-3 RT is a research-grade peptide compound studied for its role in gastrointestinal research applications.",
    sizes: ["5mg", "10mg", "20mg"],
    testResult: undefined,
  },
  {
    id: 9, name: "Selank", price: 36.99, inStock: true, image: null,
    description: "Selank is a synthetic analogue of the immunomodulatory peptide tuftsin, studied for anxiolytic and nootropic properties.",
    sizes: ["5mg", "10mg"],
    testResult: undefined,
  },
];

const coaResults = [
  { peptide: "BPC-157", purity: "99.3%", date: "2024-12-15", lab: "Janssen Analytics" },
  { peptide: "TB-500", purity: "99.1%", date: "2024-12-10", lab: "Janssen Analytics" },
  { peptide: "GHK-Cu", purity: "99.5%", date: "2024-11-28", lab: "Novatek Labs" },
  { peptide: "CJC-1295", purity: "99.2%", date: "2024-11-20", lab: "Novatek Labs" },
  { peptide: "Sermorelin", purity: "99.4%", date: "2024-11-15", lab: "Janssen Analytics" },
  { peptide: "PT-141", purity: "99.0%", date: "2024-11-01", lab: "Novatek Labs" },
];

const faqs = [
  { q: "What is the purity of your peptides?", a: "All of our peptides are third-party tested and verified to have >99% purity. Certificates of Analysis are available on our COAs page." },
  { q: "How fast do you ship?", a: "Most orders ship same or next business day. Standard delivery typically takes 2–5 business days within the US." },
  { q: "Are your peptides for human consumption?", a: "Our peptides are sold strictly for research and laboratory use only. They are not intended for human consumption." },
  { q: "Do you offer bulk or wholesale pricing?", a: "Yes, we offer discounted pricing for bulk and wholesale orders. Please contact us for a custom quote." },
  { q: "What payment methods do you accept?", a: "We accept major credit cards, cryptocurrency, and bank transfers. All transactions are processed securely." },
  { q: "Can I return a product?", a: "We accept returns on unopened products within 30 days of purchase. Please contact our support team to initiate a return." },
  { q: "How should peptides be stored?", a: "Peptides should be stored in a cool, dry place. Reconstituted peptides should be refrigerated and used within the recommended timeframe." },
];

export default function Home() {
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [showInStock, setShowInStock] = useState(true);
  const [showOutOfStock, setShowOutOfStock] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<typeof peptides[0] | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = peptides.filter((p) => {
    if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
    if (!showInStock && p.inStock) return false;
    if (!showOutOfStock && !p.inStock) return false;
    return true;
  });

  const openProduct = (p: typeof peptides[0]) => {
    setSelectedProduct(p);
    setModalOpen(true);
  };

  const getProductImages = (p: typeof peptides[0]) => {
    const images: { src: string; alt: string }[] = [];
    if (p.image) images.push({ src: p.image, alt: p.name });
    if (p.name === "GHK-Cu") {
      images.push({ src: lifestyleGhkCu, alt: "GHK-Cu lifestyle" });
    }
    if (p.name === "GLP-3 RT") {
      images.push({ src: lifestyleGlp3Rt, alt: "GLP-3 RT lifestyle" });
    }
    if (images.length === 0) images.push({ src: "", alt: p.name });
    return images;
  };

  const modalProduct = selectedProduct ? {
    name: selectedProduct.name,
    price: selectedProduct.price,
    inStock: selectedProduct.inStock,
    description: selectedProduct.description,
    sizes: selectedProduct.sizes,
    images: getProductImages(selectedProduct),
    testResult: selectedProduct.testResult,
  } : null;

  return (
    <>
      {/* Hero */}
      <section
        id="home"
        className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-white"
      >
        <img
          src={heroBg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="relative z-10 container text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-heading text-5xl font-bold tracking-tight text-primary sm:text-6xl lg:text-7xl"
          >
            CAL PEPTIDES
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mx-auto mt-4 max-w-lg text-xl font-medium text-secondary sm:text-2xl"
          >
            High Quality, Lab Tested, Research Peptides
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground"
          >
            All products sold by CAL Peptides are for research and laboratory use only. They are not intended for human consumption, medical treatment, or diagnostic applications. We supply these compounds exclusively to qualified researchers, institutions, and laboratories conducting scientific work.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-8"
          >
            <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold">
              <a href="#shop">Shop Now</a>
            </Button>
          </motion.div>
        </div>
      </section>

      <hr className="border-t border-border" />

      {/* About */}
      <section id="about" className="container py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="font-heading text-3xl font-bold sm:text-4xl">
                Premium Peptides You Can <span className="text-secondary">Trust</span>
              </h2>
              <p className="mt-6 leading-relaxed text-muted-foreground">
                CAL Peptides supplies research-grade peptides with full third-party testing and transparent results. Each compound is independently analyzed for identity and purity, and we publish those findings for every product. We're based in the U.S. and ship fast, serving university labs, private facilities, and independent researchers who need reliable quality at competitive prices.
              </p>
            </div>
            <div className="overflow-hidden rounded-lg shadow-lg">
              <img src={lifestyleGlp3Rt} alt="CAL Peptides GLP-3 RT vials in laboratory" className="h-full w-full object-cover" width={1280} height={720} />
            </div>
          </div>

          <div className="mt-16">
            <h3 className="font-heading text-2xl font-semibold">Our Mission</h3>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              CAL Peptides supplies research-grade peptides to simplify the self-improvement space.
              We've designed curated bundles that lower the barrier to entry — no guesswork, no confusion
              about where to start. Each compound is purity-tested to meet rigorous standards, giving you
              confidence in what you're using. We ship fast (most orders same or next day) and keep pricing
              competitive, so quality research peptides are accessible to more people.
            </p>
          </div>
        </motion.div>
      </section>

      <hr className="border-t border-border" />

      {/* Shop */}
      <section id="shop" className="bg-muted/40 py-20">
        <div className="container">
          <h2 className="font-heading text-3xl font-bold">Shop Peptides</h2>
          <div className="mt-8 flex flex-col gap-8 lg:flex-row">
            <aside className="w-full shrink-0 space-y-6 rounded-lg border bg-card p-5 lg:w-64">
              <div>
                <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-muted-foreground">Price Range</h3>
                <Slider min={0} max={100} step={1} value={priceRange} onValueChange={setPriceRange} className="mt-4" />
                <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
              <div>
                <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-muted-foreground">Availability</h3>
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
            <div className="flex-1">
              {filtered.length === 0 ? (
                <p className="text-muted-foreground">No products match your filters.</p>
              ) : (
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {filtered.map((p, i) => (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                      onClick={() => openProduct(p)}
                      className="group cursor-pointer rounded-lg border bg-card p-5 transition-all hover:shadow-lg hover:border-primary/30"
                    >
                      <div className="mb-4 flex h-40 items-center justify-center rounded bg-muted overflow-hidden">
                        {p.image ? (
                          <img src={p.image} alt={p.name} className="h-full w-full object-contain p-2 transition-transform group-hover:scale-105" />
                        ) : (
                          <span className="font-heading text-2xl font-bold text-muted-foreground/40">{p.name}</span>
                        )}
                      </div>
                      <h3 className="font-heading font-semibold">{p.name}</h3>
                      <div className="mt-1 flex items-center justify-between">
                        <span className="text-lg font-bold text-primary">${p.price.toFixed(2)}</span>
                        <span className={`text-xs font-medium ${p.inStock ? "text-secondary-foreground" : "text-destructive"}`}>
                          {p.inStock ? "In Stock" : "Out of Stock"}
                        </span>
                      </div>
                      <Button size="sm" className="mt-3 w-full bg-primary text-primary-foreground hover:bg-primary/90" disabled={!p.inStock}
                        onClick={(e) => { e.stopPropagation(); openProduct(p); }}
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <hr className="border-t border-border" />

      {/* COAs */}
      <section id="coas" className="container py-20">
        <h2 className="font-heading text-3xl font-bold">COAs & Test Results</h2>
        <p className="mt-2 text-muted-foreground">
          Every batch is independently tested by accredited third-party laboratories.
        </p>
        <div className="mt-8 overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <thead className="bg-primary text-primary-foreground">
              <tr>
                <th className="px-4 py-3 text-left font-heading font-semibold">Peptide</th>
                <th className="px-4 py-3 text-left font-heading font-semibold">Purity</th>
                <th className="px-4 py-3 text-left font-heading font-semibold">Test Date</th>
                <th className="px-4 py-3 text-left font-heading font-semibold">Laboratory</th>
                <th className="px-4 py-3 text-left font-heading font-semibold">COA</th>
              </tr>
            </thead>
            <tbody>
              {coaResults.map((r, i) => (
                <motion.tr
                  key={r.peptide}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="border-t transition-colors hover:bg-muted/50"
                >
                  <td className="px-4 py-3 font-medium">{r.peptide}</td>
                  <td className="px-4 py-3 font-semibold text-primary">{r.purity}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.date}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.lab}</td>
                  <td className="px-4 py-3">
                    <button className="inline-flex items-center gap-1 text-primary hover:underline">
                      <FileText className="h-4 w-4" />
                      View
                      <ExternalLink className="h-3 w-3" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <hr className="border-t border-border" />

      {/* FAQ */}
      <section id="faq" className="bg-muted/40 py-20">
        <div className="container max-w-3xl">
          <h2 className="font-heading text-3xl font-bold">Frequently Asked Questions</h2>
          <p className="mt-2 text-muted-foreground">Find answers to common questions about our products and services.</p>
          <Accordion type="single" collapsible className="mt-8">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left font-heading">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <ProductDetailModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        product={modalProduct}
      />
    </>
  );
}
