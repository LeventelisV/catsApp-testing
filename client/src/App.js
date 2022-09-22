import "./App.css";
import Card from "./Components/Card/Card";
import Cards from "./Components/Cards/Cards";
import Pets from "./Components/Pets/Pets";
import cats from "./mock/cats.json";

function App() {
  const cardProps = {
    name: "Sydney",
    phone: "111-111-11111",
    email: "sydney@gmail.com",
    image: {
      url: "https://images.unsplash.com/photo-1548247416-ec66f4900b2e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1000&q=60",
      alt: "cute cat",
    },
    favored: false,
  };
  return (
    <div>
      <Pets />
    </div>
  );
}

export default App;
