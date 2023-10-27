'use client';
import {useRouter} from 'next/navigation';
import useSessionAuthClient from '@/hooks/useSessionAuthClient';
import {routingConstant} from '@/routing/routing.constant';
import {useQuery} from 'react-query';
import {AiToolService} from '@/service/ai-tool.service';

export default function Layout({children}: {children: React.ReactNode}) {
  const {session, adminSessionSelector} = useSessionAuthClient();

  const router = useRouter();

  const getAllInfoNeededFromAiTool = useQuery({
    queryKey: ['getAllInfoNeededFromAiTool'],
    queryFn: async () => {
      const listCategory =
        await AiToolService.getInstance().getAllAiToolCategory(
          adminSessionSelector.user.accessToken,
        );
      const listPricing = await AiToolService.getInstance().getAllAiToolPricing(
        adminSessionSelector.user.accessToken,
      );
      const listPlatforms =
        await AiToolService.getInstance().getAllAiToolPlatform(
          adminSessionSelector.user.accessToken,
        );

      localStorage.setItem(
        'mapCategory',
        JSON.stringify(
          listCategory.reduce((acc, category) => {
            acc[category.type] = category;
            return acc;
          }, {} as Record<string, any>),
        ),
      );
      localStorage.setItem(
        'mapPricing',
        JSON.stringify(
          listPricing.reduce((acc, pricing) => {
            acc[pricing.type] = pricing;
            return acc;
          }, {} as Record<string, any>),
        ),
      );
      localStorage.setItem(
        'mapPlatforms',
        JSON.stringify(
          listPlatforms.reduce((acc, platform) => {
            acc[platform.type] = platform;
            return acc;
          }, {} as Record<string, any>),
        ),
      );
    },
    enabled: !!adminSessionSelector.user.accessToken,
    keepPreviousData: false,
  });

  if (session.status === 'loading') {
    return <></>;
  } else if (session.status === 'authenticated') {
    return <>{children}</>;
  } else {
    return router.push(routingConstant.auth.login);
  }
}
