/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
export default function Home() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const fetchData = async () => {
    let dty = await fetch("https://dummyjson.com/products?limit=100");
    let res = await dty.json();
    if (res && res.products) {
      setProducts(res.products);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const selectedPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= products.length / 10 &&
      selectedPage !== page
    )
      setPage(selectedPage);
  };

  return (
    <div className="">
      {products.length > 0 && (
        <div className="products">
          {products.slice(page * 10 - 10, page * 10).map((product) => {
            //to be able to start from 0, we need to use (page * 10 - 10)
            return (
              <span key={product.id} className="products__single">
                <img alt={product.title} src={product.thumbnail} />
                <span>{product.title}</span>
              </span>
            );
          })}
        </div>
      )}
      {products.length > 0 && (
        <div className="pagination">
          <button
            className={page > 1 ? "" : "pagination__disabled"}
            onClick={() => selectedPageHandler(page - 1)}
          >
            ◀️
          </button>
          {[...Array(products.length / 10)].map((_, index) => (
            <span
              onClick={() => selectedPageHandler(index + 1)}
              key={index}
              className={page === index + 1 ? "pagination__selected" : ""}
            >
              {index + 1}
            </span>
          ))}
          <button
            onClick={() => selectedPageHandler(page + 1)}
            className={
              page < products.length / 10 ? "" : "pagination__disabled"
            }
          >
            ▶️
          </button>
        </div>
      )}
    </div>
  );
}
