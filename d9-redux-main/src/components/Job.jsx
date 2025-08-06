import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { addToFavorites, removeFromFavorites } from '../store/favoritesSlice';

const Job = ({ data }) => {
  const favorites = useSelector(state => state.favorites.companies);
  const dispatch = useDispatch();
  
  const isFavorite = favorites.some(company => company.name === data.company_name);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(data.company_name));
    } else {
      dispatch(addToFavorites({ name: data.company_name }));
    }
  };

  return (
    <div className="job-card">
      <Row className="align-items-center">
        <Col xs={12} md={4} className="mb-3 mb-md-0">
          <Link to={`/${data.company_name}`} className="text-decoration-none">
            <h5 className="text-primary mb-0">🏢 {data.company_name}</h5>
          </Link>
        </Col>
        <Col xs={12} md={6} className="mb-3 mb-md-0">
          <a href={data.url} target="_blank" rel="noreferrer" className="text-decoration-none">
            <h6 className="text-dark mb-0">💼 {data.title}</h6>
          </a>
        </Col>
        <Col xs={12} md={2} className="text-center text-md-end">
          <Button 
            variant={isFavorite ? "success" : "outline-success"}
            size="sm"
            onClick={handleToggleFavorite}
            className="fw-bold"
          >
            {isFavorite ? "★ Favorited" : "☆ Add to Favorites"}
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Job;
