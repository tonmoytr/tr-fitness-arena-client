import HeroBanner from "./components/home/HeroBanner";
import FeaturedClasses from "./components/home/FeaturedClasses";
import { getLatestForumPosts } from "@/lib/actions/forum";
import LatestDiscussions from "./components/home/LatestDiscussion";
import WhyJoin from "./components/home/WhyJoinUs";
import MeetTrainers from "./components/home/MeetTrainers";
import PricingPlans from "./components/home/PricingPlans";
import { getFilteredClasses } from "@/lib/actions/classes";

export default async function HomePage() {
  // Fire off both server-side queries in parallel to optimize processing speed
  const [classesResponse, forumResponse] = await Promise.all([
    getFilteredClasses(),
    getLatestForumPosts(),
  ]);

  return (
    <div className="w-full min-h-screen bg-brand-light">
      {/* Layer 1: Full-Bleed High-Energy Showcase Header Banner */}
      <HeroBanner />

      {/* Layer 2: Full-Bleed Slate-Charcoal Top Performing Class Modules Grid */}
      <FeaturedClasses
        classes={classesResponse.data}
        error={classesResponse.error}
      />

      <WhyJoin />

      <MeetTrainers />

      <PricingPlans />

      {/* Layer 3: Clean Editorial Community Forum Highlights Section */}
      <LatestDiscussions
        posts={forumResponse.data}
        error={forumResponse.error}
      />
    </div>
  );
}
