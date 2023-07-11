import { useRouter } from 'next/router';

import { LayoutLoading } from '~/components/common/layout-loading';
import PersonPageContent from '~/components/people/person/page-content';

export default function PersonPage() {
  const { query, isReady } = useRouter();
  if (!isReady) return <LayoutLoading />;
  return <PersonPageContent personId={Number(query.id)} />;
}
