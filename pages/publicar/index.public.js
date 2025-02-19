import { Box, Content, DefaultLayout, Flash, Heading, Link } from '@/TabNewsUI';
import { useRouter } from 'next/router';
import { useUser } from 'pages/interface';
import { useEffect } from 'react';
import useSWR from 'swr';

export default function Post() {
  const router = useRouter();
  const { user, isLoading } = useUser();
  const { data: contents } = useSWR(user ? `/api/v1/contents/${user.username}?strategy=new&per_page=1` : null, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  useEffect(() => {
    if (router && !user && !isLoading) {
      router.push(`/login?redirect=${router.asPath}`);
    }
  }, [user, router, isLoading]);

  return (
    <DefaultLayout metadata={{ title: 'Publicar novo conteúdo' }}>
      {contents?.length === 0 && (
        <Box sx={{ width: '100%', mb: 3 }}>
          <Flash variant="warning">
            ⚠ Atenção: Pedimos encarecidamente que{' '}
            <Link href="https://www.tabnews.com.br/filipedeschamps/tentando-construir-um-pedaco-de-internet-mais-massa">
              leia isso antes
            </Link>{' '}
            de fazer sua primeira publicação.
          </Flash>
        </Box>
      )}

      <Heading as="h1" sx={{ mb: 3 }}>
        Publicar novo conteúdo
      </Heading>
      <Content mode="edit" />
    </DefaultLayout>
  );
}
