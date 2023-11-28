import {LocalStorageKeysEnums} from '@/infra/external-service/local-storage/local-storage-enums';
import {
  AiToolCategoryMap,
  AiToolPlatformMap,
  AiToolPricingMap,
  InfoAiToolOnLoad,
} from '@/infra/types/ai-tool.type';

export class LocalStorageService {
  private static instance: LocalStorageService;

  public static getInstance(): LocalStorageService {
    if (!LocalStorageService.instance) {
      LocalStorageService.instance = new LocalStorageService();
    }

    return LocalStorageService.instance;
  }

  getInfoAiToolOnLoadedData(): InfoAiToolOnLoad | null {
    const data = localStorage.getItem(
      LocalStorageKeysEnums.AI_TOOL_INFO_ON_LOAD,
    );
    return data ? (JSON.parse(data) as InfoAiToolOnLoad) : null;
  }

  setInfoAiToolOnLoadedData(data: InfoAiToolOnLoad): void {
    localStorage.setItem(
      LocalStorageKeysEnums.AI_TOOL_INFO_ON_LOAD,
      JSON.stringify(data),
    );
  }

  getCategoriesAiToolMap(): AiToolCategoryMap | null {
    const data = localStorage.getItem(
      LocalStorageKeysEnums.AI_TOOL_CATEGORIES_MAP,
    );
    return data ? (JSON.parse(data) as AiToolCategoryMap) : null;
  }

  setCategoriesAiToolMap(data: AiToolCategoryMap): void {
    localStorage.setItem(
      LocalStorageKeysEnums.AI_TOOL_CATEGORIES_MAP,
      JSON.stringify(data),
    );
  }

  getPriceAiToolMap(): AiToolPricingMap | null {
    const data = localStorage.getItem(LocalStorageKeysEnums.AI_TOOL_PRICE_MAP);
    return data ? (JSON.parse(data) as AiToolPricingMap) : null;
  }
  setPriceAiToolMap(data: AiToolPricingMap): void {
    localStorage.setItem(
      LocalStorageKeysEnums.AI_TOOL_PRICE_MAP,
      JSON.stringify(data),
    );
  }

  getPlatformAiToolMap(): AiToolPlatformMap | null {
    const data = localStorage.getItem(
      LocalStorageKeysEnums.AI_TOOL_PLATFORM_MAP,
    );
    return data ? (JSON.parse(data) as AiToolPlatformMap) : null;
  }

  setPlatformAiToolMap(data: AiToolPlatformMap): void {
    localStorage.setItem(
      LocalStorageKeysEnums.AI_TOOL_PLATFORM_MAP,
      JSON.stringify(data),
    );
  }
}
