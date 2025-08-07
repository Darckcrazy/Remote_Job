import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { removeFromFavorites } from '../store/actionCreators';

const Favorites = () => {
  const favorites = useSelector(state => state.favorites.companies);
  const dispatch = useDispatch();

  const handleRemove = (companyName) => {
    dispatch(removeFromFavorites(companyName));
  };

  return (
    <Container>
      <Row>
        <Col xs={12} lg={10} className="mx-auto">
          <div className="header-container">
            <div className="d-flex justify-content-between align-items-center flex-wrap">
              <h1 className="display-4 fw-bold text-primary">⭐ Favorite Companies</h1>
              <Link to="/">
                <Button variant="outline-secondary" size="lg">
                  🏠 Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </Col>
        
        <Col xs={12} lg={10} className="mx-auto">
          {favorites.length === 0 ? (
            <div className="empty-state">
              <div className="display-1 mb-3">💔</div>
              <h3 className="mb-3">No favorite companies yet</h3>
              <p className="text-muted">
                Start searching for jobs and add companies to your favorites!
              </p>
              <Link to="/">
                <Button variant="primary" size="lg" className="mt-3">
                  🔍 Start Searching
                </Button>
              </Link>
            </div>
          ) : (
            <div>
              <Card className="mb-4">
                <Card.Body className="text-center">
                  <h3 className="text-primary mb-0">
                    ❤️ You have {favorites.length} favorite{favorites.length !== 1 ? 's' : ''}
                  </h3>
                </Card.Body>
              </Card>
              
              {favorites.map(company => (
                <div key={company.name} className="job-card">
                  <Row className="align-items-center">
                    <Col xs={12} md={8} className="mb-3 mb-md-0">
                      <Link to={`/${company.name}`} className="text-decoration-none">
                        <h5 className="text-primary mb-0">🏢 {company.name}</h5>
                      </Link>
                    </Col>
                    <Col xs={12} md={4} className="text-center text-md-end">
                      <Button 
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleRemove(company.name)}
                        className="fw-bold"
                      >
                        🗑️ Remove
                      </Button>
                    </Col>
                  </Row>
                </div>
              ))}
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Favorites; 