import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="container max-w-3xl py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="font-heading text-3xl font-bold sm:text-4xl">
          Premium Peptides You Can <span className="text-secondary">Trust</span>
        </h1>
        <p className="mt-6 leading-relaxed text-muted-foreground">
          Certified Peptides supplies research-grade peptides to laboratories and institutions nationwide.
          Each compound is purity-tested to meet rigorous quality standards. We ship most orders same or
          next day, and our pricing remains competitive without compromising quality.
        </p>

        <h2 className="mt-12 font-heading text-2xl font-semibold">Our Mission</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Certified Peptides supplies research-grade peptides to simplify the self-improvement space.
          We've designed curated bundles that lower the barrier to entry — no guesswork, no confusion
          about where to start. Each compound is purity-tested to meet rigorous standards, giving you
          confidence in what you're using. We ship fast (most orders same or next day) and keep pricing
          competitive, so quality research peptides are accessible to more people.
        </p>
      </motion.div>
    </section>
  );
}
