import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";
import { useCreateInquiry } from "../hooks/useQueries";

const CONTACT_INFO = [
  {
    icon: Phone,
    label: "Phone",
    value: "+91 99999 99999",
    href: "tel:+919999999999",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Chat on WhatsApp",
    href: "https://wa.me/919999999999",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@worldgateglobal.com",
    href: "mailto:info@worldgateglobal.com",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "123 Business Hub, New Delhi, India 110001",
    href: "#",
  },
];

export default function Contact() {
  const { actor } = useActor();
  const { mutateAsync, isPending } = useCreateInquiry();
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) {
      toast.error("Connecting to server, please try again.");
      return;
    }
    try {
      await mutateAsync({ actor, ...form });
      setSuccess(true);
      toast.success("Inquiry submitted! We will contact you within 24 hours.");
    } catch (_e) {
      toast.error("Failed to submit. Please try again.");
    }
  };

  return (
    <div className="pt-20">
      <div className="bg-navy py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">
              Get In Touch
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mt-3 mb-4">
              Contact Us
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Our immigration experts are ready to help you. Reach out today for
              a free consultation.
            </p>
          </motion.div>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-navy mb-2">
                Get In Touch
              </h2>
              <p className="text-muted-foreground mb-8">
                Have questions about visas or immigration? We're here to help
                every step of the way.
              </p>

              <div className="space-y-5 mb-10">
                {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="flex items-start gap-4 group"
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                  >
                    <div className="w-12 h-12 rounded-xl bg-navy flex items-center justify-center flex-shrink-0 group-hover:bg-gold transition-colors">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gold uppercase tracking-widest mb-0.5">
                        {label}
                      </div>
                      <div className="text-navy font-medium group-hover:text-gold transition-colors">
                        {value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Map placeholder */}
              <div className="w-full h-64 rounded-2xl bg-gray-100 overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.83923192776!2d77.06889754725782!3d28.52758200617607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1710000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="WorldGate Global Office Location"
                />
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-gray-50 rounded-2xl p-8 shadow-card">
                <h2 className="text-2xl font-bold text-navy mb-2">
                  Send an Inquiry
                </h2>
                <p className="text-muted-foreground mb-6">
                  Fill out the form and our team will get back to you within 24
                  hours.
                </p>

                {success ? (
                  <div
                    className="py-16 text-center"
                    data-ocid="contact.success_state"
                  >
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-navy mb-2">
                      Inquiry Sent!
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      We'll contact you within 24 hours.
                    </p>
                    <Button
                      onClick={() => {
                        setSuccess(false);
                        setForm({
                          name: "",
                          email: "",
                          phone: "",
                          message: "",
                        });
                      }}
                      className="mt-6 bg-navy text-white hover:bg-navy-light"
                      data-ocid="contact.secondary_button"
                    >
                      Send Another
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="contact-name">Full Name *</Label>
                        <Input
                          id="contact-name"
                          required
                          value={form.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                          placeholder="Your name"
                          data-ocid="contact.input"
                        />
                      </div>
                      <div>
                        <Label htmlFor="contact-phone">Phone *</Label>
                        <Input
                          id="contact-phone"
                          required
                          value={form.phone}
                          onChange={(e) =>
                            handleChange("phone", e.target.value)
                          }
                          placeholder="+91 99999 99999"
                          data-ocid="contact.input"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="contact-email">Email Address *</Label>
                      <Input
                        id="contact-email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="your@email.com"
                        data-ocid="contact.input"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact-message">Message *</Label>
                      <Textarea
                        id="contact-message"
                        required
                        value={form.message}
                        onChange={(e) =>
                          handleChange("message", e.target.value)
                        }
                        placeholder="Tell us how we can help you..."
                        rows={5}
                        data-ocid="contact.textarea"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isPending}
                      className="w-full bg-gold hover:bg-gold-light text-navy font-semibold py-3 h-auto rounded-full"
                      data-ocid="contact.submit_button"
                    >
                      {isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Send Inquiry"
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
