export class HealthResponseDto {
  status: 'ok' | 'error';
  database: 'connected' | 'disconnected';
  timestamp?: string;
  environment?: string;
  error?: string;
}
