import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { Category } from "../backend.d";
import { useActor } from "./useActor";

export function useGetTestimonials() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllTestimonials();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetBlogPosts() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["blogPosts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllBlogPosts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateBooking() {
  return useMutation({
    mutationFn: async ({
      actor,
      name,
      email,
      phone,
      serviceInterest,
      message,
    }: {
      actor: any;
      name: string;
      email: string;
      phone: string;
      serviceInterest: string;
      message: string;
    }) => {
      return actor.createConsultationBooking(
        name,
        email,
        phone,
        serviceInterest,
        message,
      );
    },
  });
}

export function useCreateInquiry() {
  return useMutation({
    mutationFn: async ({
      actor,
      name,
      email,
      phone,
      message,
    }: {
      actor: any;
      name: string;
      email: string;
      phone: string;
      message: string;
    }) => {
      return actor.createContactInquiry(name, email, phone, message);
    },
  });
}

const SEED_TESTIMONIALS = [
  {
    name: "Priya Sharma",
    country: "Canada",
    rating: 5,
    review:
      "WorldGate Global helped me get my Canada PR in just 8 months. Their team was incredibly professional and guided me through every step. I am now settled in Toronto with my family!",
    service: "Canada PR Immigration",
  },
  {
    name: "Mohammed Al-Rashid",
    country: "UAE",
    rating: 5,
    review:
      "Excellent service for my UAE work visa. The team was very responsive and handled all my documentation perfectly. Highly recommend WorldGate Global to anyone looking for Gulf job visas.",
    service: "Gulf Job Visa (UAE)",
  },
  {
    name: "Anjali Verma",
    country: "UK",
    rating: 5,
    review:
      "I had a complicated UK work visa situation but WorldGate Global handled it brilliantly. Got my visa approved on the first attempt. Professional, honest, and trustworthy consultancy!",
    service: "UK Work Visa",
  },
  {
    name: "Suresh Kumar",
    country: "Australia",
    rating: 5,
    review:
      "Got my Australia PR after years of failed attempts with other consultants. WorldGate was transparent about the process and delivered results. Forever grateful for their expertise.",
    service: "Australia PR Immigration",
  },
  {
    name: "Fatima Malik",
    country: "Saudi Arabia",
    rating: 4,
    review:
      "Completed my Umrah package through WorldGate Global. The visa processing, accommodation, and travel arrangements were all handled smoothly. A blessed and stress-free journey.",
    service: "Umrah Package",
  },
  {
    name: "Rajan Patel",
    country: "Germany",
    rating: 5,
    review:
      "Got my Germany Opportunity Card through WorldGate in just 4 months. They guided me about documentation requirements and even helped with job search tips. Amazing team!",
    service: "Germany Opportunity Card",
  },
];

const SEED_BLOG_POSTS = [
  {
    title: "Canada Express Entry 2025: Everything You Need to Know",
    excerpt:
      "Canada's Express Entry system remains one of the fastest routes to permanent residency. Learn about CRS scores, draws, and how to maximize your chances.",
    content:
      "Canada's Express Entry system continues to be one of the most popular immigration pathways for skilled workers worldwide. In 2025, the Canadian government has introduced several changes to the CRS scoring system that applicants must be aware of. The minimum score for recent draws has ranged from 470 to 510 points. Key factors that influence your CRS score include age, education, language proficiency in English or French, and Canadian work experience. It is advisable to improve your IELTS score and get your educational credentials assessed by WES or other recognized bodies. Additionally, having a provincial nomination can add 600 points to your CRS score, virtually guaranteeing an invitation to apply for PR.",
    category: Category.immigrationLaw,
    author: "WorldGate Global Team",
  },
  {
    title: "Germany Opportunity Card: A New Path for Skilled Workers",
    excerpt:
      "Germany's Chancenkarte offers skilled workers from non-EU countries a chance to move to Germany and search for jobs on the ground. Here's how to apply.",
    content:
      "Germany's Opportunity Card (Chancenkarte) is a groundbreaking immigration initiative that allows skilled workers from non-EU countries to enter Germany for up to one year to search for employment. To qualify, applicants need to meet a points-based system that considers factors like professional qualifications, language skills, work experience, and ties to Germany. The minimum requirement is usually a recognized professional qualification or a university degree. Unlike traditional work visas, the Opportunity Card does not require a job offer before arrival. This makes it an attractive option for qualified professionals who want to explore the German job market firsthand before committing.",
    category: Category.employment,
    author: "WorldGate Global Team",
  },
  {
    title: "UK Visa Changes 2025: What Indian Applicants Must Know",
    excerpt:
      "The UK has introduced significant changes to its visa policies affecting Indian applicants. From salary thresholds to English language requirements, here is the complete guide.",
    content:
      "The United Kingdom has implemented sweeping changes to its immigration system in 2025 that significantly impact Indian applicants. The minimum salary threshold for skilled worker visas has been raised to £38,700 per year, up from the previous £26,200. However, certain shortage occupations like healthcare and education continue to have lower salary requirements. The English language requirement has also been tightened, with applicants now needing to demonstrate B2 level proficiency. For students, the Graduate Route visa remains available, allowing graduates of UK universities to stay and work for two years after completing their studies. Family visas now require sponsors to earn a minimum income of £29,000.",
    category: Category.visa,
    author: "WorldGate Global Team",
  },
];

export function useSeedData() {
  const { actor, isFetching } = useActor();
  const seeded = useRef(false);
  const qc = useQueryClient();

  useEffect(() => {
    if (!actor || isFetching || seeded.current) return;
    seeded.current = true;

    const run = async () => {
      try {
        const [existingT, existingB] = await Promise.all([
          actor.getAllTestimonials(),
          actor.getAllBlogPosts(),
        ]);
        if (existingT.length === 0) {
          await Promise.all(
            SEED_TESTIMONIALS.map((t) =>
              actor.addTestimonial(
                t.name,
                t.country,
                t.rating,
                t.review,
                t.service,
              ),
            ),
          );
          qc.invalidateQueries({ queryKey: ["testimonials"] });
        }
        if (existingB.length === 0) {
          await Promise.all(
            SEED_BLOG_POSTS.map((b) =>
              actor.createBlogPost(
                b.title,
                b.excerpt,
                b.content,
                b.category,
                b.author,
              ),
            ),
          );
          qc.invalidateQueries({ queryKey: ["blogPosts"] });
        }
      } catch (_e) {
        // silently ignore seed errors
      }
    };
    run();
  }, [actor, isFetching, qc]);
}
