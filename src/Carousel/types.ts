export interface CarouselProps {
  itemShown: number;
  spacing?: number;
  index?: number;
  autoScroll?: boolean;
  autoScrollInterval?: number;
  CustomNavigator?: React.FC<CustomNavigatorProps>;
  ContainerStyles?: React.CSSProperties;
}

export interface CustomNavigatorProps {
  index: number;
  setIndex: (index: number) => void;
}
