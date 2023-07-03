import Carousel from "./Carousel/Carousel";
import { CustomNavigatorProps } from "./Carousel/types";
import Item from "./Item";

function App() {
  return (
    <div>
      <Carousel
        itemShown={3}
        autoScroll
        ContainerStyles={{
          height: "200px",
          borderBottomLeftRadius: "10px",
          borderBottomRightRadius: "10px",
          overflow: "hidden",
        }}
        autoScrollInterval={2}
        CustomNavigator={CustomNavigator}
      >
        {Array(20)
          .fill(0)
          .map((value, index) => (
            <div
              key={index}
              style={{
                border: "1px solid black",
                backgroundColor: "yellow",
                padding: "4px",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {index}
            </div>
          ))}
      </Carousel>
    </div>
  );
}

export default App;

const CustomNavigator = ({ index, setIndex }: CustomNavigatorProps) => (
  <div
    style={{
      width: "100%",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      display: "flex",
      justifyContent: "space-between",
    }}
  >
    <div
      style={{
        backgroundColor: "red",
        borderRadius: "0px",
        padding: "8px",
        backdropFilter: "blur(8px)",
        color: "white",
        borderTopRightRadius: "50%",
        borderBottomRightRadius: "50%",
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
      }}
      onClick={() => {
        setIndex(index - 1);
      }}
    >
      Back
    </div>
    <div
      style={{
        backgroundColor: "green",
        borderRadius: "0px",
        padding: "8px",
        backdropFilter: "blur(8px)",
        color: "white",
        borderTopLeftRadius: "50%",
        borderBottomLeftRadius: "50%",
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
      }}
      onClick={() => {
        setIndex(index + 1);
      }}
    >
      Next
    </div>
  </div>
);
