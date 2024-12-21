import { useSelector } from 'react-redux';

const Header = () => {
  const state = useSelector((store) => store);

  return (
    <header>
      <div>
        <img src="/plane-l.png" />
        <h3>AeroPulse Flight Radar</h3>
      </div>

      <p>
  {state.isLoading
    ? 'Calculating flights...'
    : state.isError
    ? 'An error occurred :('
    : state.flights.length + ' Flights Found'}
</p>
    </header>
  );
};

export default Header;
