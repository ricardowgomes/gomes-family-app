export default class RecordNotCreated extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RecordNotCreated"; // Set the custom error name

    // Ensure the stack trace is properly captured
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
