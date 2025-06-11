class CustomError extends Error {
  name = 'CustomError';

  constructor(
    message = 'Something Went Wrong',
    readonly status?: number,
    options?: ErrorOptions
  ) {
    super(message, options);
  }

  get isTokenError() {
    return this.status === 401 || this.status === 403;
  }
}

async function resolveRes<T>(response: Response): Promise<T> {
  if (response.ok) return response.json();
  switch (response.status) {
    case 401:
      throw new CustomError('Bad Credentials', response.status);
    case 403:
      throw new CustomError('Rate Limit Exceeded!', response.status);
    case 404:
      throw new CustomError('Resource Not Found', response.status);
    case 422:
      throw new CustomError(
        response.url.includes('search/issues')
          ? 'Issues Not Available'
          : 'Data Not Available',
        response.status
      );
    default:
      throw new CustomError();
  }
}

const finalCatch = (err: unknown) => {
  if (err instanceof CustomError) throw err;
  throw new CustomError();
};

export { resolveRes, finalCatch, CustomError };
