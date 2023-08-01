import React from 'react'
import { useTranslations } from 'next-intl';
function idioma() {
    const t = useTranslations('Account');
  return (
    t
  )
}

export default idioma