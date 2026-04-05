import { FileText, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const results = [
  { peptide: "BPC-157", purity: "99.3%", date: "2024-12-15", lab: "Janssen Analytics" },
  { peptide: "TB-500", purity: "99.1%", date: "2024-12-10", lab: "Janssen Analytics" },
  { peptide: "GHK-Cu", purity: "99.5%", date: "2024-11-28", lab: "Novatek Labs" },
  { peptide: "CJC-1295", purity: "99.2%", date: "2024-11-20", lab: "Novatek Labs" },
  { peptide: "Sermorelin", purity: "99.4%", date: "2024-11-15", lab: "Janssen Analytics" },
  { peptide: "PT-141", purity: "99.0%", date: "2024-11-01", lab: "Novatek Labs" },
];

export default function COAs() {
  return (
    <section className="container py-16">
      <h1 className="font-heading text-3xl font-bold">COAs & Test Results</h1>
      <p className="mt-2 text-muted-foreground">
        Every batch is independently tested by accredited third-party laboratories.
      </p>

      <div className="mt-8 overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-3 text-left font-heading font-semibold">Peptide</th>
              <th className="px-4 py-3 text-left font-heading font-semibold">Purity</th>
              <th className="px-4 py-3 text-left font-heading font-semibold">Test Date</th>
              <th className="px-4 py-3 text-left font-heading font-semibold">Laboratory</th>
              <th className="px-4 py-3 text-left font-heading font-semibold">COA</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r, i) => (
              <motion.tr
                key={r.peptide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="border-t transition-colors hover:bg-muted/50"
              >
                <td className="px-4 py-3 font-medium">{r.peptide}</td>
                <td className="px-4 py-3 font-semibold text-secondary">{r.purity}</td>
                <td className="px-4 py-3 text-muted-foreground">{r.date}</td>
                <td className="px-4 py-3 text-muted-foreground">{r.lab}</td>
                <td className="px-4 py-3">
                  <button className="inline-flex items-center gap-1 text-secondary hover:underline">
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
  );
}
