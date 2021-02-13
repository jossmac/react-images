// @flow

import React, { type ComponentType } from 'react'
import { Route } from 'react-router-dom'
import { type ProviderProps } from './ImageProvider'

type Props = ProviderProps & {
  component: ComponentType<*>,
  exact?: boolean,
  path: string,
}

const ImageRoute = (props: Props) => {
  const { component: Component, images, isLoading, ...rest } = props

  return <Route {...rest} children={routeProps => <Component images={images} isLoading={isLoading} {...routeProps} />} />
}

export default ImageRoute
