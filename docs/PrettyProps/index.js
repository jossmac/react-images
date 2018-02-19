// @flow
// @jsx glam

import glam from 'glam';
import React from 'react';

import { colors } from '../theme';

function convert(val: any): string {
  return JSON.stringify(val, null, 2);
}

type Props = {
  defaultValue: any,
  description: any,
  isRequired: boolean,
  name: string,
  type:
    | 'any'
    | 'boolean'
    | 'function'
    | 'number'
    | 'object'
    | 'string'
    | 'union',
  typeDefinition: any,
};

const borderRadius = 3;

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
);

const HeadingDefault = props => (
  <code
    css={{
      color: colors.N60,
    }}
    {...props}
  />
);

const HeadingRequired = props => (
  <span
    css={{
      color: colors.red,
    }}
    {...props}
  />
);

const code = {
  borderRadius: 3,
  color: colors.N100,
  fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
  margin: 0,
  padding: '0.2em 0.4em',
};

const HeadingType = props => (
  <span
    css={{
      ...code,
      backgroundColor: 'rgba(251, 132, 191, 0.14)',
    }}
    {...props}
  />
);

const HeadingName = props => (
  <span
    css={{
      ...code,
      backgroundColor: 'rgba(0, 215, 255, 0.1)',
      marginRight: '0.5em',
    }}
    {...props}
  />
);

const PrettyProps = (props: Props) => {
  let typeName = props.type;
  if (typeName === 'union') {
    typeName = 'union';
  }

  const defaultValue = props.defaultValue ? props.defaultValue : null;

  return (
    <div>
      <Heading>
        <code>
          <HeadingName>{props.name}</HeadingName>
          <HeadingType>{typeName}</HeadingType>
          {defaultValue && <HeadingDefault> = {defaultValue}</HeadingDefault>}
          {props.isRequired ? (
            <HeadingRequired> required</HeadingRequired>
          ) : null}
        </code>
      </Heading>
      <p>{props.description}</p>
    </div>
  );
};

export default PrettyProps;
