/**
 * LinkClean
 * RFC 3986-inspired URL sanitizer with social URL recovery.
 *
 * Runtime: Browser / Node.js
 * Dependency: None
 */

export type TransformType =
  | "trim"
  | "remove-invisible"
  | "remove-control"
  | "recover-scheme"
  | "recover-separator"
  | "normalize-whitespace"
  | "add-scheme"
  | "normalize-url";

export interface Transformation {
  type: TransformType;
  description: string;
  before: string;
  after: string;
}

export interface SanitizeOptions {
  /**
   * Automatically add https:// if scheme is missing.
   */
  addProtocol?: boolean;

  /**
   * Remove zero-width and invisible Unicode characters.
   */
  removeInvisible?: boolean;

  /**
   * Recover common social media obfuscation.
   */
  recoverObfuscation?: boolean;

  /**
   * Reject URLs containing username/password.
   */
  rejectCredentials?: boolean;
}

export interface SanitizeResult {
  success: boolean;
  original: string;
  sanitized: string | null;
  parsed: {
    protocol: string;
    hostname: string;
    port: string;
    pathname: string;
    search: string;
    hash: string;
  } | null;
  transformations: Transformation[];
  errors: string[];
}

const DEFAULT_OPTIONS: Required<SanitizeOptions> = {
  addProtocol: true,
  removeInvisible: true,
  recoverObfuscation: true,
  rejectCredentials: true,
};

/**
 * RFC 3986 character definitions.
 */

const RFC3986 = {
  unreserved: /^[A-Za-z0-9\-._~]$/,
  genDelims: /^[:/?#\[\]@]$/,
  subDelims: /^[!$&'()*+,;=]$/,
  hex: /^[0-9A-Fa-f]{2}$/,
};

/**
 * Invisible Unicode characters.
 *
 * Includes:
 * - Zero-width space
 * - Zero-width non-joiner
 * - Zero-width joiner
 * - Word joiner
 * - BOM
 * - Soft hyphen
 */

const INVISIBLE_CHARACTERS =
  /[\u00AD\u034F\u061C\u115F\u1160\u17B4\u17B5\u180E\u200B-\u200F\u202A-\u202E\u2060-\u206F\u3164\uFEFF\uFFA0]/g;

/**
 * ASCII control characters.
 */

const CONTROL_CHARACTERS = /[\u0000-\u001F\u007F]/g;

/**
 * Add transformation to history.
 */

function record(
  transformations: Transformation[],
  type: TransformType,
  description: string,
  before: string,
  after: string,
): string {
  if (before !== after) {
    transformations.push({
      type,
      description,
      before,
      after,
    });
  }

  return after;
}

/**
 * Step 1: Remove surrounding whitespace.
 */

function trimInput(input: string, transformations: Transformation[]): string {
  return record(
    transformations,
    "trim",
    "Removed surrounding whitespace",
    input,
    input.trim(),
  );
}

/**
 * Step 2: Remove invisible Unicode characters.
 */

function removeInvisible(
  input: string,
  transformations: Transformation[],
): string {
  const output = input.replace(INVISIBLE_CHARACTERS, "");

  return record(
    transformations,
    "remove-invisible",
    "Removed invisible Unicode characters",
    input,
    output,
  );
}

/**
 * Step 3: Remove ASCII control characters.
 *
 * This is a recovery operation, not an RFC normalization rule.
 */

function removeControl(
  input: string,
  transformations: Transformation[],
): string {
  const output = input.replace(CONTROL_CHARACTERS, "");

  return record(
    transformations,
    "remove-control",
    "Removed ASCII control characters",
    input,
    output,
  );
}

/**
 * Step 4: Recover common social media obfuscation.
 *
 * Examples:
 * hxxps://example.com -> https://example.com
 * https[:]//example.com -> https://example.com
 * example[.]com -> example.com
 * example(dot)com -> example.com
 */

function recoverObfuscation(
  input: string,
  transformations: Transformation[],
): string {
  let output = input;

  // Recover HTTP/HTTPS scheme.
  output = output.replace(/^hxxps(?=[:：])/i, "https");

  output = output.replace(/^hxxp(?=[:：])/i, "http");

  // Recover colon separator.
  output = output.replace(/\[:\]|\(colon\)|\{colon\}/gi, ":");

  // Recover dot separator.
  output = output.replace(
    /\[(?:dot|\.)\]|\((?:dot|\.)\)|\{(?:dot|\.)\}/gi,
    ".",
  );

  // Recover Unicode fullwidth dot.
  output = output.replace(/。/g, ".");

  // Recover whitespace around domain dots.
  //
  // This is intentionally limited to the authority
  // section, not the URL path or query.
  const authorityMatch = output.match(/^(https?:\/\/)([^/?#]*)(.*)$/i);

  if (authorityMatch) {
    const [, scheme, authority, rest] = authorityMatch;

    const normalizedAuthority = authority.replace(/\s*\.\s*/g, ".");

    output = scheme + normalizedAuthority + rest;
  }

  return record(
    transformations,
    "recover-separator",
    "Recovered common URL obfuscation patterns",
    input,
    output,
  );
}

/**
 * Step 5: Validate RFC 3986 URI characters.
 *
 * Allowed:
 * - unreserved
 * - gen-delims
 * - sub-delims
 * - pct-encoded
 *
 * Raw Unicode and raw whitespace are not allowed
 * in RFC 3986 URI syntax.
 */

export function validateRFC3986Characters(input: string): boolean {
  for (let i = 0; i < input.length; i++) {
    const char = input[i];

    if (char === "%") {
      const encoded = input.slice(i + 1, i + 3);

      if (!RFC3986.hex.test(encoded)) {
        return false;
      }

      i += 2;
      continue;
    }

    if (
      RFC3986.unreserved.test(char) ||
      RFC3986.genDelims.test(char) ||
      RFC3986.subDelims.test(char)
    ) {
      continue;
    }

    return false;
  }

  return true;
}

/**
 * Step 6: RFC 3986 percent-encoding normalization.
 *
 * Decode percent-encoded unreserved characters.
 * Uppercase hexadecimal digits for other encodings.
 */

export function normalizePercentEncoding(input: string): string {
  return input.replace(/%([0-9a-fA-F]{2})/g, (_, hex: string) => {
    const char = String.fromCharCode(Number.parseInt(hex, 16));

    if (RFC3986.unreserved.test(char)) {
      return char;
    }

    return `%${hex.toUpperCase()}`;
  });
}

/**
 * Step 7: Validate and normalize HTTP/HTTPS URL.
 */

function normalizeHttpUrl(
  input: string,
  options: Required<SanitizeOptions>,
  transformations: Transformation[],
): {
  url: URL | null;
  error: string | null;
} {
  let value = input;

  // Reject whitespace inside the URL.
  //
  // Do not blindly remove it because spaces in paths
  // and query parameters may have semantic meaning.
  if (/\s/.test(value)) {
    return {
      url: null,
      error: "URL contains unsupported whitespace",
    };
  }

  // Add default protocol if missing.
  if (options.addProtocol && !/^[a-z][a-z\d+.-]*:/i.test(value)) {
    value = record(
      transformations,
      "add-scheme",
      "Added default HTTPS protocol",
      value,
      `https://${value}`,
    );
  }

  let url: URL;

  try {
    url = new URL(value);
  } catch {
    return {
      url: null,
      error: "Invalid URL structure",
    };
  }

  // Only HTTP and HTTPS are supported.
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    return {
      url: null,
      error: "Unsupported URL protocol",
    };
  }

  if (!url.hostname) {
    return {
      url: null,
      error: "Missing hostname",
    };
  }

  // Prevent URLs with embedded credentials.
  if (options.rejectCredentials && (url.username || url.password)) {
    return {
      url: null,
      error: "URLs containing credentials are not allowed",
    };
  }

  // Normalize scheme and hostname.
  url.protocol = url.protocol.toLowerCase();
  url.hostname = url.hostname.toLowerCase();

  return {
    url,
    error: null,
  };
}

/**
 * Main sanitizer.
 */

export function sanitizeUrl(
  input: string,
  customOptions: SanitizeOptions = {},
): SanitizeResult {
  const options = {
    ...DEFAULT_OPTIONS,
    ...customOptions,
  };

  const original = input;
  const transformations: Transformation[] = [];
  const errors: string[] = [];

  const fail = (error: string): SanitizeResult => ({
    success: false,
    original,
    sanitized: null,
    parsed: null,
    transformations,
    errors: [error],
  });

  if (!input || !input.trim()) {
    return fail("Input is empty");
  }

  let value = input;

  // Preprocessing.
  value = trimInput(value, transformations);

  if (options.removeInvisible) {
    value = removeInvisible(value, transformations);
  }

  value = removeControl(value, transformations);

  // Social URL recovery.
  if (options.recoverObfuscation) {
    value = recoverObfuscation(value, transformations);
  }

  value = value.trim();

  // Reject whitespace instead of silently removing it.
  if (/\s/.test(value)) {
    return fail("URL contains unsupported whitespace");
  }

  // Parse and normalize.
  const result = normalizeHttpUrl(value, options, transformations);

  if (!result.url) {
    return fail(result.error ?? "Invalid URL");
  }

  // URL.href is an ASCII URI serialization.
  let normalized = result.url.href;

  // RFC 3986 character validation.
  if (!validateRFC3986Characters(normalized)) {
    return fail("URL contains invalid RFC 3986 characters");
  }

  // Percent-encoding normalization.
  normalized = normalizePercentEncoding(normalized);

  record(
    transformations,
    "normalize-url",
    "Normalized URL according to RFC 3986 rules",
    value,
    normalized,
  );

  // Parse the final normalized URL.
  const finalUrl = new URL(normalized);

  return {
    success: true,
    original,
    sanitized: normalized,
    parsed: {
      protocol: finalUrl.protocol,
      hostname: finalUrl.hostname,
      port: finalUrl.port,
      pathname: finalUrl.pathname,
      search: finalUrl.search,
      hash: finalUrl.hash,
    },
    transformations,
    errors,
  };
}
