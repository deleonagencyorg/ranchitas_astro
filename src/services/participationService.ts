// src/services/participationService.ts

// Asegúrate de que tus variables de entorno estén disponibles
const API_HOST = import.meta.env.PUBLIC_API_HOST;
const API_TOKEN = import.meta.env.PUBLIC_API_TOKEN;

interface Participation {
  id: number;
  description?: string;
  image?: string;
  thumbnail?: string;
  link?: string;
  channel?: string;
  store?: string;
  city?: string;
  country?: string;
  categories?: string[];
  registeredAt?: string;
  status?: boolean;
  contact?: {
    id: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    [key: string]: any;
  };
  [key: string]: any;
}

interface ApiResponse {
  data: Participation[];
  pagination?: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
  meta?: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

/**
 * Obtiene las participaciones de una promoción específica.
 * @param promotionId - El ID de la promoción.
 * @param page - El número de página a solicitar.
 * @param pageSize - El número de items por página.
 * @returns Una promesa que se resuelve con los datos de las participaciones.
 */
export async function getParticipations(
  promotionId: number,
  page: number = 1,
  pageSize: number = 10,
  filters?: { country?: string; tags?: string | string[]; categories?: string | string[] }
): Promise<ApiResponse> {
  const params = new URLSearchParams();
  params.set('promotionId', String(promotionId));
  params.set('page', String(page));
  params.set('pageSize', String(pageSize));

  // Backward compatible: allow either filters.tags or filters.categories, but always send as tags[] to API
  const country = filters?.country?.trim();
  if (country) params.set('country', country);

  const tagsInput = (filters?.tags ?? filters?.categories);
  const tagsArray = Array.isArray(tagsInput) ? tagsInput : (tagsInput ? [tagsInput] : []);
  tagsArray.forEach(tag => {
    if (tag) params.append('tags[]', String(tag));
  });

  const url = `${API_HOST}/v1/auth/participations?${params.toString()}`;

  console.log('[ParticipationService] Fetching participations from:', url);

  if (!API_HOST || !API_TOKEN) {
    console.error('[ParticipationService] Error: PUBLIC_API_HOST o PUBLIC_API_TOKEN no están definidas en las variables de entorno.');
    throw new Error('Variables de entorno no configuradas.');
  }

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': API_TOKEN, // Enviando el token sin 'Bearer'
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`[ParticipationService] Error ${response.status}:`, errorBody);
      throw new Error(`Error al obtener las participaciones: ${response.statusText}`);
    }

    const rawData = await response.json();
    console.log('[ParticipationService] Received data:', rawData);
    
    const data: ApiResponse = {
      data: rawData.data || [],
      meta: {
        pagination: rawData.pagination || rawData.meta?.pagination || {
          page: page,
          pageSize: pageSize,
          pageCount: 1,
          total: 0
        }
      }
    };
    
    return data;

  } catch (error) {
    console.error('[ParticipationService] Ha ocurrido un error en el fetch:', error);
    throw error;
  }
}
