import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqs = [
  {
    q: "What is the purity of your peptides?",
    a: "All of our peptides are third-party tested and verified to have >99% purity. Certificates of Analysis are available on our COAs page.",
  },
  {
    q: "How fast do you ship?",
    a: "Most orders ship same or next business day. Standard delivery typically takes 2–5 business days within the US.",
  },
  {
    q: "Are your peptides for human consumption?",
    a: "Our peptides are sold strictly for research and laboratory use only. They are not intended for human consumption.",
  },
  {
    q: "Do you offer bulk or wholesale pricing?",
    a: "Yes, we offer discounted pricing for bulk and wholesale orders. Please contact us for a custom quote.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept major credit cards, cryptocurrency, and bank transfers. All transactions are processed securely.",
  },
  {
    q: "Can I return a product?",
    a: "We accept returns on unopened products within 30 days of purchase. Please contact our support team to initiate a return.",
  },
  {
    q: "How should peptides be stored?",
    a: "Peptides should be stored in a cool, dry place. Reconstituted peptides should be refrigerated and used within the recommended timeframe.",
  },
];

export default function FAQ() {
  return (
    <section className="container max-w-3xl py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="font-heading text-3xl font-bold">Frequently Asked Questions</h1>
        <p className="mt-2 text-muted-foreground">Find answers to common questions about our products and services.</p>

        <Accordion type="single" collapsible className="mt-8">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="text-left font-heading">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </section>
  );
}
