import {Inject, Injectable} from '@nestjs/common';
import {CACHING_SERVICE_PROVIDER_KEY} from '@/external-services/caching-service/common';
import {CachingServiceInterface} from '@/external-services/caching-service/caching-service-interface';

@Injectable()
export class CachingService {
  constructor(
    @Inject(CACHING_SERVICE_PROVIDER_KEY)
    private readonly cachingService: CachingServiceInterface<any>,
  ) {}

  create(key: string, value: any) {
    this.cachingService.create(key, value);
  }

  read(key: string) {
    return this.cachingService.read(key);
  }

  getAll() {
    return this.cachingService.getAll();
  }
}
