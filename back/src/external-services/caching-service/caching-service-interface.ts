export interface CachingServiceInterface<T> {
  create(key: string, value: T): void;
  read(key: string): T;
  getAll(): Map<string, T>;
}
