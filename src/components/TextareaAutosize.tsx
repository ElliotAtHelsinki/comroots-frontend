import { Textarea } from '@chakra-ui/react'
import { PropsOf } from '@chakra-ui/react'
import autosize from 'autosize'
import { useRef, useEffect } from 'react'

type TextareaAutosizeProps = PropsOf<typeof Textarea>

export const TextareaAutosize = (props: TextareaAutosizeProps): JSX.Element => {
  const ref = useRef()
  useEffect(() => {
    const current = ref.current
    autosize(current)
    return () => {
      autosize.destroy(current)
    }
  }, [])
  return (
    <Textarea {...props} ref={ref} focusBorderColor='green.400' spellCheck={false} />
  )
}