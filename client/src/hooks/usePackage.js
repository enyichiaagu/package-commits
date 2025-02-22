import useSWRImmutable from 'swr/immutable';

const NPM_FETCH = 'https://registry.npmjs.org';

async function fetcher(pkg) {
  const response = await fetch(`${NPM_FETCH}/${pkg}/latest`);
  const data = await response.json();

  const isGitRepo = data?.repository?.type === 'git';

  return {
    name: data.name,
    version: data.version,
    description: data?.description,
    owner: isGitRepo ? data?.repository?.url?.split('/')[3] : undefined,
    repo: isGitRepo
      ? data?.repository?.url?.split('/')[4].split('.')[0]
      : undefined,
    path: isGitRepo ? data?.repository?.directory : undefined,
  };
}

function usePackage(pkg) {
  const { data, error, isLoading } = useSWRImmutable(pkg, fetcher);
  return { pkgData: data, isLoading, isError: error };
}

export default usePackage;
