import { type FC, useState } from "react";
import { type Product } from "../interfaces/product.interface";

interface Props {
  products: Product[];
  onEdit: (p: Product) => void;
  onToggleActive: (p: Product) => void;
}

const ProductTable: FC<Props> = ({ products, onEdit, onToggleActive }) => {
  const [showConfirm, setShowConfirm] = useState<Product | null>(null);

  const handleToggle = (product: Product) => {
    const updatedProduct = { ...product, isActive: !product.isActive };
    onToggleActive(updatedProduct);
    setShowConfirm(null);
  };

  return (
    <>
      <table className="product-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Active</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>{p.category}</td>
              <td>{p.stock}</td>
              <td className={p.isActive ? 'status-active' : 'status-inactive'}>
                {p.isActive ? "Yes" : "No"}
              </td>
              <td>
                <div className="table-actions">
                  <button className="edit-btn" onClick={() => onEdit(p)} title="Edit">
                    <i className="fas fa-edit"></i>
                  </button>
                  <button 
                    className={`toggle-btn ${p.isActive ? 'toggle-active' : 'toggle-inactive'}`}
                    onClick={() => setShowConfirm(p)}
                    title={p.isActive ? 'Deactivate' : 'Activate'}
                  >
                    <i className={`fas ${p.isActive ? 'fa-check-circle' : 'fa-times-circle'}`}></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showConfirm && (
        <div className="modal-overlay" onMouseDown={() => setShowConfirm(null)}>
          <div className="confirm-modal" onMouseDown={(e) => e.stopPropagation()}>
            <h3>Confirmation?</h3>
            <p>
              Are you sure you want to {showConfirm.isActive ? 'deactivate' : 'activate'} "{showConfirm.name}"?
            </p>
            <div className="confirm-buttons">
              <button className="btn-confirm-yes" onClick={() => handleToggle(showConfirm)}>
                Yes, {showConfirm.isActive ? 'Deactivate' : 'Activate'}
              </button>
              <button className="btn-confirm-no" onClick={() => setShowConfirm(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductTable;
