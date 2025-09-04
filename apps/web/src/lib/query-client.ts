import { QueryClient } from '@tanstack/react-query';
import { initTsrReactQuery } from '@ts-rest/react-query/v5';
import { api } from '@repo/contracts';

const queryClient = new QueryClient();

export default queryClient;

export const tsr = initTsrReactQuery(api, {
    baseUrl: 'http://localhost:3001',
});
