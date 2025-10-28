import ProgramView from "@/src/components/ProgramView"

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return (<ProgramView id={id} />
  )
}
