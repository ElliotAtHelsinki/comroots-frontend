import { FormControl, FormErrorMessage, FormLabel, Input, Textarea } from '@chakra-ui/react'
import { PropsOf } from '@chakra-ui/react'
import autosize from 'autosize'
import { useField } from 'formik'
import dynamic from 'next/dynamic'
import { InputHTMLAttributes, TextareaHTMLAttributes, useEffect, useRef } from 'react'
const Quill = dynamic(() => import('./Quill.client'), { ssr: false })
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

type InputFieldProps =
  (
    InputHTMLAttributes<HTMLInputElement> & PropsOf<typeof Input> &
    TextareaHTMLAttributes<HTMLTextAreaElement> & PropsOf<typeof Textarea> &
    PropsOf<typeof ReactQuill>
  ) & {
    label: string
    name: string
    inputType?: 'input' | 'textarea' | 'quill'
    onQuillChangeEffect?: () => void
  }

type InputComponentProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  name: string
  size?: any
}

type TextAreaComponentProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string
  name: string
  size?: any
}

type QuillComponentProps = PropsOf<typeof ReactQuill> & {
  label: string
  name: string
  onQuillChangeEffect?: () => void
}

const InputComponent = (props: InputComponentProps): JSX.Element => {
  const { label, name, ...rest } = props
  const [field, { error }] = useField(props)
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Input {...field} {...props} id={field.name} focusBorderColor='green.400' spellCheck={false} />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  )
}

const TextAreaComponent = (props: TextAreaComponentProps): JSX.Element => {
  const { label, name, ...rest } = props
  const [field, { error }] = useField(props)
  const ref = useRef()
  useEffect(() => {
    const current = ref.current
    autosize(current)
    return () => {
      autosize.destroy(current)
    }
  }, [])
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Textarea {...field} {...props} id={field.name} ref={ref} focusBorderColor='green.400' spellCheck={false} />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  )
}

const QuillComponent = (props: QuillComponentProps): JSX.Element => {
  const { label, name, onQuillChangeEffect, ...rest } = props
  const [{ name: fieldName, onBlur, value }, { error }, { setValue }] = useField<string>({ name })

  const handleChange = (value: string) => {
    setValue(value)
    if (onQuillChangeEffect) {
      onQuillChangeEffect()
    }
  }
  const handleEditorBlur = () => {
    onBlur({ target: { name } })
  }

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={fieldName}>{label}</FormLabel>
      <Quill
        value={value}
        onChange={handleChange}
        onBlur={handleEditorBlur}
        id={fieldName}
        {...props}

      />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  )
}

export const InputField = (props: InputFieldProps): JSX.Element => {
  const { label, name, inputType = 'input', onQuillChangeEffect, ...rest } = props
  return (
    <>
      {
        inputType == 'input' &&
        <InputComponent label={label} name={name} {...rest} />
      }
      {
        inputType == 'textarea' &&
        <TextAreaComponent label={label} name={name} {...rest} />
      }
      {
        inputType == 'quill' &&
        <QuillComponent label={label} name={name} {...rest} onQuillChangeEffect={onQuillChangeEffect} />
      }
    </>
  )
}