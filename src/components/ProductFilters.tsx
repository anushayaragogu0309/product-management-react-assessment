import { type FC } from "react";

interface Props {
  search: string;
  onSearch: (v: string) => void;
  view: "table" | "grid";
  onViewChange: (v: "table" | "grid") => void;
  onAdd: () => void;
}

const ProductFilters: FC<Props> = ({ search, onSearch, view, onViewChange, onAdd }) => {
  return (
    <div className="filter-bar">
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => onSearch(e.target.value)}
      />

      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <button onClick={() => onViewChange("table")}
          className={view === "table" ? "active" : ""}>
           Table View
        </button>

        <button onClick={() => onViewChange("grid")}
          className={view === "grid" ? "active" : ""}>
           Grid View
        </button>

        <button className="add-btn" onClick={onAdd}>+ Add Product</button>
      </div>
    </div>
  );
};

export default ProductFilters;
