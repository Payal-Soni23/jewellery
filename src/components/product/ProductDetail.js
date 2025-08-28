import React ,{useState}from 'react';
import { useParams } from 'react-router-dom';
import {allProducts} from './data/Product';
import SimilarProductsCarousel from './SimilarProductsCarousel';
import { useCart } from '../../context/CartContext';

const ProductDetail = () => {
  const { name } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [alert, setAlert] = useState('');

  const product  = allProducts.find((p) => p.name.toString() === name);

  if (!product) return <p>Product not found</p>;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAlert('✅ Item added to cart!');
    setTimeout(() => setAlert(''), 2000); // Clear alert after 2 sec
  };

  return (
    <div className="container py-4">
      {alert && <div className="alert alert-success">{alert}</div>}

      <div className="row mb-4">
        <div className="col-md-6">
          <div className="d-flex overflow-auto gap-3">
            {product.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${product.name}-${idx}`}
                style={{ height: '300px', objectFit: 'cover', borderRadius: '10px' }}
              />
            ))}
          </div>
        </div>

        <div className="col-md-6">
          <h2>{product.name}</h2>
          <p><strong>Price:</strong> {product.price}</p>
          <p><strong>Category:</strong> {product.category}</p>
           <p className="mt-4">
            This beautifully crafted piece adds elegance to any outfit. Perfect for both daily wear and special occasions.
          </p>

          <div className="d-flex align-items-center gap-2 mb-3">
            <label htmlFor="qty" className="form-label mb-0">Qty:</label>
            <input
              id="qty"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="form-control"
              style={{ width: '80px' }}
            />
          </div>

          <button className="btn btn-dark" onClick={handleAddToCart}>
            🛒 Add to Cart
          </button>
        </div>
      </div>
      {/* Similar Products Carousel */}
      <h4 className="mb-3">You might also like</h4>
      <SimilarProductsCarousel category={product.category} currentId={product.id} currentName={product.name}/>
    </div>
  );
};

 export default ProductDetail;