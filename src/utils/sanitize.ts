import DOMPurify from "dompurify";

export function sanitizeHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ["b", "i", "em", "strong", "a", "p", "br"],
    ALLOWED_ATTR: ["href", "target"],
  });
}

export function sanitizeText(input: string): string {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  });
}

// * Escape HTML entities (for displaying code/text as-is)

export function escapeHtml(text: string): string {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Sanitize URL to prevent javascript: protocol attacks
 */
export function sanitizeUrl(url: string): string {
  const cleaned = url.trim().toLowerCase();

  if (
    cleaned.startsWith("javascript:") ||
    cleaned.startsWith("data:") ||
    cleaned.startsWith("vbscript:")
  ) {
    return "";
  }

  return url;
}

/**
 * Validate and sanitize email
 */
export function sanitizeEmail(email: string | null | undefined): string {
  if (!email) return "";
  const cleaned = email.trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(cleaned) ? cleaned : "";
}

/**
 * Sanitize school subdomain (alphanumeric and hyphens only)
 */
export function sanitizeSubdomain(subdomain: string): string {
  return subdomain
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]/g, ""); // Remove anything that's not alphanumeric or hyphen
}
