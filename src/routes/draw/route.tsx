import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/draw')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/draw"!</div>
}
