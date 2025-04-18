import useSWRImmutable from 'swr/immutable';
import { CustomError } from './utils/errors';

const NPM_FETCH = 'https://registry.npmjs.org';

async function fetcher(pkg) {
  try {
    const response = await fetch(`${NPM_FETCH}/${pkg}/latest`);
    if (response.status === 404) throw new CustomError('Package Not Found');
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
  } catch (err) {
    if (err instanceof CustomError) throw err;
    else throw new CustomError();
  }
}

function usePackage(pkg) {
  const { data, error, isLoading } = useSWRImmutable(pkg, fetcher);
  return { pkgData: data, isLoading, error };
}

export default usePackage;
