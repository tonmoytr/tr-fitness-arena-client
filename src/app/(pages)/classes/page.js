import ClassCard from "@/app/components/cards/ClassCard";
import SearchAndFilter from "@/app/components/classes/SearchAndFilters";
import { getFilteredClasses } from "@/lib/actions/classes";

export default async function ClassesCatalogPage({ searchParams }) {
  // Extract search queries from URL props safely
  const filters = {
    search: searchParams?.search || "",
    category: searchParams?.category || "",
    level: searchParams?.level || "",
  };

  // Direct server-side data pipeline extraction
  const { data: classes, error } = await getFilteredClasses(filters);

  return (
    <main className="w-full min-h-screen bg-[#1e242b] text-brand-light py-20 border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Simple Minimalistic Title Core */}
        <div className="space-y-2 border-b border-gray-800/60 pb-6">
          <span className="text-[10px] font-black tracking-widest text-brand-secondary uppercase font-mono">
            Training Directory
          </span>
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white font-heading">
            Browse All <span className="text-brand-primary">Classes</span>
          </h1>
        </div>

        {/* Control Layer (Client Input Shell pushing parameters directly to URL) */}
        <SearchAndFilter activeFilters={filters} />

        {/* Core Catalog Dynamic Grid Layout presentation */}
        {error ? (
          <p className="text-sm text-red-400 font-mono font-medium">{error}</p>
        ) : classes.length === 0 ? (
          <div className="bg-[#171b20] border border-gray-800 rounded-2xl p-12 text-center space-y-2">
            <p className="text-sm text-gray-400 font-medium">
              No fitness programs found matching your selected search criteria.
            </p>
            <p className="text-xs text-gray-600 font-mono">
              Try adjusting your experience level or text parameters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {classes.map((item) => (
              <ClassCard key={item._id} fitnessClass={item} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
