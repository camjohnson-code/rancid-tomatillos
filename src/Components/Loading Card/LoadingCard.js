import './LoadingCard.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const LoadingCard = () => {
  const cardStyle = {
    backgroundColor: '#808080',
    width: '200px',
    height: '300px',
    borderRadius: '10px',
  };

  return (
    <div className='card'>
      <div style={cardStyle} className='poster'></div>
      <p className='title' tabIndex='0'>
        Loading...
      </p>
    </div>
  );
};

export default LoadingCard;
