import React, { useCallback } from 'react'
import './TextareaWithLines.scss'

export const TextareaWithLines = ({
  minRows = 10,
  onInput: parentOnInput,
  ...rest
}: { minRows?: number } & React.HTMLProps<HTMLTextAreaElement>) => {
  const onInput = useCallback(
    (event: React.FormEvent<HTMLTextAreaElement>) => {
      const target = event.target as HTMLTextAreaElement | null
      if (target) {
        target.style.height = ``
        target.style.height = `${target.scrollHeight}px`
      }
      parentOnInput?.(event)
    },
    [parentOnInput],
  )

  return (
    <textarea
      {...rest}
      draggable={'false'}
      rows={minRows}
      wrap={'true'}
      className={'textarea-with-lines'}
      onInput={onInput}
    />
  )
}
