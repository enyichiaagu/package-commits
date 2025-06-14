const TOKEN_LOCATION = 'localstorage-github-token';

function useLocalToken() {
  return {
    get: () => {
      if (typeof window === 'undefined') return '';
      return localStorage.getItem(TOKEN_LOCATION) ?? '';
    },
    set: (token: string) => {
      if (typeof window !== 'undefined')
        return localStorage.setItem(TOKEN_LOCATION, token);
    },
  };
}

export default useLocalToken;
