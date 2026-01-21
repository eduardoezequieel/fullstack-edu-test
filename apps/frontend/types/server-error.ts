export interface ServerErrorResponse {
  message: string | string[];
  error?: string;
  statusCode?: number;
}
