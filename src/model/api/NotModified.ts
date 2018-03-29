export default class NotModified extends Error {
  constructor() {
    super("HTTP status NotModified 304");

    // Set the prototype explicitly
    Object.setPrototypeOf(this, NotModified.prototype);
  }
}
