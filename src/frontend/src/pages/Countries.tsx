import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import BookingModal from "../components/BookingModal";

const COUNTRIES = [
  {
    name: "Canada",
    flag: "🇨🇦",
    image: "/assets/generated/country-canada.dim_400x300.jpg",
    desc: "Canada is one of the most welcoming countries for immigrants, offering multiple pathways to permanent residency through Express Entry, Provincial Nominee Programs, and more.",
    visas: [
      "Tourist Visa (TRV)",
      "Express Entry PR",
      "Provincial Nominee",
      "Student Visa",
      "Work Permit",
    ],
    highlight: "Easy PR pathway for skilled workers",
  },
  {
    name: "United Kingdom",
    flag: "🇬🇧",
    image: "/assets/generated/country-uk.dim_400x300.jpg",
    desc: "The UK offers excellent opportunities for skilled workers, students, and families. With the Skilled Worker visa and Graduate Route, the UK is highly accessible for qualified Indians.",
    visas: [
      "Visitor Visa",
      "Skilled Worker Visa",
      "Student Visa",
      "Graduate Route",
      "Family Visa",
    ],
    highlight: "Strong job market for IT & healthcare",
  },
  {
    name: "Ireland",
    flag: "🇮🇪",
    image: "/assets/generated/country-ireland.dim_400x300.jpg",
    desc: "Ireland is an English-speaking EU member with booming tech and pharmaceutical industries. Its Critical Skills Employment Permit is ideal for qualified professionals.",
    visas: [
      "Tourist Visa",
      "Critical Skills Permit",
      "General Employment Permit",
      "Intra-Company Transfer",
    ],
    highlight: "EU access + English language",
  },
  {
    name: "Europe",
    flag: "🇪🇺",
    image: "/assets/generated/country-europe.dim_400x300.jpg",
    desc: "Europe offers diverse immigration pathways across 27 EU countries. Germany, Netherlands, France and others actively recruit skilled workers through various programs.",
    visas: [
      "Schengen Tourist Visa",
      "Germany Opportunity Card",
      "EU Blue Card",
      "Netherlands Work Permit",
      "France Talent Passport",
    ],
    highlight: "Germany Chancenkarte — no job offer needed",
  },
  {
    name: "USA",
    flag: "🇺🇸",
    image: "/assets/generated/country-usa.dim_400x300.jpg",
    desc: "The United States remains a top destination for professionals, students, and families. We assist with B1/B2 visitor visas, H-1B work visas, and green card applications.",
    visas: [
      "B1/B2 Visitor Visa",
      "F-1 Student Visa",
      "H-1B Work Visa",
      "L-1 Intracompany",
      "Green Card",
    ],
    highlight: "Leading tech & education hub",
  },
  {
    name: "Australia",
    flag: "🇦🇺",
    image: "/assets/generated/country-australia.dim_400x300.jpg",
    desc: "Australia actively invites skilled migrants through its SkillSelect system. The 189 Skilled Independent visa and 190 State Nomination visas are popular pathways for Indians.",
    visas: [
      "Tourist Visa (600)",
      "Skilled Independent (189)",
      "State Nominated (190)",
      "Temporary Skill Shortage (482)",
      "Student Visa",
    ],
    highlight: "High quality of life & strong economy",
  },
  {
    name: "Gulf Countries",
    flag: "🇦🇪",
    image: "/assets/generated/country-gulf.dim_400x300.jpg",
    desc: "The Gulf region offers abundant employment opportunities across construction, hospitality, healthcare, and tech. UAE, Saudi Arabia, Qatar, Kuwait and Oman are key destinations.",
    visas: [
      "UAE Employment Visa",
      "Saudi Arabia Iqama",
      "Qatar Work Permit",
      "Kuwait Work Visa",
      "Oman Residence Permit",
    ],
    highlight: "Tax-free salaries & quick visa processing",
  },
];

export default function Countries() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div className="pt-20">
      <div className="bg-navy py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">
              Global Reach
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mt-3 mb-4">
              Countries We Serve
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Expert visa and immigration services for top global destinations
              from India.
            </p>
          </motion.div>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {COUNTRIES.map((country, i) => (
            <motion.div
              key={country.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="grid lg:grid-cols-2 gap-10 items-center">
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <img
                    src={country.image}
                    alt={country.name}
                    className="w-full h-72 object-cover rounded-2xl shadow-card"
                  />
                </div>
                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-5xl">{country.flag}</span>
                    <div>
                      <h2 className="text-3xl font-bold text-navy">
                        {country.name}
                      </h2>
                      <Badge className="bg-gold/10 text-gold border-0 mt-1">
                        {country.highlight}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {country.desc}
                  </p>
                  <div>
                    <h4 className="font-semibold text-navy mb-3">
                      Available Visa Types:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {country.visas.map((visa) => (
                        <div
                          key={visa}
                          className="flex items-center gap-1.5 bg-gray-50 rounded-full px-3 py-1.5"
                        >
                          <CheckCircle className="w-3.5 h-3.5 text-gold" />
                          <span className="text-sm text-navy font-medium">
                            {visa}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button
                    onClick={() => setBookingOpen(true)}
                    className="mt-6 bg-navy hover:bg-navy-light text-white rounded-full"
                    data-ocid="countries.primary_button"
                  >
                    Apply for {country.name} Visa
                  </Button>
                </div>
              </div>
              {i < COUNTRIES.length - 1 && (
                <hr className="border-border mt-16" />
              )}
            </motion.div>
          ))}
        </div>
      </section>

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}
