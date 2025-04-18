class CustomError extends Error {
  constructor(message = 'Something Went Wrong', options) {
    super(message, options);

    this.name = 'CustomError';
  }
}

export { CustomError };
