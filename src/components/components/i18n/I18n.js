import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Flag from './Flag'

const I18n = ({getTranslate}) => {
  const { i18n } = useTranslation()
  function handleChangeLanguage(language) {
    i18n.changeLanguage(language)
    getTranslate();
  }
  const selectedLanguage = i18n.language
  return (
    <div className="flag-container">
      <Flag
        isSelected={selectedLanguage === 'en-US'}
        onClick={() => handleChangeLanguage('en-US')}
        label="US"
      />
      <div className="mx-1"></div>
      <Flag
        isSelected={selectedLanguage === 'ko-KR'}
        onClick={() => handleChangeLanguage('ko-KR')}
        label="KR"
      />
    </div>
  )
}

export default I18n
