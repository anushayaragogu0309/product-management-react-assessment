import { type FC, useState } from "react";
import { type Product } from "../interfaces/product.interface";

interface Props {
  product: Product;
  onEdit: (p: Product) => void;
  onToggleActive: (p: Product) => void;
}

const ProductCard: FC<Props> = ({ product, onEdit, onToggleActive }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleToggle = () => {
    const updatedProduct = { ...product, isActive: !product.isActive };
    onToggleActive(updatedProduct);
    setShowConfirm(false);
  };

  return (
    <>
      <div className="card">
        <h3 className="card-title">{product.name}</h3>
        <p className="card-price">{product.price}</p>
        <p className="card-category">{product.category}</p>
        <p className="card-stock">Stock: {product.stock}</p>
        <p className="card-status">
          Status: <span className={product.isActive ? 'status-active' : 'status-inactive'}>
            {product.isActive ? 'Active' : 'Inactive'}
          </span>
        </p>

        <div className="card-actions">
          <button className="edit-btn" onClick={() => onEdit(product)} title="Edit">
            <i className="fas fa-edit"></i>
          </button>
          <button 
            className={`toggle-btn ${product.isActive ? 'toggle-active' : 'toggle-inactive'}`}
            onClick={() => setShowConfirm(true)}
            title={product.isActive ? 'Deactivate' : 'Activate'}
          >
            <i className={`fas ${product.isActive ? 'fa-check-circle' : 'fa-times-circle'}`}></i>
          </button>
        </div>
      </div>

      {showConfirm && (
        <div className="modal-overlay" onMouseDown={() => setShowConfirm(false)}>
          <div className="confirm-modal" onMouseDown={(e) => e.stopPropagation()}>
            <h3>Confirmation?</h3>
            <p>
              Are you sure you want to {product.isActive ? 'deactivate' : 'activate'} "{product.name}"?
            </p>
            <div className="confirm-buttons">
              <button className="btn-confirm-yes" onClick={handleToggle}>
                Yes, {product.isActive ? 'Deactivate' : 'Activate'}
              </button>
              <button className="btn-confirm-no" onClick={() => setShowConfirm(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
