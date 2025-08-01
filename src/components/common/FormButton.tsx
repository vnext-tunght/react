import React from 'react'
import { Button, ButtonProps, CircularProgress } from '@mui/material'

export interface FormButtonProps extends ButtonProps {
  loading?: boolean
  loadingText?: string
}

export const FormButton: React.FC<FormButtonProps> = ({
  loading = false,
  loadingText = 'Loading...',
  children,
  disabled,
  ...buttonProps
}) => {
  return (
    <Button
      {...buttonProps}
      disabled={loading || disabled}
      startIcon={
        loading ? <CircularProgress size={16} /> : buttonProps.startIcon
      }
    >
      {loading ? loadingText : children}
    </Button>
  )
}

export default FormButton
