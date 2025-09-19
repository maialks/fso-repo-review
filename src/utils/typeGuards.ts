import type { AuthResult, GraphQLErrorWithAuth } from '../types';

export function isAuthResult(data: unknown): data is AuthResult {
  return (
    typeof data === 'object' &&
    data !== null &&
    'authenticate' in data &&
    typeof (data as any).authenticate === 'object' &&
    (data as any).authenticate !== null &&
    'accessToken' in (data as any).authenticate &&
    typeof (data as any).authenticate.accessToken === 'string'
  );
}

export function isGraphQLErrorWithAuth(
  error: unknown,
): error is GraphQLErrorWithAuth {
  return (
    typeof error === 'object' &&
    error !== null &&
    'name' in error &&
    (error as any).name === 'CombinedGraphQLErrors' &&
    'data' in error &&
    typeof (error as any).data === 'object' &&
    (error as any).data !== null &&
    'authenticate' in (error as any).data &&
    (error as any).data.authenticate === null
  );
}
