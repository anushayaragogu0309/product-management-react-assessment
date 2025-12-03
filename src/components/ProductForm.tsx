import { useState, useEffect } from "react";
import { type Product } from "../interfaces/product.interface";

interface ProductFormProps {
  product: Product | null;
  onSubmit: (data: Product) => void;
  onCancel: () => void;
}

export default function ProductForm({ product, onSubmit, onCancel }: ProductFormProps) {
  const [form, setForm] = useState<Product>(
    product || {
      id: Date.now(),
      name: "",
      price: 0,
      category: "",
      stock: 0,
      description: "",
      createdAt: new Date().toISOString(),
      isActive: true
    }
  );

  useEffect(() => {
    if (product) {
      setForm(product);
    }
  }, [product]);

  const handleChange = (key: keyof Product, value: any) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errors: Record<string, string> = {};

    if (!form.name || !form.name.trim()) {
      errors.name = "Name is required";
    }
    if (!form.price || form.price <= 0) {
      errors.price = "Price must be greater than 0";
    }
    if (!form.category || !form.category.trim()) {
      errors.category = "Category is required";
    }

    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) return;

    onSubmit(form);
  };

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <button type="button" className="modal-close" onClick={onCancel} aria-label="Close">×</button>
      <h2>{product ? "Edit Product" : "Add Product"}</h2>

      {/* NAME */}
      <label className="form-group">
        Name
        <input
          type="text"
          value={form.name}
          onChange={(e) => { handleChange("name", e.target.value); setFieldErrors({ ...fieldErrors, name: "" }); }}
        />
        {fieldErrors.name && <div className="error-text">{fieldErrors.name}</div>}
      </label>

      {/* PRICE */}
      <label className="form-group">
        Price
        <input
          type="number"
          value={form.price}
          onChange={(e) => { handleChange("price", Number(e.target.value)); setFieldErrors({ ...fieldErrors, price: "" }); }}
        />
        {fieldErrors.price && <div className="error-text">{fieldErrors.price}</div>}
      </label>

      {/* CATEGORY */}
      <label className="form-group">
        Category
        <input
          type="text"
          value={form.category}
          onChange={(e) => { handleChange("category", e.target.value); setFieldErrors({ ...fieldErrors, category: "" }); }}
        />
        {fieldErrors.category && <div className="error-text">{fieldErrors.category}</div>}
      </label>

      {/* STOCK */}
      <label className="form-group">
        Stock
        <input
          type="number"
          value={form.stock}
          onChange={(e) => handleChange("stock", Number(e.target.value))}
        />
      </label>

      {/* DESCRIPTION */}
      <label className="form-group">
        Description
        <textarea
          value={form.description}
          onChange={(e) => handleChange("description", e.target.value)}
        ></textarea>
      </label>

      <div className="form-buttons">
        <button type="submit" className="btn-primary">
          {product ? "Update Product" : "Add Product"}
        </button>

        <button type="button" className="btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
