import useSWR from 'swr';

const NPM_FETCH = 'https://registry.npmjs.org';

async function fetcher(pkg) {
  const response = await fetch(`${NPM_FETCH}/${pkg}/latest`);
  const data = response.json();

  return data;
}

function usePackage(pkg) {
  const { data, error, isLoading } = useSWR(pkg, fetcher);
  let pkgData;

  if (data) {
    const { name, version, description } = data;
    pkgData = { name, version, description };
  }

  return { pkgData: pkgData ?? data, isLoading, isError: error };
}

export default usePackage;
