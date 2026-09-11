/**
 * WhatsApp & Mobile Sharing Utilities for VISTA (Visual Intelligence Storytelling & Transformation Architecture)
 */

export function createWhatsAppShareUrl(text: string): string {
  // Truncate if unreasonably long for URL limits, but standard WhatsApp URL supports large text
  const cleanText = text.trim();
  return `https://api.whatsapp.com/send?text=${encodeURIComponent(cleanText)}`;
}

export function openWhatsAppShare(text: string) {
  const url = createWhatsAppShareUrl(text);
  // Using an anchor click ensures compatibility inside iframe sandboxes
  const link = document.createElement('a');
  link.href = url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
