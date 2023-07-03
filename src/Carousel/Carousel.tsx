import {
  Children,
  useMemo,
  useState,
  useEffect,
  useRef,
  PropsWithChildren,
} from "react";
import { CarouselProps } from "./types";

const Carousel: React.FunctionComponent<PropsWithChildren<CarouselProps>> = ({
  children,
  spacing = 0,
  itemShown,
  index: forcedIndex,
  autoScroll,
  autoScrollInterval = 2,
  CustomNavigator,
  ContainerStyles,
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [carouselWidth, setCarouselWidth] = useState(0);
  const childrenArray = Children.toArray(children);

  const itemWidth = useMemo(() => {
    const gaps = itemShown - 1;
    const gapSpaces = gaps * spacing;
    return (carouselWidth - gapSpaces) / itemShown;
  }, [spacing, itemShown, carouselWidth]);

  const [index, setIndex] = useState(0);
  const pages = Math.ceil(childrenArray.length / itemShown);

  useEffect(() => {
    const onChange = () => {
      setCarouselWidth(carouselRef.current?.clientWidth ?? 0);
    };
    onChange();
    window.addEventListener("resize", onChange);
    return () => {
      window.removeEventListener("resize", onChange);
    };
  }, []);

  const onClickPrev = () => {
    setIndex((prev) => {
      if (prev <= 0) return pages - 1;
      else return prev - 1;
    });
  };

  const onClickNext = () => {
    setIndex((prev) => {
      if (prev >= pages - 1) return 0;
      else return prev + 1;
    });
  };

  useEffect(() => {
    if (carouselRef.current) {
      const jumpedItems = Math.floor(itemShown * index);
      const jumpedGaps = jumpedItems;
      const jumpedLength = jumpedItems * itemWidth + jumpedGaps * spacing;
      carouselRef.current.scrollTo({
        left: jumpedLength,
        behavior: "smooth",
      });
    }
  }, [index, itemWidth, carouselWidth]);

  useEffect(() => {
    if (!autoScroll) return;
    const timeout = setTimeout(() => {
      onClickNext();
    }, autoScrollInterval * 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [index]);

  useEffect(() => {
    if (forcedIndex !== undefined) setIndex(forcedIndex);
  }, [forcedIndex]);

  return (
    <>
      <div
        style={{
          width: "100%",
          position: "relative",
          height: "200px",
          ...ContainerStyles,
        }}
      >
        <div
          style={{
            overflow: "hidden",
            width: "100%",
            display: "flex",
            columnGap: `${spacing}px`,
            height: "100%",
          }}
          ref={carouselRef}
        >
          {Children.map(childrenArray, (child, index) => {
            return (
              <div
                key={index}
                style={{
                  minWidth: `${itemWidth}px`,
                  width: `${itemWidth}px`,
                }}
              >
                {child}
              </div>
            );
          })}
        </div>

        {CustomNavigator && (
          <CustomNavigator
            index={index}
            setIndex={(index) => {
              if (index <= -1) setIndex(pages - 1);
              else if (index >= pages) setIndex(0);
              else setIndex(index);
            }}
          />
        )}

        {!CustomNavigator && (
          <>
            <button onClick={onClickPrev}>Prev</button>
            <button onClick={onClickPrev}>Next</button>
          </>
        )}
      </div>
    </>
  );
};

export default Carousel;
