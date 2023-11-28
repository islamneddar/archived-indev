import {StringUtils} from '@/utils/string';
import {LocalStorageService} from '@/infra/external-service/local-storage/local-storage.service';

function useGetListAiToolCategories() {
  const infoAiToolOnLoadedData =
    LocalStorageService.getInstance().getInfoAiToolOnLoadedData();

  if (infoAiToolOnLoadedData === null) return [];

  const listAiToolsCategories = infoAiToolOnLoadedData.aiToolCategories;

  /*const categoriesAiToolMap = listAiToolsCategories.reduce((acc, category) => {
    acc[category.type] = category;
    return acc;
  }, {} as Record<string, CategoryAiToolWithId>);

  console.log('categoriesAiToolMap', categoriesAiToolMap);

  const listCategoriesAiTools = Array.from(Object.values(categoriesAiToolMap));*/

  listAiToolsCategories.sort((a, b) => {
    const firstLetterInA =
      StringUtils.getInstance().getFirstLetterAlphanumericInAString(a.name);
    const firstLetterInB =
      StringUtils.getInstance().getFirstLetterAlphanumericInAString(b.name);
    if (firstLetterInA && firstLetterInB) {
      return firstLetterInA.localeCompare(firstLetterInB);
    } else return 0;
  });

  listAiToolsCategories.unshift({
    aiToolCategoryId: 0,
    name: 'All',
    type: 'all',
  });

  return listAiToolsCategories;
}

export default useGetListAiToolCategories;
