import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Briefcase,
  CheckCircle,
  FileText,
  Heart,
  Plane,
  Star,
} from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import BookingModal from "../components/BookingModal";
import { useGetBlogPosts, useGetTestimonials } from "../hooks/useQueries";

const SERVICES = [
  {
    icon: Plane,
    title: "Tourist & Visitor Visas",
    desc: "USA, UK, Ireland, Schengen, Canada & Gulf tourist visas with expert guidance.",
    color: "text-blue-500",
  },
  {
    icon: FileText,
    title: "Immigration Consultancy",
    desc: "Canada PR, Australia PR, Germany Opportunity Card and skilled worker guidance.",
    color: "text-emerald-500",
  },
  {
    icon: Briefcase,
    title: "Work Visas & Jobs",
    desc: "UK work visa, Europe work permit, Germany Chancenkarte, Gulf job visas.",
    color: "text-purple-500",
  },
  {
    icon: Heart,
    title: "Hajj & Umrah Packages",
    desc: "Complete Hajj & Umrah packages with visa, accommodation, food & travel support.",
    color: "text-rose-500",
  },
];

const COUNTRIES = [
  { flag: "🇨🇦", name: "Canada" },
  { flag: "🇬🇧", name: "UK" },
  { flag: "🇮🇪", name: "Ireland" },
  { flag: "🇪🇺", name: "Europe" },
  { flag: "🇺🇸", name: "USA" },
  { flag: "🇦🇺", name: "Australia" },
  { flag: "🇦🇪", name: "Gulf Countries" },
];

const STATS = [
  { number: "500+", label: "Visa Approvals" },
  { number: "5", label: "Years Experience" },
  { number: "50+", label: "Countries Served" },
  { number: "98%", label: "Success Rate" },
];

const FLOATING_CARDS = [
  {
    icon: "✅",
    label: "500+ Visas Approved",
    bg: "bg-gold",
    text: "text-navy",
    rotate: "rotate-3",
    shadow: "shadow-2xl",
    delay: 0,
  },
  {
    icon: "🌟",
    label: "98% Success Rate",
    bg: "bg-white",
    text: "text-navy",
    rotate: "",
    shadow: "shadow-xl",
    delay: 0.5,
  },
  {
    icon: "🏆",
    label: "5 Years Experience",
    bg: "bg-navy",
    text: "text-gold",
    rotate: "-rotate-2",
    shadow: "shadow-xl",
    delay: 1,
  },
];

const STAR_INDICES = [0, 1, 2, 3, 4];
const BLOG_IMAGES = [
  "/assets/generated/blog-visa-guide.dim_600x400.jpg",
  "/assets/generated/blog-canada-pr.dim_600x400.jpg",
  "/assets/generated/blog-germany-card.dim_600x400.jpg",
];

export default function Home() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const { data: testimonials = [] } = useGetTestimonials();
  const { data: blogPosts = [] } = useGetBlogPosts();

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <div ref={heroRef} className="relative min-h-screen overflow-hidden">
        {/* Parallax background */}
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={{
            backgroundImage:
              "url('/assets/generated/hero-immigration-3d.dim_1400x900.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            y: bgY,
            scale: 1.15,
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/70 to-transparent" />

        <section className="relative min-h-screen flex items-center pt-20 z-10">
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Text & CTA */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <span className="inline-block bg-gold/20 border border-gold/30 text-gold text-sm font-medium px-4 py-1.5 rounded-full mb-6">
                  🌐 India's Trusted Immigration Partner
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                  Your Trusted Partner for{" "}
                  <span className="text-white">Global Visas</span>
                  {" & "}Immigration
                </h1>
                <p className="text-white/80 text-lg mb-8 leading-relaxed">
                  Expert Immigration & Visa Services for Individuals, Families,
                  and Businesses. From Gulf to Canada, UK to Australia — we make
                  your international dreams a reality.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button
                    onClick={() => setBookingOpen(true)}
                    className="bg-gold hover:bg-gold-light text-navy font-semibold px-8 py-3 h-auto text-base rounded-full shadow-gold"
                    data-ocid="hero.primary_button"
                  >
                    Book Free Consultation
                  </Button>
                  <Link to="/services">
                    <Button
                      variant="outline"
                      className="border-white/50 text-black hover:bg-white hover:text-navy font-semibold px-8 py-3 h-auto text-base rounded-full"
                      data-ocid="hero.secondary_button"
                    >
                      Apply Now <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </motion.div>

              {/* Right: Floating 3D Stat Cards */}
              <div className="hidden lg:flex flex-col items-center justify-center gap-5 relative">
                {FLOATING_CARDS.map((card, i) => (
                  <motion.div
                    key={card.label}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0, y: [0, -12, 0] }}
                    transition={{
                      opacity: { duration: 0.6, delay: card.delay },
                      x: { duration: 0.6, delay: card.delay },
                      y: {
                        repeat: Number.POSITIVE_INFINITY,
                        duration: 3 + i * 0.4,
                        ease: "easeInOut",
                        delay: card.delay,
                      },
                    }}
                    className={`
                      ${card.bg} ${card.text} ${card.rotate} ${card.shadow}
                      rounded-2xl px-7 py-5 flex items-center gap-4
                      w-72 cursor-default select-none
                      backdrop-blur-sm border border-white/10
                      style-3d
                    `}
                    style={{
                      transformStyle: "preserve-3d",
                      perspective: "800px",
                      alignSelf:
                        i === 0
                          ? "flex-end"
                          : i === 2
                            ? "flex-start"
                            : "center",
                      marginRight: i === 0 ? "0" : i === 2 ? "2rem" : "1rem",
                    }}
                    whileHover={{
                      scale: 1.07,
                      rotateY: 8,
                      transition: { duration: 0.25 },
                    }}
                  >
                    <span className="text-3xl drop-shadow-lg">{card.icon}</span>
                    <span className="font-bold text-lg leading-snug">
                      {card.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Stats */}
      <section className="bg-navy py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-gold">{s.number}</div>
                <div className="text-white/70 text-sm mt-1">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-gold font-semibold text-sm uppercase tracking-widest">
              What We Offer
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-navy mt-2">
              Our Immigration Services
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              Comprehensive visa and immigration solutions tailored to your
              destination and goals.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((svc, i) => (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full shadow-card hover:shadow-lg transition-shadow border-0 group">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center mb-4 group-hover:bg-gold/10 transition-colors">
                      <svc.icon className={`w-6 h-6 ${svc.color}`} />
                    </div>
                    <h3 className="font-bold text-navy mb-2">{svc.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {svc.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/services">
              <Button
                variant="outline"
                className="border-navy text-navy hover:bg-navy hover:text-white"
                data-ocid="services.secondary_button"
              >
                View All Services <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Countries */}
      <section className="py-20 section-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-gold font-semibold text-sm uppercase tracking-widest">
              Global Reach
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-navy mt-2">
              Countries We Serve
            </h2>
            <p className="text-muted-foreground mt-3">
              We provide visa and immigration services for top destinations
              worldwide.
            </p>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-4">
            {COUNTRIES.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <Link to="/countries">
                  <div className="bg-white rounded-2xl px-6 py-4 shadow-card hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer flex items-center gap-3">
                    <span className="text-3xl">{c.flag}</span>
                    <span className="font-semibold text-navy">{c.name}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-gold font-semibold text-sm uppercase tracking-widest">
                Why Us
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mt-2 mb-6">
                Why Choose WorldGate Global?
              </h2>
              <div className="space-y-4">
                {[
                  {
                    title: "5 Years of Experience",
                    desc: "Years of expertise in immigration and visa consultancy.",
                  },
                  {
                    title: "98% Visa Approval Rate",
                    desc: "Our track record speaks for itself — nearly all applications approved.",
                  },
                  {
                    title: "Transparent & Honest",
                    desc: "No hidden fees, no false promises. We tell you exactly what to expect.",
                  },
                  {
                    title: "End-to-End Support",
                    desc: "From documentation to interview prep, we guide you every step.",
                  },
                  {
                    title: "Expert Team",
                    desc: "Certified immigration consultants with specialized regional knowledge.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-white font-semibold">
                        {item.title}
                      </div>
                      <div className="text-white/60 text-sm">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="/assets/generated/about-office.dim_800x600.jpg"
                alt="Immigration consultancy office"
                className="rounded-2xl w-full object-cover shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-gold font-semibold text-sm uppercase tracking-widest">
              Success Stories
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-navy mt-2">
              What Our Clients Say
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full shadow-card border-0">
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-3">
                      {STAR_INDICES.map((j) => (
                        <Star
                          key={j}
                          className={`w-4 h-4 ${j < t.rating ? "fill-gold text-gold" : "text-gray-200 fill-gray-200"}`}
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-4">
                      "{t.review}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center text-white font-semibold text-sm">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-navy text-sm">
                          {t.name}
                        </div>
                        <div className="text-muted-foreground text-xs">
                          {t.country} · {t.service}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
            {testimonials.length === 0 && (
              <div
                className="col-span-3 text-center py-10 text-muted-foreground"
                data-ocid="testimonials.loading_state"
              >
                Loading client stories...
              </div>
            )}
          </div>
          <div className="text-center mt-10">
            <Link to="/testimonials">
              <Button
                variant="outline"
                className="border-navy text-navy hover:bg-navy hover:text-white"
                data-ocid="testimonials.secondary_button"
              >
                Read All Reviews <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="py-20 section-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-gold font-semibold text-sm uppercase tracking-widest">
              Stay Informed
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-navy mt-2">
              Latest Immigration News
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.slice(0, 3).map((post, i) => (
              <motion.div
                key={Number(post.id)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full shadow-card border-0 overflow-hidden group">
                  <img
                    src={BLOG_IMAGES[i % 3]}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <CardContent className="p-6">
                    <span className="text-xs font-medium text-gold uppercase tracking-wider">
                      {String(post.category)}
                    </span>
                    <h3 className="font-bold text-navy mt-2 mb-2 leading-snug line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-3">
                      {post.excerpt}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
            {blogPosts.length === 0 && (
              <div
                className="col-span-3 text-center py-10 text-muted-foreground"
                data-ocid="blog.loading_state"
              >
                Loading blog posts...
              </div>
            )}
          </div>
          <div className="text-center mt-10">
            <Link to="/blog">
              <Button
                variant="outline"
                className="border-navy text-navy hover:bg-navy hover:text-white"
                data-ocid="blog.secondary_button"
              >
                View All Articles <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-gold">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-navy mb-4">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-navy/70 text-lg mb-8">
              Book a free consultation with our immigration experts today.
            </p>
            <Button
              onClick={() => setBookingOpen(true)}
              className="bg-navy hover:bg-navy-light text-white font-semibold px-10 py-4 h-auto text-lg rounded-full"
              data-ocid="cta.primary_button"
            >
              Book Free Consultation
            </Button>
          </motion.div>
        </div>
      </section>

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}
