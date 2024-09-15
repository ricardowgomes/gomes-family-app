export default class OperationFailed extends Error {
  constructor(message: string) {
    super(message);
    this.name = "OperationFailed"; // Set the custom error name

    // Ensure the stack trace is properly captured
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
