import { useState, useEffect } from 'react'
const colors = ['red', 'orange', 'yellow', 'blue', 'green']

const Item = () => {

  const [color, setColor] = useState('')

  useEffect(() => {
    const index = Math.floor(Math.random() * colors.length)
    setColor(colors[index])
  }, [])

  return (
    <>
      <div
        style={{
          height: '150px',
          backgroundColor: color,
          width: '100%'
        }}
      >

      </div>
    </>
  );
}

export default Item;