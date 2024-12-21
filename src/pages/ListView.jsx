import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactPaginate from 'react-paginate';
import { useState } from 'react';

const ListView = ({ openModal }) => {
  // Sadece flights state'ini seçiyoruz
  const flights = useSelector((state) => state.flights);

  // Calculates the first item to be displayed
  const [itemOffset, setItemOffset] = useState(0);

  // Number of items to be displayed per page
  const itemsPerPage = 10;

  // Calculates the last item to be displayed
  const endOffset = itemOffset + itemsPerPage;

  // Slices the data based on the current range
  const currentItems = flights?.slice(itemOffset, endOffset);

  // Calculates the total number of pages
  const pageCount = Math.ceil(flights?.length / itemsPerPage);

  // Triggered whenever the page changes
  const handlePageClick = (event) => {
    // Determines the first item to be displayed
    const newOffset = event.selected * itemsPerPage;

    // Updates the state
    setItemOffset(newOffset);
  };

  return (
    <div className="p-4">
      <table className="table table-dark table-hover mt-5 table-responsive">
        <thead>
          <tr>
            <th>id</th>
            <th>Tail Code</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentItems?.map((i) => (
            <tr key={i.id}>
              <td>{i.id}</td>
              <td>{i.code}</td>
              <td>{i.lat}</td>
              <td>{i.lng}</td>
              <td>
                <button onClick={() => openModal(i.id)}>Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="< previous"
        className="pagination"
      />
    </div>
  );
};

export default ListView;
