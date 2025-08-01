import React from 'react'
import {
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
  Box,
  Typography,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import LanguageIcon from '@mui/icons-material/Language'

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
]

interface LanguageSwitcherProps {
  variant?: 'select' | 'compact'
  size?: 'small' | 'medium'
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = 'select',
  size = 'small',
}) => {
  const { i18n } = useTranslation()

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    const newLanguage = event.target.value
    i18n.changeLanguage(newLanguage)
  }

  const currentLanguage =
    languages.find(lang => lang.code === i18n.language) || languages[0]

  if (variant === 'compact') {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          cursor: 'pointer',
          p: 1,
          borderRadius: 1,
          '&:hover': {
            backgroundColor: 'action.hover',
          },
        }}
        onClick={() => {
          const nextLang = i18n.language === 'en' ? 'vi' : 'en'
          i18n.changeLanguage(nextLang)
        }}
        title={`Switch to ${i18n.language === 'en' ? 'Tiếng Việt' : 'English'}`}
      >
        <LanguageIcon fontSize={size} />
        <Typography variant="body2">{currentLanguage.flag}</Typography>
      </Box>
    )
  }

  return (
    <FormControl size={size} sx={{ minWidth: 120 }}>
      <Select
        value={i18n.language}
        onChange={handleLanguageChange}
        displayEmpty
        sx={{
          '& .MuiSelect-select': {
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          },
        }}
      >
        {languages.map(language => (
          <MenuItem key={language.code} value={language.code}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <span>{language.flag}</span>
              <span>{language.name}</span>
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default LanguageSwitcher
