export class EntityNotFoundError extends Error {
  constructor(message: string) {
    if (message) {
      super(message);
    } else {
      super('Entity not found');
    }
  }
}
