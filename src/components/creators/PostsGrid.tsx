import { useState, useEffect, useCallback } from 'react';
import PostsFilter from './PostsFilter';

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

interface Participation {
  id: number;
  description?: string;
  image?: string;
  thumbnail?: string;
  link?: string;
  country?: string;
  categories?: string[];
  contact?: {
    firstName?: string;
    lastName?: string;
  };
}

interface PostsGridProps {
  categories: Category[];
  countries: Country[];
  initialParticipations: Participation[];
  initialPagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
  promotionId: number;
  initialTag?: string;
  initialCountry?: string;
  apiHost: string;
  apiToken: string;
}

export default function PostsGrid({
  categories,
  countries,
  initialParticipations,
  initialPagination,
  promotionId,
  initialTag = '',
  initialCountry = '',
  apiHost,
  apiToken
}: PostsGridProps) {
  const [participations, setParticipations] = useState<Participation[]>(initialParticipations);
  const [pagination, setPagination] = useState(initialPagination);
  const [currentPage, setCurrentPage] = useState(initialPagination.page);
  const [selectedCountry, setSelectedCountry] = useState(initialCountry);
  const [selectedTag, setSelectedTag] = useState(initialTag);
  const [loading, setLoading] = useState(false);

  // Single unified requester for filters + pagination (client → external API)
  const loadData = useCallback(async (page: number, country: string = '', tag: string = '') => {
    setLoading(true);
    // Small delay to ensure loading state is visible
    await new Promise((resolve) => setTimeout(resolve, 100));

    try {
      const params = new URLSearchParams();
      params.set('promotionId', String(promotionId));
      params.set('page', String(page));
      params.set('pageSize', String(pagination.pageSize));
      if (country) params.set('country', country);
      if (tag) params.append('tags[]', tag);

      const url = `${apiHost}/v1/auth/participations?${params.toString()}`;
      const res = await fetch(url, {
        headers: {
          Authorization: apiToken,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) throw new Error('Error al cargar participaciones');

      const json = await res.json();
      setParticipations(json?.data || []);
      // Support both shapes: { meta: { pagination } } or { pagination }
      const rawPag = (json?.meta && json.meta.pagination) || json?.pagination || null;
      const raw = rawPag || pagination;
      const newPagination = {
        page: Number(raw?.page) || Number(page) || 1,
        pageSize: Number(raw?.pageSize) || Number(pagination.pageSize) || 10,
        pageCount: Number(raw?.pageCount) || Number(pagination.pageCount) || 1,
        total: Number(raw?.total) || Number(pagination.total) || 0,
      };
      setPagination(newPagination);
      setCurrentPage(newPagination.page);
    } catch (error) {
      console.error('[PostsGrid] Error loading participations:', error);
    } finally {
      setLoading(false);
    }
  }, [promotionId, pagination.pageSize, pagination]);

  const handleFilterChange = useCallback((country: string, tag: string) => {
    setSelectedCountry(country);
    setSelectedTag(tag);
    // Reset to page 1 immediately so the active state updates
    setCurrentPage(1);
    setPagination((prev) => ({ ...prev, page: 1 }));
    // Fetch with page 1 for new filters
    loadData(1, country, tag);
  }, [loadData]);

  const handlePageChange = useCallback((page: number) => {
    // Optimistically update current page for immediate active state
    setCurrentPage(page);
    loadData(page, selectedCountry, selectedTag);
  }, [loadData, selectedCountry, selectedTag]);

  const countryMap: Record<string, { name: string; flag: string }> = {
    'guatemala': { name: 'Guatemala', flag: '🇬🇹' },
    'honduras': { name: 'Honduras', flag: '🇭🇳' },
    'el_salvador': { name: 'El Salvador', flag: '🇸🇻' },
    'nicaragua': { name: 'Nicaragua', flag: '🇳🇮' },
    'costa_rica': { name: 'Costa Rica', flag: '🇨🇷' },
    'republica_dominicana': { name: 'República Dominicana', flag: '🇩🇴' }
  };

  const getCountryInfo = (code?: string) => {
    if (!code) return { name: '', flag: '🌍' };
    return countryMap[code] || { name: code, flag: '🌍' };
  };

  const openLightbox = (p: Participation) => {
    const author = `${p.contact?.firstName || ''} ${p.contact?.lastName || ''}`.trim() || 'Anónimo';
    const displayImage = p.thumbnail || p.image || '';
    const isVideo = (p.image || displayImage).match(/\.(mp4|webm|mov)(\?|$)/i);
    
    const detail = {
      src: p.image || displayImage,
      type: isVideo ? 'video' : 'image',
      description: p.description || 'Sin descripción',
      author: author,
      country: p.country,
      categories: p.categories || []
    };
    
    document.dispatchEvent(new CustomEvent('show-lightbox', { detail }));
  };

  return (
    <>
      <PostsFilter
        categories={categories}
        countries={countries}
        initialTag={selectedTag}
        initialCountry={selectedCountry}
        promotionId={promotionId}
        onFilterChange={handleFilterChange}
      />

      <div className="relative min-h-[400px]">
        {/* Loading Overlay */}
        {loading && (
          <div className="absolute inset-0 bg-red/80 backdrop-blur-sm z-50 flex items-center justify-center rounded-lg">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent mb-4"></div>
              <p className="text-white text-xl font-bold">Cargando...</p>
            </div>
          </div>
        )}

        {/* Content */}
        {participations.length === 0 && !loading ? (
          <div className="text-center text-white text-xl md:text-2xl font-semibold py-20">
            Aún no hay resultados que mostrar.
          </div>
        ) : (
          <>
            <div className={`grid grid-cols-2 md:grid-cols-6 gap-4 md:gap-6 ${loading ? 'opacity-30' : 'opacity-100'} transition-opacity duration-300`}>
            {participations.map((p) => {
              const author = `${p.contact?.firstName || ''} ${p.contact?.lastName || ''}`.trim() || 'Anónimo';
              const displayImage = p.thumbnail || p.image || 'https://via.placeholder.com/400x600/ff6b35/ffffff?text=Ziba\'s+Creators';
              const countryInfo = getCountryInfo(p.country);
              const socialLinkBg = 'https://snack.yummiespromociones.com/zibas/socialmedia.webp';

              return (
                <button
                  key={p.id}
                  onClick={() => p.link ? window.open(p.link, '_blank') : openLightbox(p)}
                  className="block group relative overflow-hidden rounded-[2rem] transition-all duration-300 ease-in-out hover:shadow-[0_0_20px_rgba(0,0,0,0.3)] cursor-pointer"
                  style={{ aspectRatio: '9 / 16' }}
                >
                  {/* Background */}
                  <div className="absolute inset-0 w-full h-full">
                    <img
                      src={p.link ? socialLinkBg : displayImage}
                      alt={p.description || 'Post'}
                      className="w-full h-full object-cover transform transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-orange/70 via-orange/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Content */}
                  <div className="absolute inset-0 p-5 flex flex-col justify-end items-center text-center bg-gradient-to-t from-black/80 to-transparent">
                    <div className="w-full">
                      <div className="flex items-center justify-center text-white text-md font-bold gap-2 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        <span>{author}</span>
                      </div>

                      {p.country && (
                        <div className="flex items-center justify-center text-white text-md font-medium gap-1 mb-2 opacity-80">
                          <span>{countryInfo.flag}</span>
                          <span>{countryInfo.name}</span>
                        </div>
                      )}

                      {p.categories && p.categories.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-1">
                          {p.categories.map((cat, idx) => (
                            <span key={idx} className="bg-white/20 text-white text-md px-2 py-1 rounded-full">
                              {cat}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Pagination */}
          {pagination.pageCount > 1 && (
            <div className="mt-10 flex items-center justify-center gap-2 flex-wrap">
              <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); handlePageChange(currentPage - 1); }}
                disabled={currentPage <= 1 || loading}
                className="px-4 py-2 rounded-full bg-white/10 text-white font-semibold hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Anterior
              </button>
              
              {Array.from({ length: Number(pagination.pageCount) }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); handlePageChange(n); }}
                  disabled={loading}
                  className={`px-4 py-2 rounded-full font-semibold transition-all ${
                    n === Number(currentPage)
                      ? 'bg-orange text-white'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {n}
                </button>
              ))}
              
              <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); handlePageChange(currentPage + 1); }}
                disabled={currentPage >= pagination.pageCount || loading}
                className="px-4 py-2 rounded-full bg-white/10 text-white font-semibold hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Siguiente
              </button>
            </div>
          )}
          </>
        )}
      </div>
    </>
  );
}
