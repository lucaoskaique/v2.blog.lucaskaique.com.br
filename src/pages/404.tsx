import { Container } from "@/components/Container"
import Empty from "@/components/Empty"
import Base from "@/templates/Base"

export default function Page404() {
  return (
    <Base>
      <Container className="flex h-full items-center pt-16 sm:pt-32">
        <Empty
          title="Page not found"
          description="Sorry, we couldn’t find the page you’re looking for."
          hasLink
        />
      </Container>
    </Base>
  )
}
