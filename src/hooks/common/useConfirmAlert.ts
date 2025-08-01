/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTheme } from '@mui/material'
import { confirmAlert, ReactConfirmAlertProps } from 'react-confirm-alert'
import '../../assets/styles/confirmAlert.css'

export function useConfirmAlert() {
  const confirm = async (option: ReactConfirmAlertProps) => {
    confirmAlert(option)
  }
  return confirm
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
    const promise = new Promise<YesNoResult>(resolve => {
      const option: any = {
        title: text,
        message: subText,
        buttons: [
          {
            label: buttonOption?.cancel ?? 'Cancel',
            onClick: () => resolve('NO'),
            style: {
              color: theme.palette.primary.main,
              backgroundColor: 'transparent',
              marginRight: 0,
              fontFamily: `Roboto, ${theme.typography.fontFamily}`,
              fontSize: '0.875rem',
            },
          },
          {
            label: buttonOption?.ok ?? 'OK',
            onClick: () => resolve('YES'),
            style: {
              color: theme.palette.primary.main,
              backgroundColor: 'transparent',
              fontFamily: `Roboto, ${theme.typography.fontFamily}`,
              fontSize: '0.875rem',
            },
          },
        ],
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
    const promise = new Promise<EscapeResult>(resolve => {
      const option: any = {
        title: text,
        message: subText,
        buttons: [
          {
            label: buttonOption?.stay,
            onClick: () => resolve('STAY'),
            style: {
              color: theme.palette.primary.main,
              backgroundColor: 'transparent',
              marginRight: 0,
              fontFamily: `Roboto, ${theme.typography.fontFamily}`,
              fontSize: '0.875rem',
            },
          },
          {
            label: buttonOption?.escape,
            onClick: () => resolve('ESCAPE'),
            style: {
              color: theme.palette.warning.main,
              backgroundColor: 'transparent',
              fontFamily: `Roboto, ${theme.typography.fontFamily}`,
              fontSize: '0.875rem',
            },
          },
        ],
        onClickOutside: () => {
          resolve('STAY')
        },
        onKeypressEscape: () => {
          resolve('STAY')
        },
      }
      confirmAlert(option)
    })

    return promise
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
