import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/slice/productSlice";
import WareInfo from "../components/WareInfo";
import arrowUp from "/images/arrow-up.png";
import arrowDown from "/images/arrow-down.png";

const WareDetails = () => {
  const { id } = useParams();
  const [displayImage, setDisplayImage] = useState();
  const [images, setImages] = useState([]);
  const [thumbnailIndex, setThumbnailIndex] = useState(0);

  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (products.length > 0 && id >= 0 && id < products.length) {
      const ware = products[id];
      setDisplayImage(ware.image);
      setImages([
        ware.thumbnail1,
        ware.thumbnail2,
        ware.thumbnail3,
        ware.thumbnail4,
      ]);
    }
  }, [products, id]);

  const handleThumbnailClick = (image) => {
    setDisplayImage(image);
  };

  const handleThumbnailIndex = (index) => {
    setThumbnailIndex(index);
  };

  const handleArrowDownClick = () => {
    setThumbnailIndex((prevIndex) => (prevIndex + 1) % images.length);
    setDisplayImage(
      images[(thumbnailIndex - 1 + images.length) % images.length]
    );
  };

  const handleArrowUpClick = () => {
    setThumbnailIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
    setDisplayImage(images[(thumbnailIndex + 1) % images.length]);
  };

  const ware = products[id];

  return (
    <section className="product-page-section">
      {ware && (
        <div className="product-page-div">
          <div className="thumbnails">
            <img
              className="arrows"
              src={arrowUp}
              onClick={handleArrowUpClick}
              alt="Arrow Up"
            />
            {images.map((thumbnail, index) => (
              <div
                className={`thumbnail-container ${
                  thumbnailIndex === index && "selected-thumbnail"
                }`}
                key={index}
                onClick={() => {
                  handleThumbnailClick(thumbnail);
                  handleThumbnailIndex(index);
                }}
              >
                <img src={thumbnail} alt={`Thumbnail ${index}`} />
              </div>
            ))}
            <img
              className="arrows"
              src={arrowDown}
              onClick={handleArrowDownClick}
              alt="Arrow Down"
            />
          </div>
          <img className="display" src={displayImage} alt="Display" />
          <WareInfo ware={ware} />
        </div>
      )}
    </section>
  );
};

export default WareDetails;
