import React from "react";

export default function Paginado({
  recipesPerPage,
  allRecipes,
  paginado,
  currentPage,
  previousPage,
  nextPage,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul>
        <li onClick={previousPage}>
          <button disabled={currentPage <= 1}>Prev</button>
        </li>
        {pageNumbers &&
          pageNumbers.map((number, index) => {
            return (
              <button
                key={index}
                onClick={() => paginado(number)}
                className={number === currentPage ? "active" : ""}
              >
                {number}
              </button>
            );
          })}
        <li onClick={nextPage}>
          <button disabled={currentPage === pageNumbers.length}>Next</button>
        </li>
      </ul>
    </nav>
  );
}
