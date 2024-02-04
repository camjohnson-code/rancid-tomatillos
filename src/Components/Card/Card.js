import './Card.css';

const Card = ({ averageRating, backdropPath, id, releaseDate, title, setMovie, dummyMovie }) => {
  const cardStyle = {
    backgroundImage: `url(${backdropPath})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '200px',
    height: '300px',
    borderRadius: '10px',
  };

  return (
    <div className='card' onClick={() => setMovie(dummyMovie)}>
      <div style={cardStyle} className='poster'></div>
      <p className='title' tabIndex='0'>
        {title}
      </p>
    </div>
  );
};

export default Card;
