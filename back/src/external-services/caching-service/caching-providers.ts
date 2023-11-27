import {CACHING_SERVICE_PROVIDER_KEY} from '@/external-services/caching-service/common';
import {InMemoryService} from '@/external-services/caching-service/strategies/in-memory-service';

export const InMemoryCachingProvider = {
  provide: CACHING_SERVICE_PROVIDER_KEY,
  useClass: InMemoryService,
};
