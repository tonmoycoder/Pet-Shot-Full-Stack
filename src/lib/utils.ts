export { cn } from "cn";

export function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
}

export function resolveImageUrl(url: string | null | undefined): string {
  if (!url) return '';
  if (url.startsWith('/api/media/file/')) {
    return url.replace('/api/media/file/', '/media/');
  }
  return url;
}
