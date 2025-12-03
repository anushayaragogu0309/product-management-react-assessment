import { useEffect, useState } from "react";
import { type Product } from "../interfaces/product.interface";
import { getProducts } from "../services/productService";
import  useDebounce  from "../utils/useDebounce";

import ProductFilters from "../components/ProductFilters";
import ProductTable from "../components/ProductTable";
import ProductCard from "../components/ProductCard";
import ProductForm from "../components/ProductForm";
import Pagination from "../components/Pagination";

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [view, setView] = useState<"table" | "grid">("table");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

  const [page, setPage] = useState(1);
  const perPage = 10;

  // close modal on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showForm) {
        setEditingProduct(null);
        setShowForm(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showForm]);

  useEffect(() => {
    getProducts().then((res) => setProducts(res));
  }, []);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / perPage);
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  const handleSave = (p: Product) => {
    setProducts((prev) => {
      const exists = prev.find((x) => x.id === p.id);
      if (exists) {
        return prev.map((item) => (item.id === p.id ? p : item));
      }
      return [...prev, p];
    });

    setEditingProduct(null);
    setShowForm(false);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleToggleActive = (product: Product) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === product.id ? product : item))
    );
  };

  return (
    <div className="container full-width">
      <h1 className="title">Product Management</h1>

      <ProductFilters
        search={search}
        onSearch={setSearch}
        view={view}
        onViewChange={setView}
        onAdd={() => {
          setEditingProduct(null);
          setShowForm(true);
        }}
      />

      {view === "table" ? (
        <ProductTable products={paged} onEdit={handleEdit} onToggleActive={handleToggleActive} />
      ) : (
        <div className="product-grid">
          {paged.map((p) => (
            <ProductCard key={p.id} product={p} onEdit={handleEdit} onToggleActive={handleToggleActive} />
          ))}
        </div>
      )}

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />

      {showForm && (
        <div className="modal-overlay" onMouseDown={() => { setEditingProduct(null); setShowForm(false); }}>
          <div className="form-modal" onMouseDown={(e) => e.stopPropagation()}>
            <ProductForm
              product={editingProduct}
              onSubmit={(p) => { handleSave(p); }}
              onCancel={() => { setEditingProduct(null); setShowForm(false); }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
