// app/product/page.jsx

import React from 'react';

async function fetchData() {
    // Fetch data from an API or static data
    return [
        { id: 1, name: 'Laptop', price: '$999' },
        { id: 2, name: 'Phone', price: '$599' },
        { id: 3, name: 'Tablet', price: '$399' },
    ];
}

export default async function ProductPage() {
    const products = await fetchData(); // Fetching data directly in the component

    return (
        <div>
            <h1>Product List</h1>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        <h2>{product.name}</h2>
                        <p>{product.price}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
