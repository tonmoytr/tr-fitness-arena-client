import FavoritesListClient from "@/components/dashboard/user/FavoritesListClient";


export const metadata = {
  title: "My Favorites | TR Fitness Arena",
  description: "Your curated fitness blueprints and saved routines.",
};

export default async function FavoriteClassesPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <span className="text-[10px] font-mono font-black text-brand-primary uppercase tracking-widest block">
          Saved Configurations
        </span>
        <h1 className="text-3xl font-black uppercase tracking-tight text-white font-heading">
          Favorites <span className="text-brand-primary">List</span>
        </h1>
      </div>

      {/* Clean downstream injection of client-side loop boundary */}
      <FavoritesListClient />
    </div>
  );
}
