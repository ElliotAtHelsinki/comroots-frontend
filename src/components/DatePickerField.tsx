import { FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react'
import { PropsOf } from '@chakra-ui/react'
import { DatePicker } from '@mantine/dates'
import { useField } from 'formik'
import { useRef } from 'react'

type DatePickerFieldProps = PropsOf<typeof DatePicker> & {
  label: string
  name: string
}

export const DatePickerField = (props: DatePickerFieldProps): JSX.Element => {
  const { label, name, ...rest } = props
  const [field, { error }, { setValue }] = useField({ name })
  const ref = useRef<HTMLInputElement>(null)

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <DatePicker
        value={field.value ? new Date(field.value) : null}
        onChange={(value) => { setValue((new Date(value)).toISOString()) }}
        ref={ref}
        zIndex={1401}
        dropdownPosition='flip'
        classNames={{
          dropdown: `${name}-datePicker-dropdown`,
          wrapper: `${name}-datePicker-wrapper`,
          yearPickerControlActive: `${name}-datePicker-yearPickerControlActive`,
          monthPickerControlActive: `${name}-datePicker-monthPickerControlActive`,
          day: `${name}-datePicker-day`,
        }}
        styles={{
          dropdown: { marginLeft: `${ref?.current?.clientWidth ? (ref.current.clientWidth - 300) / 2 : 0}px` },
          wrapper: {
            input: {
              '&:focus-within': {
                borderColor: '#48BB78',
                boxShadow: '0 0 0 1px #48BB78',
              }
            }
          },
          yearPickerControlActive: { backgroundColor: '#48BB78', '&:hover': { backgroundColor: '#48BB78' } },
          monthPickerControlActive: { backgroundColor: '#48BB78', '&:hover': { backgroundColor: '#48BB78' } },
          day: { '&[data-selected]': { backgroundColor: '#48BB78' } }
        }}
        id={field.name}
        {...props}
        label={null}
      />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  )
}