export type VideoHost = 'youtube' | 'file';

const YOUTUBE_HOSTS = new Set(['youtube', 'yt']);

export function resolveVideoHost(videoUrl: string, host?: string): VideoHost {
  const normalizedHost = (host || '').trim().toLowerCase();

  if (normalizedHost) {
    return YOUTUBE_HOSTS.has(normalizedHost) ? 'youtube' : 'file';
  }

  const url = videoUrl.toLowerCase();
  if (
    url.includes('youtube.com') ||
    url.includes('youtu.be') ||
    url.includes('youtube-nocookie.com')
  ) {
    return 'youtube';
  }

  return 'file';
}

export function toYoutubeEmbedUrl(videoUrl: string): string {
  let embedUrl = videoUrl;

  if (videoUrl.includes('youtube.com/watch?v=')) {
    const videoId = new URL(videoUrl).searchParams.get('v');
    embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  } else if (videoUrl.includes('youtu.be/')) {
    const videoId = videoUrl.split('youtu.be/')[1]?.split('?')[0];
    embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  } else if (videoUrl.includes('youtube.com/shorts/')) {
    const videoId = videoUrl.split('youtube.com/shorts/')[1]?.split('?')[0];
    embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  } else if (videoUrl.includes('youtube.com/embed/')) {
    embedUrl = videoUrl.includes('?') ? `${videoUrl}&autoplay=1` : `${videoUrl}?autoplay=1`;
  }

  return embedUrl;
}

export function escapeForInlineJs(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

export function buildVideoModalOnclick(video: string, host?: string): string {
  const escapedUrl = escapeForInlineJs(video);
  const escapedHost = escapeForInlineJs(host || '');

  return `event.stopPropagation(); if(window.openVideoModal) window.openVideoModal('${escapedUrl}', '${escapedHost}');`;
}

export function getRecipeVideoHost(recipe: { video_host?: string; host?: string }): string {
  return recipe.video_host || recipe.host || '';
}
