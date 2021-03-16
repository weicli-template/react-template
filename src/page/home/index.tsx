import React from 'react';

export default () => {
 
  let IdGenerator: (chars: string, nums: number) => string;

function createUserId(name: string, id: number): string {
  return name + id;
}

IdGenerator = createUserId;

console.log(IdGenerator)

  
  
  return (
    <div>home</div>
  )
}