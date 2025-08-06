import { useState } from "react";
import { Container, Row, Col, Form, Button, Card, ButtonGroup, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import Job from "./Job";

const MainSearch = () => {
  const [query, setQuery] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchType, setSearchType] = useState("search"); // "search" or "category"
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = [
    "writing", "design", "development", "marketing", "sales", 
    "customer service", "data", "product", "engineering", "operations"
  ];

  const popularCategories = [
    "development", "design", "writing", "marketing", "data"
  ];

  const baseEndpoint = "https://strive-benchmark.herokuapp.com/api/jobs";

  const handleChange = e => {
    setQuery(e.target.value);
  };

  const handleCategoryChange = e => {
    setSelectedCategory(e.target.value);
  };

  const handlePopularCategoryClick = (category) => {
    setSearchType("category");
    setSelectedCategory(category);
    // Trigger search automatically
    setTimeout(() => {
      handleSubmit({ preventDefault: () => {} });
    }, 100);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    
    if (searchType === "search" && !query.trim()) return;
    if (searchType === "category" && !selectedCategory) return;

    setLoading(true);
    try {
      let url;
      if (searchType === "search") {
        url = `${baseEndpoint}?search=${query}&limit=20`;
      } else {
        url = `${baseEndpoint}?category=${selectedCategory}&limit=20`;
      }
      
      const response = await fetch(url);
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
              <h1 className="display-4 fw-bold text-primary">🔍 Remote Jobs Search</h1>
              <Link to="/favourites">
                <Button variant="outline-primary" size="lg">
                  ⭐ View Favorites
                </Button>
              </Link>
            </div>
          </div>
        </Col>
        
        <Col xs={12} lg={10} className="mx-auto">
          <div className="search-container">
            <div className="mb-4">
              <ButtonGroup className="w-100 mb-3">
                <Button 
                  variant={searchType === "search" ? "primary" : "outline-primary"}
                  onClick={() => setSearchType("search")}
                  className="fw-bold"
                >
                  🔍 Search by Keyword
                </Button>
                <Button 
                  variant={searchType === "category" ? "primary" : "outline-primary"}
                  onClick={() => setSearchType("category")}
                  className="fw-bold"
                >
                  📂 Search by Category
                </Button>
              </ButtonGroup>
            </div>

            <Form onSubmit={handleSubmit}>
              {searchType === "search" ? (
                <Form.Control 
                  type="search" 
                  value={query} 
                  onChange={handleChange} 
                  placeholder="🔍 Search for remote jobs (e.g., 'React', 'Python', 'Design')" 
                  size="lg"
                  disabled={loading}
                />
              ) : (
                <Form.Select 
                  value={selectedCategory} 
                  onChange={handleCategoryChange}
                  size="lg"
                  disabled={loading}
                >
                  <option value="">📂 Select a category...</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </Form.Select>
              )}
            </Form>

            {searchType === "category" && (
              <div className="mt-3">
                <p className="text-muted mb-2">🔥 Popular categories:</p>
                <div className="d-flex flex-wrap gap-2">
                  {popularCategories.map(category => (
                    <Badge 
                      key={category}
                      bg="primary" 
                      className="px-3 py-2 fs-6 cursor-pointer"
                      style={{ cursor: 'pointer' }}
                      onClick={() => handlePopularCategoryClick(category)}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {loading && (
              <div className="text-center mt-4">
                <div className="loading-spinner"></div>
                <p className="mt-3 text-muted">Searching for jobs...</p>
              </div>
            )}
          </div>
        </Col>
        
        <Col xs={12} lg={10} className="mx-auto">
          {jobs.length > 0 && (
            <Card className="mb-4">
              <Card.Body className="text-center">
                <h3 className="text-primary mb-0">
                  📋 Found {jobs.length} job{jobs.length !== 1 ? 's' : ''}
                  {searchType === "category" && selectedCategory && (
                    <span className="text-muted"> in {selectedCategory}</span>
                  )}
                </h3>
              </Card.Body>
            </Card>
          )}
          
          {jobs.map(jobData => (
            <Job key={jobData._id} data={jobData} />
          ))}
          
          {jobs.length === 0 && !loading && ((searchType === "search" && query) || (searchType === "category" && selectedCategory)) && (
            <div className="empty-state">
              <div className="display-1 mb-3">🔍</div>
              <h3 className="mb-3">No jobs found</h3>
              <p className="text-muted">
                {searchType === "search" 
                  ? `No jobs found for "${query}". Try a different search term!`
                  : `No jobs found in ${selectedCategory} category. Try a different category!`
                }
              </p>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default MainSearch;
