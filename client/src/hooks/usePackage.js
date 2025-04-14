import useSWRImmutable from 'swr/immutable';

const NPM_FETCH = 'https://registry.npmjs.org';

async function fetcher(pkg) {
  const response = await fetch(`${NPM_FETCH}/${pkg}/latest`);
  const data = await response.json();
  let repo = data?.repository;
  let url = repo?.url;

  let isGitRepo = repo?.type === 'git' || url?.endsWith('.git');
  let location = isGitRepo
    ? url?.match(/github\.com\/(.*?)\.git/)?.[1]?.split('/')
    : null;

  return {
    name: data.name,
    version: data.version,
    description: data?.description,
    homepage: data?.homepage,
    ...(location && {
      owner: location[0],
      repo: location[1],
      path: repo?.directory,
    }),
  };
}

function usePackage(pkg) {
  const { data, error, isLoading } = useSWRImmutable(pkg, fetcher);
  return { pkgData: data, isLoading, isError: error };
}

export default usePackage;
