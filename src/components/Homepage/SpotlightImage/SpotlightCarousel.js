import React from 'react';
import Slider from 'react-slick';
// import './SpotlightCarousel.css'; // optional

export default function SpotlightCarousel() {
  const items = [
    { id: 1, src: require('../../../assets/images/neckpeice/hw pendent.avif'), label: 'New Rings', href:'/' },
    { id: 2, src: require('../../../assets/images/rings/Selection (1).png'), label: 'Royal Gold' },
    { id: 3, src: require('../../../assets/images/rings/Selection.png'), label: 'Diamond Cuts' },
    { id: 4, src: require('../../../assets/images/rings/jewel2.png'), label: 'Everyday Shine' },
    { id: 5, src: require('../../../assets/images/neckpeice/jewel1.png'), label: 'Occasion Wear' },
    { id: 6, src: require('../../../assets/images/banner/Selection-3.png'), label: 'Gift Ideas' },
  ];

  const settings = {
    infinite: true,
    speed: 2000,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  return (
    <div className="container- my-5 py-3">
      <h2 className="mb-5 mx-5 px-3" style={{ fontFamily: '"Playfair Display", serif', color: '#4a4a4a' }}>
        Spotlight Collection
      </h2>
      <Slider {...settings}>
        {items.map((item) => (
          <div key={item.id} className="px-4 text-center">
            <div className="carousel-img-wrapper ">
              <a href={item.href}><img
                src={item.src}
                alt={item.label}
                className="img-fluid mx-2"
                style={{ height: '300px', width: '300px',borderRadius:'0%', objectFit: 'cover' }}
              /></a>
            </div>
            <h6 className="d-block mt-2 ">{item.label}</h6>
          </div>
        ))}
      </Slider>
    </div>
  );
}
