class CustomError extends Error {
  constructor(message = 'Something Went Wrong', options) {
    super(message, options);

    this.name = 'CustomError';
  }
}

async function resolveRes(response) {
  if (response.ok) return await response.json();
  if (response.status === 404) throw new CustomError('Resource Not Found');
  throw new CustomError();
}

export { CustomError, resolveRes };
