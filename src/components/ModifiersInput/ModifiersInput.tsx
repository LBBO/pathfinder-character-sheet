import React from 'react'
import './ModifiersInput.scss'
import { useTranslation } from 'react-i18next'

export const ModifiersInput = ({
  className,
  type,
  ...rest
}: {
  type?: 'temp' | 'conditional'
} & React.HTMLProps<HTMLTextAreaElement>) => {
  const { t } = useTranslation()

  return (
    <label className={`modifiers-input-textarea ${className}`}>
      <span>
        {(type ? t(`general.modifier.prefixes.${type}`) : '') +
          t('general.modifier.plural')}
      </span>
      <textarea {...rest} draggable={'false'} wrap={'true'} />
    </label>
  )
}
