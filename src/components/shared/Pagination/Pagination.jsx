import Link from "next/link";
import twFocusClass from "src/utils/twFocusClass";

const  Pagination = ({ className = "", paginationOptions}) => {
  const renderPaginationItem = (page, index) => {
    if (page === 1) {
      return (
        <span
          key={index}
          className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-primary-6000 text-white ${twFocusClass()}`}
        >
          {page}
        </span>
      );
    } else {
      return (
        <Link
          className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700 ${twFocusClass()}`}
          href={"#"}
        >
          {page}
        </Link>
      );
    }
  };

  return (
    <nav
      className={`nc-Pagination inline-flex space-x-1 text-base font-medium ${className}`}
    >
      {Array.from({ length: paginationOptions?.totalPages || 0 }, (_, index) =>
        renderPaginationItem(index + 1, index)
      )}
    </nav>
  );
};

export default Pagination;
