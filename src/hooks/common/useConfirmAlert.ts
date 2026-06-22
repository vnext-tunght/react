/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTheme, Theme } from '@mui/material'
import { confirmAlert, ReactConfirmAlertProps } from 'react-confirm-alert'
import '../../assets/styles/confirmAlert.css'

export function useConfirmAlert() {
  const confirm = async (option: ReactConfirmAlertProps) => {
    confirmAlert(option)
  }
  return confirm
}

interface DialogButton {
  label: string
  resolveValue: string
  color?: string
}

interface DialogOptions {
  title: string
  message: string
  buttons: DialogButton[]
  dismissValue: string
}

/**
 * Shared factory that builds a confirm-alert dialog with consistent styling.
 * Eliminates duplicated button-style and promise-wrapping logic.
 */
function buildConfirmDialog(theme: Theme, options: DialogOptions): Promise<string> {
  return new Promise<string>(resolve => {
    const buttons = options.buttons.map(btn => ({
      label: btn.label,
      onClick: () => resolve(btn.resolveValue),
      style: {
        color: btn.color ?? theme.palette.primary.main,
        backgroundColor: 'transparent',
        fontFamily: `Roboto, ${theme.typography.fontFamily}`,
        fontSize: '0.875rem',
      },
    }))

    const alertOption: any = {
      title: options.title,
      message: options.message,
      buttons,
      onClickOutside: () => resolve(options.dismissValue),
      onKeypressEscape: () => resolve(options.dismissValue),
    }
    confirmAlert(alertOption)
  })
}

type YesNoResult = 'YES' | 'NO' | ''
export function useConfirmAlertYesNo() {
  const theme = useTheme()
  const yesNoAlertAsync = async (
    text: string,
    subText: string = 'Subtext',
    buttonOption: {
      cancel: string
      ok: string
    } = {
      cancel: 'Cancel',
      ok: 'OK',
    }
  ) => {
    return buildConfirmDialog(theme, {
      title: text,
      message: subText,
      buttons: [
        { label: buttonOption.cancel, resolveValue: 'NO' },
        { label: buttonOption.ok, resolveValue: 'YES' },
      ],
      dismissValue: '',
    }) as Promise<YesNoResult>
  }
  return yesNoAlertAsync
}

type EscapeResult = 'ESCAPE' | 'STAY'
export function useConfirmAlertEscape() {
  const theme = useTheme()
  const escapeAlertAsync = async (
    text: string,
    subText: string = 'Subtext',
    buttonOption: {
      stay: string
      escape: string
    } = {
      stay: 'Stay',
      escape: 'Escape',
    }
  ) => {
    return buildConfirmDialog(theme, {
      title: text,
      message: subText,
      buttons: [
        { label: buttonOption.stay, resolveValue: 'STAY' },
        { label: buttonOption.escape, resolveValue: 'ESCAPE', color: theme.palette.warning.main },
      ],
      dismissValue: 'STAY',
    }) as Promise<EscapeResult>
  }
  return escapeAlertAsync
}

export function useConfirmCustom() {
  const theme = useTheme()

  const confirmAsync = async (
    title: string,
    message: string,
    ...buttons: { label?: any; style?: any }[]
  ) => {
    const promise = new Promise<string>(resolve => {
      const btns = new Array<{ label: string; onClick: any; style: any }>()
      for (const button of buttons) {
        const defaultStyle = {
          width: '100px',
          backgroundColor: 'white',
          color: theme.palette.primary.main,
          border: `1px solid ${theme.palette.primary.main}`,
          margin: `0 ${theme.spacing(1)}`,
        }
        const newStyle = { ...defaultStyle, ...button.style }
        btns.push({
          label: button.label,
          onClick: () => resolve(button.label),
          style: newStyle,
        })
      }
      const option: any = {
        title: title,
        message: message,
        buttons: btns,
        onClickOutside: () => {
          resolve('')
        },
        onKeypressEscape: () => {
          resolve('')
        },
      }
      confirmAlert(option)
    })

    return promise
  }
  return confirmAsync
}
