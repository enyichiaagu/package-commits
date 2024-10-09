import { useCallback, useEffect, useState } from 'react';
import { httpGetAllCommits } from './requests';

function useCommits(repo, year, path) {
  const [commits, saveCommits] = useState([]);

  const getCommits = useCallback(async () => {
    const fetchedCommits = await httpGetAllCommits(repo, year, path);
    saveCommits(fetchedCommits);
  }, [repo, year, path]);

  useEffect(() => {
    getCommits();
  }, [getCommits]);

  return commits;
}

export default useCommits;
