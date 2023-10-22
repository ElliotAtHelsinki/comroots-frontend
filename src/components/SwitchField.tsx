import { FormControl, FormErrorMessage, FormLabel, Switch } from '@chakra-ui/react'
import { SwitchProps } from '@mui/material'
import { useField } from 'formik'
import { ChangeEvent } from 'react'

type SwitchFieldProps = SwitchProps & any & {
  label: string
  name: string
  onSwitchChangeEffect?: () => void
}

export const SwitchField = (props: SwitchFieldProps): JSX.Element => {
  const { label, name, onSwitchChangeEffect, ...rest } = props
  const [field, { error }, { setValue }] = useField({ name })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.checked)
    if (onSwitchChangeEffect) {
      onSwitchChangeEffect()
    }
  }

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Switch
        isChecked={field.value}
        onChange={handleChange}
        id={field.name}
        colorScheme='green'
        {...props}
      />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  )
}