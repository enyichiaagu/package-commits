import useLocalToken from './useLocalToken';

export interface CustomHeaderType {
  get: () => HeadersInit;
}

function useHeaders(): CustomHeaderType {
  const token = useLocalToken();
  return {
    get: () => ({
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      Authorization: token.get() ? `Bearer ${token.get()}` : '',
    }),
  };
}

export default useHeaders;
