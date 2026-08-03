// ── Generic API Response ──────────────────────────────────────

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: unknown;
}

// ── Pagination ────────────────────────────────────────────────

export interface PaginationMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

// ── Filter / Sort ─────────────────────────────────────────────

export interface FilterParams {
  [key: string]: string | number | boolean | string[] | undefined;
}

// ── Upload ────────────────────────────────────────────────────

export interface UploadResponse {
  url: string;
  path: string;
  size: number;
  mimeType: string;
}

// ── Webhook ───────────────────────────────────────────────────

export interface WebhookPayload {
  type: string;
  table: string;
  record: Record<string, unknown>;
  schema: string;
  old_record?: Record<string, unknown>;
}
