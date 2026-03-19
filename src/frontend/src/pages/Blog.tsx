import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "motion/react";
import { Category } from "../backend.d";
import { useGetBlogPosts } from "../hooks/useQueries";

const BLOG_IMAGES: Record<number, string> = {
  0: "/assets/generated/blog-visa-guide.dim_600x400.jpg",
  1: "/assets/generated/blog-canada-pr.dim_600x400.jpg",
  2: "/assets/generated/blog-germany-card.dim_600x400.jpg",
};

const CATEGORY_LABELS: Record<string, string> = {
  [Category.visa]: "Visa Tips",
  [Category.immigrationLaw]: "Immigration Law",
  [Category.study]: "Study Abroad",
  [Category.employment]: "Employment",
  [Category.citizenship]: "Citizenship",
};

const CATEGORY_COLORS: Record<string, string> = {
  [Category.visa]: "bg-blue-100 text-blue-700",
  [Category.immigrationLaw]: "bg-purple-100 text-purple-700",
  [Category.study]: "bg-green-100 text-green-700",
  [Category.employment]: "bg-orange-100 text-orange-700",
  [Category.citizenship]: "bg-gold/10 text-gold",
};

const SKELETON_INDICES = [0, 1, 2];

export default function Blog() {
  const { data: posts = [], isLoading } = useGetBlogPosts();

  return (
    <div className="pt-20">
      <div className="bg-navy py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">
              Immigration Updates
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mt-3 mb-4">
              Blog & News
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Latest immigration news, visa updates, and expert insights to keep
              you informed.
            </p>
          </motion.div>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              data-ocid="blog.loading_state"
            >
              {SKELETON_INDICES.map((n) => (
                <Skeleton key={n} className="h-80 rounded-2xl" />
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div
              className="text-center py-20 text-muted-foreground"
              data-ocid="blog.empty_state"
            >
              No blog posts yet. Check back soon for immigration updates!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, i) => (
                <motion.div
                  key={Number(post.id)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 3) * 0.1 }}
                  data-ocid={`blog.item.${i + 1}`}
                >
                  <Card className="h-full border-0 shadow-card overflow-hidden group hover:shadow-lg transition-shadow">
                    <div className="overflow-hidden h-52">
                      <img
                        src={BLOG_IMAGES[i % 3]}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <CardContent className="p-6">
                      <Badge
                        className={`text-xs ${CATEGORY_COLORS[String(post.category)] ?? "bg-gray-100 text-gray-600"} border-0 mb-3`}
                      >
                        {CATEGORY_LABELS[String(post.category)] ??
                          String(post.category)}
                      </Badge>
                      <h2 className="font-bold text-navy text-lg leading-snug mb-2 line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground border-t pt-4">
                        <span>By {post.author}</span>
                        <span>
                          {new Date(
                            Number(post.date) / 1_000_000,
                          ).toLocaleDateString("en-IN", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
