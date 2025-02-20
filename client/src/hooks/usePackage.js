import useSWR from 'swr';

const NPM_FETCH = 'https://registry.npmjs.org';

async function fetcher(pkg) {
  const response = await fetch(`${NPM_FETCH}${pkg}/latest`);
  const data = await response.json();

  return {
    name: data.name,
    version: data.version,
    description: data?.description,
    owner:
      data?.repository?.url?.split('/')[3] && data?.repository?.type === 'git',
    repo:
      data?.repository?.url?.split('/')[4].split('.')[0] &&
      data?.repository?.type === 'git',
  };
}

function usePackage(pkg) {
  const { data, error, isLoading } = useSWR(`/${pkg}`, fetcher);
  return { pkgData: data, isLoading, isError: error };
}

export default usePackage;
