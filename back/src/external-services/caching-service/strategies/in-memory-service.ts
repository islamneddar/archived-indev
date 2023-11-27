import {Injectable} from '@nestjs/common';
import {CachingServiceInterface} from '@/external-services/caching-service/caching-service-interface';

@Injectable()
export class InMemoryService<T> implements CachingServiceInterface<T> {
  private dataStore: Map<string, T> = new Map();

  create(key: string, value: T) {
    console.log('InMemoryService.create');
    this.dataStore.set(key, value);
  }

  read(key: string) {
    console.log('InMemoryService.read => ', key);
    return this.dataStore.get(key);
  }

  getAll() {
    return this.dataStore;
  }
}
