import React from 'react';

interface Props {
  children?: any
}

export default (props:Props) => {
  return(
    <div>
      <header>header</header>
      {props.children}
      <footer>footer</footer>
    </div>
  )
}