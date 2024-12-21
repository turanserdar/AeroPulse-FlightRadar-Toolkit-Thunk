import axios from 'axios';
import { useEffect, useState } from 'react';
import { options2 } from '../constant';
import { useDispatch } from 'react-redux';
import { setTrail } from '../redux/slices/flightSlice';
import moment from 'moment';


const Modal = ({ detailId, closeModal }) => {
  const [data, setData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    // Whenever useEffect runs, we clear the previous flight data
    // This ensures the loading state is triggered properly
    setData(null);

    axios
      .get(
        `https://flight-radar1.p.rapidapi.com/flights/detail?flight=${detailId}`,
        options2
      )
      .then((res) => {
        dispatch(setTrail(res.data.trail));
        setData(res.data);
      });
  }, [detailId]);

  const formatDate = (unix_time) => {
    const date = new Date(unix_time * 1000);

    return moment(date).calendar();
  };

  return (
    <div className="detail-outer">
      <div className="detail-inner">
        <p className="close-area">
          <span onClick={closeModal}>X</span>
        </p>

        {!data ? (
          <div className="wrapper">
            <div className="loader">
              <span></span>
            </div>
          </div>
        ) : !data.airport.origin || !data.airport.destination ? (
          <div>
            <p>{data.airline?.name}</p>
            <p>The data for this flight is confidential</p>
          </div>
        ) : (
          <>
            <h2>{data.aircraft.model.text}</h2>
            <h2>{data.aircraft.model.code}</h2>

            <p>{data.aircraft.registration}</p>

            <img src={data.aircraft.images.large[0].src} />

            <p>
              <span>Airline:</span>
              <span>{data.airline.name}</span>
            </p>

            <p>
              <span>Departure:</span>
              <a target="_blank" href={data.airport.origin.website}>
                {data.airport.origin.name}
              </a>
            </p>

            <p>
              <span>Destination:</span>
              <a target="_blank" href={data.airport.destination.website}>
                {data.airport.destination.name}
              </a>
            </p>

            <p>
              <span>Departure Time:</span>
              <span>{formatDate(data.time.scheduled.departure)}</span>
            </p>
            <p>
              <span>Arrival Time:</span>
              <span>{formatDate(data.time.scheduled.arrival)}</span>
            </p>

            <p className={data.status.icon}>
              <span>{data.status.text}</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
