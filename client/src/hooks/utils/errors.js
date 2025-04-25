class CustomError extends Error {
  name = 'CustomError';
  message = 'Something Went Wrong';
  status;

  constructor({ message, status }, options) {
    super(message, options);
    this.message = message;
    this.status = status;
  }

  get isTokenError() {
    return this.status === 401 || this.status === 403;
  }
}

async function resolveRes(response) {
  if (response.ok) return response.json();
  switch (response.status) {
    case 401:
      throw new CustomError({
        message: 'Bad Credentials',
        status: response.status,
      });
    case 403:
      throw new CustomError({
        message: 'Rate Limit Exceeded!',
        status: response.status,
      });
    case 404:
      throw new CustomError({
        message: 'Resource Not Found',
        status: response.status,
      });
    default:
      throw new CustomError();
  }
}

const finalCatch = (err) => {
  if (err instanceof CustomError) throw err;
  throw new CustomError();
};

export { resolveRes, finalCatch };
