export type ConnectionStatus = 'loading' | 'success' | 'error';

export interface HealthCheckData {
  status: 'ok' | 'error';
  database: 'connected' | 'disconnected';
  timestamp?: string;
  environment?: string;
  error?: string;
}

// Wrapper padrão da API
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export type HealthCheckResponse = ApiResponse<HealthCheckData>;

export interface HealthStatus {
  api: ConnectionStatus;
  database: ConnectionStatus;
}
