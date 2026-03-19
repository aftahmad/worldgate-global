import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Star } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import BookingModal from "../components/BookingModal";
import { useGetTestimonials } from "../hooks/useQueries";

const STAR_INDICES = [0, 1, 2, 3, 4];
const SKELETON_INDICES = [0, 1, 2, 3, 4, 5];

export default function Testimonials() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const { data: testimonials = [], isLoading } = useGetTestimonials();

  return (
    <div className="pt-20">
      <div className="bg-navy py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">
              Success Stories
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mt-3 mb-4">
              Client Testimonials
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Real stories from real clients who achieved their international
              dreams with WorldGate Global.
            </p>
          </motion.div>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              data-ocid="testimonials.loading_state"
            >
              {SKELETON_INDICES.map((n) => (
                <Skeleton key={n} className="h-52 rounded-2xl" />
              ))}
            </div>
          ) : testimonials.length === 0 ? (
            <div
              className="text-center py-20 text-muted-foreground"
              data-ocid="testimonials.empty_state"
            >
              No testimonials yet. Be the first to share your experience!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 3) * 0.1 }}
                  data-ocid={`testimonials.item.${i + 1}`}
                >
                  <Card className="h-full border-0 shadow-card hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex gap-1 mb-3">
                        {STAR_INDICES.map((j) => (
                          <Star
                            key={j}
                            className={`w-4 h-4 ${j < t.rating ? "fill-gold text-gold" : "text-gray-200 fill-gray-200"}`}
                          />
                        ))}
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-5 italic">
                        "{t.review}"
                      </p>
                      <div className="flex items-center gap-3 border-t pt-4">
                        <div className="w-11 h-11 rounded-full bg-navy flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                          {t.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-navy text-sm">
                            {t.name}
                          </div>
                          <div className="text-muted-foreground text-xs">
                            {t.country}
                          </div>
                          <div className="text-gold text-xs font-medium">
                            {t.service}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-navy text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-3">
            Ready to Write Your Own Success Story?
          </h2>
          <p className="text-white/70 mb-8">
            Join thousands of satisfied clients who achieved their dreams with
            WorldGate Global.
          </p>
          <Button
            onClick={() => setBookingOpen(true)}
            className="bg-gold hover:bg-gold-light text-navy font-semibold px-8 py-3 h-auto rounded-full"
            data-ocid="testimonials.primary_button"
          >
            Book Free Consultation
          </Button>
        </div>
      </section>

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}
