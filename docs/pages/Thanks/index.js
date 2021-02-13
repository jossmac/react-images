// @flow
// @jsx glam
import glam from 'glam'
import React, { Component } from 'react'

import { Title } from '../components'
import { features } from './data'
import { colors } from '../../theme'

const Hr = () => (
  <hr
    css={{
      backgroundColor: colors.N10,
      border: 0,
      height: 2,
      marginBottom: '2em',
      marginTop: '2em',
    }}
  />
)

export default class Thanks extends Component<*> {
  render() {
    return (
      <div>
        <Title>Thanks</Title>
        <p>
          I&apos;ve spent <em>a lot of time</em> in R&amp;D with{' '}
          <a href="https://twitter.com/JedWatson" target="_blank">
            @JedWatson
          </a>{' '}
          exploring component architecture and styling possibilities for version two of{' '}
          <a href="https://github.com/JedWatson/react-select" target="_blank">
            react-select
          </a>
          . This project has directly benefitted from the solutions discovered in that process &mdash; cheers mate!
        </p>
        <p>
          A big thank you to{' '}
          <a href="https://twitter.com/thethinkmill" target="_blank">
            @TheThinkmill
          </a>{' '}
          for embracing open-source and encouraging its employees to give back.
        </p>
        <Hr />
        <p>Shout out to the following projects that allowed me to build this:</p>
        <List items={features} />
        <p>
          I&apos;d also like to thank everyone who has contributed to this project over the years, without your support react-images wouldn&apos;t be where it
          is today. Cheers to the open source community!
        </p>
      </div>
    )
  }
}

const List = ({ items }: FeaturesType) => (
  <ul>
    {items.map(({ link, text }, j) => (
      <li key={j}>
        {text}
        {link ? <span> &mdash; {link}</span> : null}
      </li>
    ))}
  </ul>
)
