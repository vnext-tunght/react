import React, { useState } from 'react'
import { Box, Typography, Link, Alert } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@contexts/AuthContext'
import { FormInput, FormButton } from '@components/common'
import { loginSchema, type LoginFormData } from '@schemas/auth.schema'
import { useConfirmAlertYesNo, useI18n } from '@hooks/common'

export const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const { t } = useI18n()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const confirm = useConfirmAlertYesNo()

  const methods = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { handleSubmit } = methods

  const onSubmit = async (data: LoginFormData) => {
    setError('')
    const result = await confirm(
      t('auth.login.confirmTitle'),
      t('auth.login.confirmMessage'),
      {
        ok: t('common.ok'),
        cancel: t('common.cancel'),
      }
    )
    if (result !== 'YES') {
      return
    }
    setLoading(true)

    try {
      const success = await login(data.email, data.password)
      if (success) {
        navigate('/')
      } else {
        setError(t('auth.login.invalidCredentials'))
      }
    } catch {
      setError(t('auth.login.loginFailed'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom textAlign="center">
        {t('auth.login.title')}
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        textAlign="center"
        sx={{ mb: 3 }}
      >
        {t('auth.login.subtitle')}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <FormProvider {...methods}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            name="email"
            label={t('auth.login.email')}
            type="email"
            required
          />

          <FormInput
            name="password"
            label={t('auth.login.password')}
            type="password"
            required
          />

          <FormButton
            type="submit"
            fullWidth
            variant="contained"
            loading={loading}
            loadingText={t('auth.login.submitting')}
            sx={{ mt: 3, mb: 2 }}
          >
            {t('auth.login.submit')}
          </FormButton>

          <Box textAlign="center">
            <Link href="/" variant="body2">
              {t('auth.login.noAccount')}
            </Link>
          </Box>
        </Box>
      </FormProvider>
    </Box>
  )
}

export default LoginPage
