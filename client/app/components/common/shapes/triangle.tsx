import React, { FunctionComponent, ReactElement } from 'react'

export const Triangle: FunctionComponent = (): ReactElement => (
  <div
    className="triangle"
    style={{
      borderColor: 'orange transparent',
      borderStyle: 'solid',
      borderWidth: '0px 60px 100px 60px',
      height: 0,
      width: 0
    }}
  />
)

export default Triangle
