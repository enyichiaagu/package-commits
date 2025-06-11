const TOKEN_LOCATION = 'localstorage-github-token';

const getLocalToken = () => localStorage.getItem(TOKEN_LOCATION) || '';
const setLocalToken = (token: string) =>
  localStorage.setItem(TOKEN_LOCATION, token);

function useLocalToken() {
  const token = { getLocalToken, setLocalToken };
  return token;
}

export default useLocalToken;
