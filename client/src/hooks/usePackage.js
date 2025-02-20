import useSWR from 'swr';

const NPM_FETCH = 'https://registry.npmjs.org';

async function fetcher(pkg) {
  const response = await fetch(`${NPM_FETCH}/${pkg}/latest`);
  const data = await response.json();

  console.log(data);

  return {
    name: data.name,
    version: data.version,
    description: data.description,
    owner: data.repository.url.split('/')[3],
    repo: data.repository.url.split('/')[4].split('.')[0],
  };
}

function usePackage(pkg) {
  const { data, error, isLoading } = useSWR(pkg, fetcher);

  return { pkgData: data, isLoading, isError: error };
}

export default usePackage;
