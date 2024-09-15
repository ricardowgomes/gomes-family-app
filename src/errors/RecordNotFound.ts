export default class RecordNotFound extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RecordNotFound"; // Set the custom error name

    // Ensure the stack trace is properly captured
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
