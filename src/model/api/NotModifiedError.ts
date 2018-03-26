export default class NotModifiedError extends Error {
  constructor() {
    super("HTTP status NotModified 304");

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, NotModifiedError.prototype);
  }
}
