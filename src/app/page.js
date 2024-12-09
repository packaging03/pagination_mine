/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
export default function Home() {
  const [products, setProducts] = useState([]);

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

  return (
    <div className="">
      {products.length > 0 && (
        <div className="products">
          {products.map((product) => {
            
            return (
              <span key={product.id} className="products__single">
                <img alt={product.title} src={product.thumbnail} />
                <span>{product.title}</span>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
