import './Card.css';

const Card = ({ averageRating, backdropPath, id, key, releaseDate, title }) => {
  const cardStyle = {
    backgroundImage: `url(${backdropPath})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '200px',
    height: '300px',
    borderRadius: '10px'
  };

  return (
    <div className='card'>
      <div style={cardStyle} className='poster'></div>
      <p className='title'>{title}</p>
    </div>
  );
};

export default Card;
