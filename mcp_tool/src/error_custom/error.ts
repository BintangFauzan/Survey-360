export class SurveyError extends Error {
  public readonly status?: number;
  public readonly code?: string;
  public readonly message: string;

  constructor(message: string, status?: number, code?: string) {
    super(message);
    this.name = "SurveyError";
    this.status = status;
    this.code = code;
    this.message = message;
  }

  static fromResponse(response: any): SurveyError {
    const status = response.status;
    const data = response.data;

    if (status === 404) {
      return new SurveyError("Data tidak ditemukan", status, "NOT_FOUND");
    }
    if (status === 400) {
      return new SurveyError("Request tidak valid", status, "BAD_REQUEST");
    }
    if (status === 401) {
      return new SurveyError(
        "Unauthorized - Login diperlukan",
        status,
        "UNAUTHORIZED",
      );
    }
    if (status === 403) {
      return new SurveyError("Forbidden - Akses ditolak", status, "FORBIDDEN");
    }
    if (status === 500) {
      return new SurveyError("Internal server error", status, "INTERNAL_ERROR");
    }
    if (status === 429) {
      return new SurveyError("Too many requests", status, "RATE_LIMIT");
    }
    if (status === 503) {
      return new SurveyError(
        "Service unavailable",
        status,
        "SERVICE_UNAVAILABLE",
      );
    }

    return new SurveyError(
      data.message || "Terjadi kesalahan pada server",
      status,
    );
  }
}

export class NetworkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NetworkError";
  }
}
