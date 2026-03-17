import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/assets/lucas-kaique-resume.pdf',
      permanent: true,
    },
  }
}

export default function Resume() {
  return null
}
