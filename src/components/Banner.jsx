


import { BANNER_IMAGE_URL } from "../constants";

function Banner() {
  return (
    <div className="banner">
      
      <div className="banner-image-container">
        <img
          className="banner-img"
          src={BANNER_IMAGE_URL}
          alt="banner"
        />

        <div className="title-overlay">
          <h1 className="page-title">Buy Me A Coffee</h1>
        </div>
      </div>
    </div>
  );
}

export default Banner;

