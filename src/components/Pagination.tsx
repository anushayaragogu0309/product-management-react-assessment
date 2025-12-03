import { type FC } from "react";

interface Props {
  page: number;
  totalPages: number;
  onPageChange: (p: number) => void;
}

const Pagination: FC<Props> = ({ page, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 7; 
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      
      let start = Math.max(2, page - 2);
      let end = Math.min(totalPages - 1, page + 2);
      
      if (start > 2) {
        pages.push('...');
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (end < totalPages - 1) {
        pages.push('...');
      }
      
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <div className="pagination">
      <button 
        disabled={page === 1} 
        onClick={() => onPageChange(page - 1)}
        className="pagination-btn"
      >
        Prev
      </button>

      <div className="pagination-numbers">
        {getPageNumbers().map((p, idx) => (
          typeof p === 'number' ? (
            <button
              key={idx}
              onClick={() => onPageChange(p)}
              className={`page-number ${page === p ? 'active' : ''}`}
            >
              {p}
            </button>
          ) : (
            <span key={idx} className="pagination-ellipsis">
              {p}
            </span>
          )
        ))}
      </div>

      <button 
        disabled={page === totalPages} 
        onClick={() => onPageChange(page + 1)}
        className="pagination-btn"
      >
        Next
      </button>

      <span className="pagination-info">
        Page {page} of {totalPages}
      </span>
    </div>
  );
};

export default Pagination;
