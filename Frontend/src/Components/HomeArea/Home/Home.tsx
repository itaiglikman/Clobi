import ClockButton from "../ClockButton/ClockButton";
import "./Home.css";

function Home(): JSX.Element {
  return (
    <div className="Home">
       <h2>Welcome to Clobi</h2>
      <ClockButton />
    </div>
  );
}

export default Home;
