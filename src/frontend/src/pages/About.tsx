import { Card, CardContent } from "@/components/ui/card";
import { Award, CheckCircle, Globe, TrendingUp, Users } from "lucide-react";
import { motion } from "motion/react";

const VALUES = [
  {
    icon: CheckCircle,
    title: "Transparency",
    desc: "We believe in complete honesty — no hidden fees, no false promises. You know exactly what to expect.",
  },
  {
    icon: Users,
    title: "Client-Centric",
    desc: "Every case is unique. We tailor our approach to your individual goals, background, and timeline.",
  },
  {
    icon: Award,
    title: "Excellence",
    desc: "Our team of certified consultants brings deep expertise and up-to-date knowledge of immigration laws.",
  },
  {
    icon: Globe,
    title: "Global Network",
    desc: "Strong relationships with embassies, consulates, and international employers in 50+ countries.",
  },
];

const TEAM = [
  {
    name: "Arjun Mehta",
    role: "CEO & Chief Immigration Consultant",
    exp: "18 years experience",
    flag: "🇨🇦 🇦🇺 🇬🇧",
  },
  {
    name: "Sana Khan",
    role: "Gulf & Middle East Specialist",
    exp: "12 years experience",
    flag: "🇦🇪 🇸🇦 🇶🇦",
  },
  {
    name: "Rahul Gupta",
    role: "Europe & Schengen Advisor",
    exp: "10 years experience",
    flag: "🇩🇪 🇫🇷 🇮🇪",
  },
  {
    name: "Deepa Nair",
    role: "USA & Canada Specialist",
    exp: "14 years experience",
    flag: "🇺🇸 🇨🇦",
  },
];

export default function About() {
  return (
    <div className="pt-20">
      {/* Page Header */}
      <div className="bg-navy py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">
              About WorldGate Global
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mt-3 mb-4">
              India's Most Trusted
              <br />
              Immigration Partner
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Since 2021, we have guided over 500 individuals and families
              toward their international dreams with integrity and expertise.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="/assets/generated/about-office.dim_800x600.jpg"
                alt="WorldGate Global Office"
                className="rounded-2xl w-full object-cover shadow-xl"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-gold font-semibold text-sm uppercase tracking-widest">
                Our Story
              </span>
              <h2 className="text-3xl font-bold text-navy mt-2 mb-4">
                Turning International Dreams into Reality Since 2021
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                WorldGate Global was founded with a single mission: to make
                international immigration accessible, transparent, and
                stress-free for every Indian citizen. What started as a small
                New Delhi consultancy has grown into one of India's most trusted
                immigration firms.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {[
                  {
                    icon: "🎯",
                    title: "Our Mission",
                    desc: "To empower individuals with expert immigration guidance, making global opportunities accessible to everyone.",
                  },
                  {
                    icon: "🔭",
                    title: "Our Vision",
                    desc: "A world where borders are no longer barriers — every qualified individual can pursue opportunities globally.",
                  },
                ].map((item) => (
                  <div key={item.title} className="bg-gray-50 rounded-xl p-5">
                    <div className="text-3xl mb-2">{item.icon}</div>
                    <h4 className="font-bold text-navy mb-1">{item.title}</h4>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 section-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-gold font-semibold text-sm uppercase tracking-widest">
              Our Values
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-navy mt-2">
              What We Stand For
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full border-0 shadow-card text-center">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 bg-navy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <v.icon className="w-7 h-7 text-navy" />
                    </div>
                    <h3 className="font-bold text-navy mb-2">{v.title}</h3>
                    <p className="text-muted-foreground text-sm">{v.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-gold font-semibold text-sm uppercase tracking-widest">
              Our Experts
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-navy mt-2">
              Meet Our Team
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="border-0 shadow-card text-center overflow-hidden">
                  <div className="h-32 bg-gradient-to-br from-navy to-navy-light flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-gold/20 border-4 border-gold/40 flex items-center justify-center text-3xl font-bold text-white">
                      {member.name.charAt(0)}
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-bold text-navy">{member.name}</h3>
                    <p className="text-muted-foreground text-xs mt-1 mb-2">
                      {member.role}
                    </p>
                    <span className="text-xs bg-gold/10 text-gold font-medium px-3 py-1 rounded-full">
                      {member.exp}
                    </span>
                    <div className="text-lg mt-3">{member.flag}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: TrendingUp,
                number: "500+",
                label: "Successful Cases",
              },
              { icon: Globe, number: "50+", label: "Countries" },
              { icon: Award, number: "98%", label: "Success Rate" },
              { icon: Users, number: "15+", label: "Expert Consultants" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <s.icon className="w-8 h-8 text-gold mx-auto mb-2" />
                <div className="text-3xl font-bold text-white">{s.number}</div>
                <div className="text-white/60 text-sm mt-1">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
