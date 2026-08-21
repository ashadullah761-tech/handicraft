import { CustomerReviewsSection } from "@/components/reviews/CustomerReviewsSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customer Reviews & Ratings | Marudhar Export",
  description: "Read genuine customer reviews, ratings, and experiences from verified clients of Marudhar Export handicraft items and wooden furniture.",
};

export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <CustomerReviewsSection />
    </div>
  );
}
