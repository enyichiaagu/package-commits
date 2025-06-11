import useSWRImmutable from 'swr/immutable';
import { finalCatch, resolveRes, type CustomError } from './utils/errors';

const NPM_FETCH = 'https://registry.npmjs.org';

interface Package {
  name: string;
  version: string;
  description?: string;
  homepage?: string;
}

interface FetchedPackage extends Package {
  repository?: { type?: string; url: string; directory?: string };
}

export interface PackageData extends Package {
  owner?: string;
  repo?: string;
  path?: string;
}

async function fetcher(pkg: string): Promise<PackageData> {
  try {
    const response = await fetch(`${NPM_FETCH}/${pkg}/latest`);
    const data = await resolveRes<FetchedPackage>(response);
    let repo = data.repository;
    let url = repo?.url;

    let isGitRepo = repo?.type === 'git' || Boolean(url?.endsWith('.git'));
    let location = isGitRepo
      ? url?.match(/github\.com\/(.*?)\.git/)?.[1]?.split('/') ?? null
      : null;

    return {
      name: data.name,
      version: data.version,
      description: data.description,
      homepage: data.homepage,
      ...(location && {
        owner: location[0],
        repo: location[1],
        path: repo?.directory,
      }),
    };
  } catch (err) {
    return finalCatch(err);
  }
}

function usePackage(pkg: string | undefined) {
  const { data, error, isLoading } = useSWRImmutable<PackageData, CustomError>(
    pkg,
    fetcher
  );
  return { pkgData: data, isLoading, error };
}

export default usePackage;
