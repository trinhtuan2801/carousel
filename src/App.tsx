import Carousel from "./Carousel/Carousel";
import Item from "./Item";

function App() {
  return (
    <div >
      <Carousel
        itemShown={3.5}
        spacing={10}
      >
        {Array(10).fill('').map((value, index) =>
          <Item
            key={index}
          />
        )}
      </Carousel>
    </div>
  );
}

export default App;
