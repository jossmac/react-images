// @flow
// @jsx glam

import glam from 'glam'
import React, { type Node } from 'react'

import SyntaxHighlighter, { registerLanguage } from 'react-syntax-highlighter/prism-light'
import typescript from 'react-syntax-highlighter/languages/prism/typescript'
import { coy } from 'react-syntax-highlighter/styles/prism'

import { colors } from './theme'

registerLanguage('typescript', typescript)

type Props = {
  defaultValue: any,
  description: any,
  isRequired: boolean,
  name: string,
  type: string,
  typeDefinition: string,
}

const TypeDefinition = ({ children }: { children: Node }) => {
  return (
    <SyntaxHighlighter
      language="typescript"
      style={coy}
      customStyle={{
        backgroundColor: 'transparent',
        borderRadius: 4,
        fontSize: 12,
        marginTop: '2em',
        maxWidth: '100%',
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {children}
    </SyntaxHighlighter>
  )
}

const Heading = props => (
  <h4
    css={{
      fontSize: '1rem',
      fontWeight: 'normal',
      lineHeight: 1.4,
      margin: '2em 0 0',
    }}
    {...props}
  />
)

const HeadingDefault = props => (
  <code
    css={{
      color: colors.N60,
    }}
    {...props}
  />
)

const HeadingRequired = props => (
  <span
    css={{
      color: colors.red,
    }}
    {...props}
  />
)

const code = {
  borderRadius: 3,
  color: colors.N100,
  fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
  margin: 0,
  padding: '0.2em 0.4em',
  whiteSpace: 'nowrap',
}

const HeadingType = props => (
  <span
    css={{
      ...code,
      backgroundColor: 'rgba(251, 132, 191, 0.14)',
    }}
    {...props}
  />
)

const HeadingName = props => (
  <span
    css={{
      ...code,
      backgroundColor: 'rgba(0, 215, 255, 0.1)',
      marginRight: '0.5em',
    }}
    {...props}
  />
)

const PrettyProps = (props: Props) => {
  let typeName = props.type
  if (typeName === 'union') {
    typeName = 'union'
  }

  const defaultValue = props.defaultValue ? props.defaultValue : null
  const description = typeof props.description === 'string' ? <p>{props.description}</p> : props.description

  return (
    <div>
      <Heading>
        <code>
          <HeadingName>{props.name}</HeadingName>
          <HeadingType>{typeName}</HeadingType>
          {defaultValue && <HeadingDefault> = {defaultValue}</HeadingDefault>}
          {props.isRequired ? <HeadingRequired> required</HeadingRequired> : null}
        </code>
      </Heading>
      {description}
      {props.typeDefinition ? <TypeDefinition>{props.typeDefinition}</TypeDefinition> : null}
    </div>
  )
}

export default PrettyProps
