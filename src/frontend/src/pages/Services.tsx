import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, CheckCircle, FileText, Heart, Plane } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import BookingModal from "../components/BookingModal";

const CATEGORIES = [
  {
    id: "tourist",
    icon: Plane,
    label: "Tourist & Visitor Visas",
    color: "text-blue-500",
    intro:
      "Planning a trip abroad? We handle the entire tourist and visitor visa process so you can focus on your journey.",
    services: [
      {
        name: "USA Visitor Visa (B1/B2)",
        desc: "Complete assistance with US visitor visa application, interview prep, and document preparation.",
      },
      {
        name: "UK Visitor Visa",
        desc: "Expert guidance for Standard Visitor Visa with high success rates for Indian applicants.",
      },
      {
        name: "Ireland Visitor Visa",
        desc: "Tourist and visit visas for the Emerald Isle, including letter of invitation guidance.",
      },
      {
        name: "Schengen Visa",
        desc: "Travel across 27 European countries with our Schengen visa application support.",
      },
      {
        name: "Canada Visitor Visa (TRV)",
        desc: "Temporary Resident Visa for visiting family, tourism, or business in Canada.",
      },
      {
        name: "Gulf Tourist Visas",
        desc: "Tourist visas for UAE, Saudi Arabia, Qatar, Oman, and Kuwait.",
      },
    ],
  },
  {
    id: "immigration",
    icon: FileText,
    label: "Immigration Consultancy",
    color: "text-emerald-500",
    intro:
      "Dreaming of permanent residency abroad? Our immigration experts guide you through every step of the PR process.",
    services: [
      {
        name: "Canada PR — Express Entry",
        desc: "Comprehensive Express Entry profile management, CRS optimization, and ITA application.",
      },
      {
        name: "Canada PR — Provincial Nominee",
        desc: "Provincial Nominee Program guidance for all Canadian provinces and territories.",
      },
      {
        name: "Australia PR — Skilled Migration",
        desc: "SkillSelect EOI management, state nomination, and 189/190 visa applications.",
      },
      {
        name: "Germany Opportunity Card",
        desc: "New Chancenkarte guidance for skilled workers seeking employment opportunities in Germany.",
      },
      {
        name: "Skilled Worker Guidance",
        desc: "Skills assessment, credential recognition, and occupation gap analysis for skilled workers.",
      },
      {
        name: "Documentation Support",
        desc: "End-to-end documentation, form filling, and application review by certified consultants.",
      },
    ],
  },
  {
    id: "work",
    icon: Briefcase,
    label: "Work Visas & Jobs",
    color: "text-purple-500",
    intro:
      "Looking for international career opportunities? We connect you with the right work visa pathway and job placement support.",
    services: [
      {
        name: "UK Skilled Worker Visa",
        desc: "Certificate of Sponsorship guidance and Skilled Worker visa application for all eligible roles.",
      },
      {
        name: "Europe Work Permit",
        desc: "Work authorization for Germany, Netherlands, France, and other European countries.",
      },
      {
        name: "Germany Chancenkarte",
        desc: "Germany's new Opportunity Card allowing skilled workers to job search on arrival.",
      },
      {
        name: "UAE Work Visa",
        desc: "Employment visa for Dubai, Abu Dhabi, and across the UAE with job placement support.",
      },
      {
        name: "Qatar Work Visa",
        desc: "Work authorization for Qatar including Hamad Port, QPSC, and private sector jobs.",
      },
      {
        name: "Saudi Arabia Work Visa",
        desc: "Iqama and work permit processing for Saudi Arabia across multiple industries.",
      },
      {
        name: "Oman & Kuwait Work Visa",
        desc: "Employment visas for Oman and Kuwait with job placement assistance in key sectors.",
      },
    ],
  },
  {
    id: "hajj",
    icon: Heart,
    label: "Hajj & Umrah Packages",
    color: "text-rose-500",
    intro:
      "Fulfill your spiritual obligation with our comprehensive Hajj and Umrah packages designed for a blessed and hassle-free journey.",
    services: [
      {
        name: "Umrah Packages (Economy)",
        desc: "Affordable 12–15 day Umrah packages with visa, flights, Makkah & Madinah hotels.",
      },
      {
        name: "Umrah Packages (Premium)",
        desc: "5-star Umrah experience with luxury hotels steps from Masjid al-Haram and Masjid an-Nabawi.",
      },
      {
        name: "Hajj Packages",
        desc: "Guided Hajj packages with accommodation in Mina, Muzdalifah, and Makkah.",
      },
      {
        name: "Visa Processing",
        desc: "Complete Saudi Arabia Umrah and Hajj visa processing with the Ministry of Hajj requirements.",
      },
      {
        name: "Accommodation Arrangements",
        desc: "Hotel bookings in Makkah and Madinah at varying distances from the holy mosques.",
      },
      {
        name: "Food & Travel Support",
        desc: "Meal arrangements, transportation (Haramain train, buses), and 24/7 on-ground support.",
      },
    ],
  },
];

export default function Services() {
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
              What We Offer
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mt-3 mb-4">
              Our Services
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Comprehensive immigration, visa, and travel solutions for every
              journey.
            </p>
          </motion.div>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="tourist">
            <TabsList
              className="flex flex-wrap h-auto gap-2 bg-gray-100 p-2 rounded-xl mb-10"
              data-ocid="services.tab"
            >
              {CATEGORIES.map((cat) => (
                <TabsTrigger
                  key={cat.id}
                  value={cat.id}
                  className="flex items-center gap-2 rounded-lg"
                  data-ocid="services.tab"
                >
                  <cat.icon className={`w-4 h-4 ${cat.color}`} />
                  <span className="hidden sm:inline">{cat.label}</span>
                  <span className="sm:hidden">{cat.label.split(" ")[0]}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {CATEGORIES.map((cat) => (
              <TabsContent key={cat.id} value={cat.id}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center">
                      <cat.icon className={`w-6 h-6 ${cat.color}`} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-navy">
                        {cat.label}
                      </h2>
                      <p className="text-muted-foreground text-sm">
                        {cat.intro}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cat.services.map((svc, i) => (
                      <motion.div
                        key={svc.name}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                      >
                        <Card className="h-full border-0 shadow-card hover:shadow-lg transition-shadow">
                          <CardContent className="p-6">
                            <div className="flex items-start gap-3">
                              <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                              <div>
                                <h3 className="font-semibold text-navy mb-1">
                                  {svc.name}
                                </h3>
                                <p className="text-muted-foreground text-sm">
                                  {svc.desc}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>

          <div className="text-center mt-12 py-12 bg-gray-50 rounded-2xl">
            <h3 className="text-2xl font-bold text-navy mb-3">
              Not Sure Which Service You Need?
            </h3>
            <p className="text-muted-foreground mb-6">
              Book a free consultation and our experts will guide you to the
              right path.
            </p>
            <Button
              onClick={() => setBookingOpen(true)}
              className="bg-gold hover:bg-gold-light text-navy font-semibold px-8 py-3 h-auto rounded-full"
              data-ocid="services.primary_button"
            >
              Book Free Consultation
            </Button>
          </div>
        </div>
      </section>

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}
