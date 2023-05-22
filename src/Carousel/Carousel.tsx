import { Children, cloneElement, useMemo, useState, useEffect, useRef } from 'react'

interface Props {
  children: React.ReactNode
  spacing: number
  itemShown: number
  autoScroll?: boolean
}

const Carousel: React.FunctionComponent<Props> = ({
  children,
  itemShown,
  spacing,
  autoScroll
}) => {

  const carouselRef = useRef<HTMLDivElement>(null)
  const [carouselWidth, setCarouselWidth] = useState(0)
  const childrenArray = Children.toArray(children)

  const itemWidth = useMemo(() => {
    const gaps = itemShown - 1
    const gapSpaces = gaps * spacing
    return `(100% - ${gapSpaces}px) / ${itemShown}`
  }, [spacing, itemShown])

  const [index, setIndex] = useState(0)
  const pages = Math.ceil(childrenArray.length / itemShown)

  useEffect(() => {
    const onChange = () => {
      setCarouselWidth(carouselRef.current?.clientWidth ?? 0)
    }
    onChange()
    window.addEventListener('resize', onChange)
    return () => { window.removeEventListener('resize', onChange) }
  }, [])

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scroll({
        left: 315.442,
        behavior: 'smooth'
      })
    }
  }, [])

  const next = () => {
    setIndex(prev => prev + 1)
  }

  const prev = () => {
    setIndex(prev => prev - 1)
  }

  useEffect(() => {
    console.log(index, itemWidth, carouselWidth)
  }, [index, itemWidth, carouselWidth])

  return (
    <>
      <div
        style={{
          overflow: 'hidden',
          width: '100%',
          display: 'flex',
          columnGap: spacing,
          height: 'fit-content'
        }}
        ref={carouselRef}
      >
        {Children.map(childrenArray, (child, index) => {
          return (
            <div
              key={index}
              style={{
                minWidth: `calc(${itemWidth})`,
                width: `calc(${itemWidth})`
              }}
            >
              {child}
            </div>
          )
        })}
      </div>
      <button>Prev</button>
      <button>Next</button>
    </>
  );
}

export default Carousel;