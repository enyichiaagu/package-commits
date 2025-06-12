// import useLocalToken from './useLocalToken';

function useHeaders() {
  // const token = useLocalToken();

  return {
    get: (): HeadersInit => {
      // let localToken = token.getLocalToken();
      let localToken = undefined;

      return {
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        Authorization: localToken ? `Bearer ${localToken}` : '',
      };
    },
  };
}

export default useHeaders;
