import React, { useState, useEffect } from 'react';
import './Gallery.css';

const API_URL = 'https://course-api.com/react-tours-project';

function Gallery() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch(API_URL);
        const tours = await response.json();
        setTours(tours);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    };

    fetchTours();
  }, []);

  const removeTour = (id) => {
    setTours(tours.filter((tour) => tour.id !== id));
  };

  const toggleReadMore = (id) => {
    setTours(tours.map(tour => {
      if (tour.id === id) {
        tour.showMore = !tour.showMore;
      }
      return tour;
    }));
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (tours.length === 0) {
    return <h2>No tours left</h2>;
  }

  return (
    <div className="gallery">
      {tours.map((tour) => (
        <div key={tour.id} className="tour">
          <img src={tour.image} alt={tour.name} />
          <h2>{tour.name}</h2>
          <p>
            {tour.showMore ? tour.info : `${tour.info.substring(0, 200)}...`}
            <button onClick={() => toggleReadMore(tour.id)}>
              {tour.showMore ? 'Show Less' : 'Read More'}
            </button>
          </p>
          <button onClick={() => removeTour(tour.id)}>Not Interested</button>
        </div>
      ))}
    </div>
  );
}

export default Gallery;
