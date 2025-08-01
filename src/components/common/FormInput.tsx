import React from 'react'
import { TextField, TextFieldProps, FormControl } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'

export interface FormInputProps
  extends Omit<TextFieldProps, 'name' | 'error' | 'helperText'> {
  name: string
  label: string
  required?: boolean
}

export const FormInput: React.FC<FormInputProps> = ({
  name,
  label,
  required = false,
  ...textFieldProps
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  const error = errors[name]
  const errorMessage = error?.message as string

  return (
    <FormControl fullWidth margin="normal">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            {...textFieldProps}
            label={label}
            error={!!error}
            helperText={errorMessage}
            required={required}
            fullWidth
          />
        )}
      />
    </FormControl>
  )
}

export default FormInput
