import React, { useCallback, useEffect, useRef } from 'react'
import './TextareaWithLines.scss'

export const TextareaWithLines = ({
  minRows = 10,
  ...rest
}: { minRows?: number } & React.HTMLProps<HTMLTextAreaElement>) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = ``
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
    }
  }, [rest.value])

  return (
    <textarea
      {...rest}
      ref={textAreaRef}
      draggable={'false'}
      rows={minRows}
      wrap={'true'}
      className={'textarea-with-lines'}
    />
  )
}
