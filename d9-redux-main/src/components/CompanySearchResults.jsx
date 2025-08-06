import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Job from "./Job";
import { useParams } from "react-router-dom";

const CompanySearchResults = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  const baseEndpoint = "https://strive-benchmark.herokuapp.com/api/jobs?company=";

  useEffect(() => {
    getJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getJobs = async () => {
    setLoading(true);
    try {
      const response = await fetch(baseEndpoint + params.company);
      if (response.ok) {
        const { data } = await response.json();
        setJobs(data);
      } else {
        alert("Error fetching results");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Row>
        <Col xs={12} lg={10} className="mx-auto">
          <div className="header-container">
            <div className="d-flex justify-content-between align-items-center flex-wrap">
              <h1 className="display-4 fw-bold text-primary">🏢 Jobs at {params.company}</h1>
              <Link to="/favourites">
                <Button variant="outline-primary" size="lg">
                  ⭐ View Favorites
                </Button>
              </Link>
            </div>
          </div>
        </Col>
        
        <Col xs={12} lg={10} className="mx-auto">
          {loading ? (
            <div className="empty-state">
              <div className="loading-spinner"></div>
              <p className="mt-3 text-muted">Loading jobs for {params.company}...</p>
            </div>
          ) : jobs.length > 0 ? (
            <div>
              <Card className="mb-4">
                <Card.Body className="text-center">
                  <h3 className="text-primary mb-0">
                    📋 Found {jobs.length} job{jobs.length !== 1 ? 's' : ''} at {params.company}
                  </h3>
                </Card.Body>
              </Card>
              
              {jobs.map(jobData => (
                <Job key={jobData._id} data={jobData} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="display-1 mb-3">🔍</div>
              <h3 className="mb-3">No jobs found</h3>
              <p className="text-muted">
                No jobs found for {params.company}. Try searching for a different company!
              </p>
              <Link to="/">
                <Button variant="primary" size="lg" className="mt-3">
                  🔍 Search Again
                </Button>
              </Link>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CompanySearchResults;
