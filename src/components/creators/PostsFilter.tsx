import { useState, useEffect, useRef } from 'react';

interface Category {
  id: string;
  name: string;
  emoji: string;
}

interface Country {
  id: string;
  name: string;
  flag: string;
}

interface PostsFilterProps {
  categories: Category[];
  countries: Country[];
  initialTag?: string;
  initialCountry?: string;
  promotionId: number;
  onFilterChange: (country: string, tag: string) => void;
}

export default function PostsFilter({
  categories,
  countries,
  initialTag = '',
  initialCountry = '',
  promotionId,
  onFilterChange
}: PostsFilterProps) {
  const [selectedTag, setSelectedTag] = useState(initialTag);
  const [selectedCountry, setSelectedCountry] = useState(initialCountry);
  const isInitialMount = useRef(true);

  useEffect(() => {
    // Skip the initial mount to avoid calling onFilterChange with initial values
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Update URL without reload
    const url = new URL(window.location.href);
    const params = new URLSearchParams();
    
    if (selectedCountry) params.set('country', selectedCountry);
    if (selectedTag) params.append('tags[]', selectedTag);
    
    url.search = params.toString();
    window.history.pushState({}, '', url.toString());
    
    // Notify parent component
    onFilterChange(selectedCountry, selectedTag);
  }, [selectedTag, selectedCountry]); // Removed onFilterChange from dependencies

  const handleTagClick = (tagId: string) => {
    setSelectedTag(tagId);
  };

  const handleCountryClick = (countryId: string) => {
    setSelectedCountry(countryId);
  };

  return (
    <div className="mb-8 space-y-6">
      {/* Category Filters */}
      <div className="flex flex-col items-center gap-4">
        <h4 className="text-white text-xl md:text-2xl font-bold">Categorías</h4>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => handleTagClick('')}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              !selectedTag
                ? 'bg-orange text-white shadow-lg scale-105'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            Todas
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleTagClick(cat.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                selectedTag === cat.id
                  ? 'bg-orange text-white shadow-lg scale-105'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <span className="mr-2">{cat.emoji}</span>
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Country Filters */}
      <div className="flex flex-col items-center gap-4">
        <h4 className="text-white text-xl md:text-2xl font-bold">Países</h4>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => handleCountryClick('')}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              !selectedCountry
                ? 'bg-orange text-white shadow-lg scale-105'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            Todos
          </button>
          {countries.map((country) => (
            <button
              key={country.id}
              onClick={() => handleCountryClick(country.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                selectedCountry === country.id
                  ? 'bg-orange text-white shadow-lg scale-105'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <span className="mr-2">{country.flag}</span>
              {country.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
