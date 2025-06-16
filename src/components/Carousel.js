import React from 'react';

export default function Carousel({ searchQuery, setSearchQuery }) {
  // Increased height for larger carousel
  const imageStyle = {
    height: '480px',
    objectFit: 'cover',
    opacity: 0.85,
    borderRadius: '1.1rem',
    filter: 'brightness(0.80) contrast(1.08) saturate(1.05)',
    boxShadow: '0 2px 24px 0 rgba(20,23,26,0.16)'
  };

  // Soft dark overlay for readability
  const blackFadeOverlay = {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    background: 'linear-gradient(to bottom, rgba(34,39,46,0.65) 60%, rgba(34,39,46,0.95) 100%)',
    borderRadius: '1.1rem',
    pointerEvents: 'none'
  };

  // Prevent page reload on search
  const handleSubmit = (e) => e.preventDefault();

  return (
    <div
      id="carouselExampleFade"
      className="carousel slide carousel-fade gh-carousel"
      data-bs-ride="carousel"
      style={{ position: 'relative', borderRadius: '1.1rem', overflow: 'hidden', marginBottom: '2rem' }}
    >
      <div className="carousel-inner">
        <div className="carousel-item active" style={{ position: 'relative' }}>
          <img
            src="https://foodish-api.com/images/biryani/biryani11.jpg"
            className="d-block w-100"
            style={imageStyle}
            alt="Biryani"
          />
          <div style={blackFadeOverlay}></div>
          <div className="carousel-caption d-flex justify-content-center align-items-center" style={{ bottom: '1.6rem' }}>
            <form className="d-flex gh-search-form" role="search" onSubmit={handleSubmit}>
              <input
                className="form-control gh-search-input"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="btn gh-btn-search" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
        <div className="carousel-item" style={{ position: 'relative' }}>
          <img
            src="https://foodish-api.com/images/pasta/pasta4.jpg"
            className="d-block w-100"
            style={imageStyle}
            alt="Pasta"
          />
          <div style={blackFadeOverlay}></div>
        </div>
        <div className="carousel-item" style={{ position: 'relative' }}>
          <img
            src="https://foodish-api.com/images/samosa/samosa8.jpg"
            className="d-block w-100"
            style={imageStyle}
            alt="Samosa"
          />
          <div style={blackFadeOverlay}></div>
        </div>
      </div>
      <button
        className="carousel-control-prev gh-carousel-arrow"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next gh-carousel-arrow"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}