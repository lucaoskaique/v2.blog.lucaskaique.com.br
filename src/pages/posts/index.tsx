import { GetServerSideProps } from 'next'

import { defaultLocale } from '@/lib/i18n'

export default function PostsRedirect() {
  return null
}

export const getServerSideProps: GetServerSideProps = async ({ resolvedUrl }) => {
  return {
    redirect: {
      destination: `/${defaultLocale}${resolvedUrl}`,
      permanent: false,
    },
  }
}
