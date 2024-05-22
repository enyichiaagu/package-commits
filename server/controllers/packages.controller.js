const NPM_REGISTRY = 'https://registry.npmjs.org';

async function packageLatestVersion(packageName) {
	const packageInfo = await fetch(`${NPM_REGISTRY}/${packageName}`);
	const packageData = await packageInfo.json();
	const latestVersion = packageData['dist-tags'].latest;
	return packageData.versions[latestVersion];
}

async function packageIdentification(packageName) {
	const npmPackage = await packageLatestVersion(packageName);
	const issuesUrl = npmPackage.bugs.url.split('/');
	const owner = issuesUrl[3];
	const repo = issuesUrl[4];

	return { owner, repo };
}

async function getPackage(req, res) {
	const { packageName } = req.params;
	const { owner, repo } = await packageIdentification(packageName);
	res.send({ owner, repo });
}

export { getPackage };
