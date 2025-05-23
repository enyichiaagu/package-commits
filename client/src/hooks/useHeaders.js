import useLocalToken from './useLocalToken';

function useHeaders() {
  const token = useLocalToken();

  return {
    get: () => {
      let localToken = token.getLocalToken();

      return {
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        Authorization: localToken ? `Bearer ${localToken}` : undefined,
      };
    },
  };
}

export default useHeaders;
