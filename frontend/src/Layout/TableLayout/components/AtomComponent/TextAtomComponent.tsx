import { Input } from "@mantine/core"

interface TextAtomComponentProps {
  defaultValue?: string
}

const TextAtomComponent = ({ defaultValue = "" }: TextAtomComponentProps) => {
  return <Input className="rounded-none " defaultValue={defaultValue} />
}

export default TextAtomComponent
