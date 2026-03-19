import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";
import { useCreateBooking } from "../hooks/useQueries";

interface Props {
  open: boolean;
  onClose: () => void;
}

const SERVICES = [
  "Tourist & Visitor Visa",
  "Canada PR Immigration",
  "Australia PR Immigration",
  "UK Work Visa",
  "Europe Work Permit",
  "Germany Opportunity Card",
  "Gulf Job Visa (UAE/Qatar/Saudi/Kuwait/Oman)",
  "Hajj Package",
  "Umrah Package",
  "Schengen Visa",
  "USA Visitor Visa",
  "Other",
];

export default function BookingModal({ open, onClose }: Props) {
  const { actor } = useActor();
  const { mutateAsync, isPending } = useCreateBooking();
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    serviceInterest: "",
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
      toast.success(
        "Booking request submitted! We'll contact you within 24 hours.",
      );
    } catch (_e) {
      toast.error("Failed to submit. Please try again.");
    }
  };

  const handleClose = () => {
    setSuccess(false);
    setForm({
      name: "",
      email: "",
      phone: "",
      serviceInterest: "",
      message: "",
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg" data-ocid="booking.dialog">
        <DialogHeader>
          <DialogTitle className="text-navy text-2xl font-bold">
            Book Free Consultation
          </DialogTitle>
          <DialogDescription>
            Fill in your details and our experts will contact you within 24
            hours.
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="py-8 text-center" data-ocid="booking.success_state">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-navy mb-2">
              Request Submitted!
            </h3>
            <p className="text-muted-foreground text-sm mb-6">
              Our team will reach out to you within 24 hours.
            </p>
            <Button
              onClick={handleClose}
              className="bg-navy text-white hover:bg-navy-light"
              data-ocid="booking.close_button"
            >
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="booking-name">Full Name *</Label>
                <Input
                  id="booking-name"
                  required
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Your name"
                  data-ocid="booking.input"
                />
              </div>
              <div>
                <Label htmlFor="booking-phone">Phone *</Label>
                <Input
                  id="booking-phone"
                  required
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="+91 99999 99999"
                  data-ocid="booking.input"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="booking-email">Email Address *</Label>
              <Input
                id="booking-email"
                type="email"
                required
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="your@email.com"
                data-ocid="booking.input"
              />
            </div>
            <div>
              <Label>Service Interested In *</Label>
              <Select
                required
                value={form.serviceInterest}
                onValueChange={(v) => handleChange("serviceInterest", v)}
              >
                <SelectTrigger data-ocid="booking.select">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  {SERVICES.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="booking-message">Message (Optional)</Label>
              <Textarea
                id="booking-message"
                value={form.message}
                onChange={(e) => handleChange("message", e.target.value)}
                placeholder="Tell us about your requirements..."
                rows={3}
                data-ocid="booking.textarea"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="flex-1"
                data-ocid="booking.cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="flex-1 bg-gold hover:bg-gold-light text-navy font-semibold"
                data-ocid="booking.submit_button"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Book Consultation"
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
