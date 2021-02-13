// @flow
// @jsx glam

import glam from 'glam'
import React, { type Node } from 'react'

import SyntaxHighlighter, { registerLanguage } from 'react-syntax-highlighter/prism-light'
import jsx from 'react-syntax-highlighter/languages/prism/jsx'
import { tomorrow } from 'react-syntax-highlighter/styles/prism'

import { colors } from '../theme'
import { smallDevice } from '../utils'

registerLanguage('jsx', jsx)

// ==============================
// Title
// ==============================

export const Title = (props: any) => (
  <h1
    css={{
      fontSize: '3.2em',
      fontWeight: 300,

      [smallDevice]: { fontSize: '2em' },
    }}
    {...props}
  />
)

// ==============================
// Heading
// ==============================

function headingLink(src) {
  const base = 'https://github.com/jossmac/react-images/tree/master/docs/pages'
  return `${base}${src}`
}

export const Heading = ({ source, ...props }: { source: string }) => (
  <div
    css={{
      alignItems: 'baseline',
      display: 'flex ',
      justifyContent: 'space-between',
      WebkitOverflowScrolling: 'touch',
    }}
  >
    <h3 css={{ marginBottom: 0, marginTop: '2em' }} {...props} />
    {source ? (
      <a
        href={headingLink(source)}
        target="_blank"
        css={{
          color: colors.primary,
          borderBottom: '1px solid rgba(0, 215, 255, 0.25)',
          color: '#00d7ff',
          textDecoration: 'none',

          ':hover': {
            borderBottomColor: 'rgba(0, 215, 255, 0.66)',
            textDecoration: 'none',
          },
        }}
      >
        Source
      </a>
    ) : null}
  </div>
)

// ==============================
// Code
// ==============================

export const Code = (props: any) => (
  <code
    css={{
      backgroundColor: 'rgba(0, 215, 255, 0.1)',
      borderRadius: 3,
      color: colors.N100,
      fontSize: '85%',
      fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
      margin: 0,
      padding: '0.2em 0.4em',
    }}
    {...props}
  />
)

export const CodeBlock = ({ children, ...props }: { children: Node }) => {
  return (
    <SyntaxHighlighter
      language="jsx"
      style={tomorrow}
      customStyle={{
        borderRadius: 4,
        fontSize: 12,
        marginTop: '2em',
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
      }}
      {...props}
    >
      {children}
    </SyntaxHighlighter>
  )
}

// ==============================
// Carousel Components
// ==============================

const Author = ({ isModal, ...props }) => {
  const Tag = props.href ? 'a' : 'span'

  return (
    <Tag
      css={{
        color: isModal ? 'white' : 'inherit',
        fontWeight: 500,
        textDecoration: 'none',

        ':hover': { textDecoration: 'underline' },
      }}
      {...props}
    />
  )
}

export const FooterCaption = (props: ViewType) => {
  const { currentView, isModal } = props
  const { caption, author } = currentView

  return (
    <span>
      {author ? (
        <Author href={author.url} target={author.url ? '_blank' : null} isModal={isModal}>
          {author.name}
        </Author>
      ) : null}
      {author && caption ? ' - ' : null}
      {caption}
    </span>
  )
}
