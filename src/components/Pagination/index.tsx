import { useMemo } from "react";
import "./pagination.css";
export interface Props {
  page: number;
  totalRecord: number;
  countPerPage: number;
  handlePagination: (page: number) => void;
}
export const PaginationComponent: React.FC<Props> = ({
  page,
  totalRecord,
  countPerPage,
  handlePagination,
}) => {
  const maxPages = useMemo(() => {
    return totalRecord === 0 ? 1 : Math.ceil(totalRecord / countPerPage);
  }, [countPerPage, totalRecord]);

  console.log(page, totalRecord, countPerPage, handlePagination);

  return (
    <div className="pagination-wrapper">
      {maxPages > 1 && page !== 1 && (
        <button
          onClick={() => handlePagination(page - 1)}
          type="button"
          className="page-btn"
        >
          &lt;
        </button>
      )}
      {maxPages > 1 && (
        <button
          onClick={() => handlePagination(1)}
          type="button"
          className={`page-btn ${page === 1 && "active"}`}
        >
          {1}
        </button>
      )}
      {page > 3 && <button className="page-btn dot">...</button>}
      {page === maxPages && maxPages > 3 && (
        <button
          onClick={() => handlePagination(page - 2)}
          type="button"
          className="page-btn"
        >
          {page - 2}
        </button>
      )}
      {page > 2 && (
        <button
          onClick={() => handlePagination(page - 1)}
          type="button"
          className="page-btn"
        >
          {page - 1}
        </button>
      )}
      {page !== 1 && page !== maxPages && (
        <button
          onClick={() => handlePagination(page)}
          type="button"
          className="page-btn active"
        >
          {page}
        </button>
      )}
      {page < maxPages - 1 && (
        <button
          onClick={() => handlePagination(page + 1)}
          type="button"
          className="page-btn"
        >
          {page + 1}
        </button>
      )}
      {page === 1 && maxPages > 3 && (
        <button
          onClick={() => handlePagination(page + 2)}
          type="button"
          className="page-btn"
        >
          {page + 2}
        </button>
      )}
      {page < maxPages - 2 && <button className="page-btn dot">...</button>}
      <button
        onClick={() => handlePagination(maxPages)}
        type="button"
        className={`page-btn ${page === maxPages && "active"}`}
      >
        {maxPages}
      </button>
      {page !== maxPages && (
        <button
          onClick={() => handlePagination(page + 1)}
          type="button"
          className="page-btn"
        >
          &gt;
        </button>
      )}
    </div>
  );
};
export default PaginationComponent;
