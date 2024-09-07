
// import React, { useState, useEffect, useRef } from 'react';
// import { FaArrowLeft, FaArrowRight, FaHeart, FaShoppingCart, FaExpand } from 'react-icons/fa';
// import axios from 'axios';

// const ProductCarousel = () => {
//   const [products, setProducts] = useState([]);
//   const scrollRef = useRef(null);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/v1/fur/products');
//         setProducts(response.data.data);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const scroll = (direction) => {
//     if (direction === 'left') {
//       scrollRef.current.scrollLeft -= 300;
//     } else {
//       scrollRef.current.scrollLeft += 300;
//     }
//   };

//   return (
//     <div className="relative w-full">
//       {/* Left scroll button */}
//       <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10">
//         <button
//           onClick={() => scroll('left')}
//           className="bg-orange-500 text-white p-3 rounded-full shadow-lg hover:bg-orange-600 transition duration-300"
//         >
//           <FaArrowLeft />
//         </button>
//       </div>

//       {/* Product Carousel */}
//       <div
//         className="flex overflow-x-scroll scrollbar-hide space-x-4 p-4"
//         ref={scrollRef}
//         style={{ scrollBehavior: 'smooth' }}
//       >
//         {products.length ? (
//           products.map((product) => (
//             <div
//               key={product._id}
//               className="relative w-64 bg-white rounded-lg shadow-lg transform transition-transform hover:scale-105"
//               style={{ flexShrink: 0 }}
//             >
//               {/* Product Image */}
//               <div className="relative h-64 w-full overflow-hidden rounded-t-lg">
//                 <img
//                   src={product.images[0]}
//                   alt={product.name}
//                   className="w-full h-full object-cover transition-opacity duration-300"
//                 />
//               </div>

//               {/* Product Details */}
//               <div className="p-4 text-center">
//                 <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
//                 <p className="text-sm text-gray-500 mt-2">{product.price} ₹</p>
//               </div>

//               {/* Action Buttons */}
//               <div className="absolute top-2 right-2 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
//                 <button className="bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition duration-200">
//                   <FaHeart />
//                 </button>
//                 <button className="bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition duration-200">
//                   <FaShoppingCart />
//                 </button>
//                 <button className="bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition duration-200">
//                   <FaExpand />
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-600">No products available</p>
//         )}
//       </div>

//       {/* Right scroll button */}
//       <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10">
//         <button
//           onClick={() => scroll('right')}
//           className="bg-orange-500 text-white p-3 rounded-full shadow-lg hover:bg-orange-600 transition duration-300"
//         >
//           <FaArrowRight />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProductCarousel;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ProductCard = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/v1/fur/products');
//         setProducts(response.data.data);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };
//     fetchProducts();
//   }, []);

//   return (
//     <div className="container mx-auto px-4">
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//         {products.map((product) => (
//           <div
//             key={product._id}
//             className="relative bg-gray-900 text-white rounded-lg shadow-lg overflow-hidden group transition-transform transform hover:scale-105"
//           >
         

//             {/* Product Image */}
//             <div className="relative h-64 overflow-hidden">
//               <img
//                 src={product.images[0]}
//                 alt={product.name}
//                 className="w-full h-full object-cover"
//               />
//             </div>

//             {/* Product Info */}
//             <div className="p-4 text-center space-y-2 overflow-hidden">
//               <h3 className="text-lg font-semibold">{product.name}</h3>
//               <p className="text-sm text-gray-400 mt-1">{product.category}</p>
//               <p className="mt-2 text-orange-400 font-bold">
//                 ₹ {product.price}
//               </p>
//             </div>

//             {/* Hover Actions */}
//             <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex justify-center items-center transition-opacity duration-300">
//               <button className="bg-orange-500 text-white px-4 py-2 rounded shadow hover:bg-orange-600">
//                 View Details
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductCard;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ProductCard = () => {
//   const [products, setProducts] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const fetchProducts = async (page = 3) => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/v1/fur/products?page=${page}&limit=12`);
//       setProducts(response.data.data);
//       setTotalPages(response.data.pages); // Assumes API returns totalPages
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     }
//   };

//   useEffect(() => {
//     fetchProducts(currentPage);
//   }, [currentPage]);

//   return (
//     <div className="container mx-auto px-4">
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//         {products.map((product) => (
//           <div
//             key={product._id}
//             className="relative bg-gray-900 text-white rounded-lg shadow-lg overflow-hidden group transition-transform transform hover:scale-105"
//           >
//             {/* "On Sale" Tag */}
//             {product.availability && (
//               <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
//                 On Sale
//               </span>
//             )}

//             {/* Product Image */}
//             <div className="relative h-64 overflow-hidden">
//               <img
//                 src={product.images[0]}
//                 alt={product.name}
//                 className="w-full h-full object-cover"
//               />
//             </div>

//             {/* Product Info */}
//             <div className="p-4 text-center">
//               <h3 className="text-lg font-semibold">{product.name}</h3>
//               <p className="text-sm text-gray-400 mt-1">{product.category}</p>
//               <p className="mt-2 text-orange-400 font-bold">
//                 ₹ {product.price} 
//               </p>
//             </div>

//             {/* Hover Actions */}
//             <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex justify-center items-center transition-opacity duration-300">
//               <button className="bg-orange-500 text-white px-4 py-2 rounded shadow hover:bg-orange-600">
//                 View Details
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Pagination Controls */}
//       <div className="flex justify-center mt-6">
//         <button
//           className="bg-gray-800 text-white px-4 py-2 rounded-l shadow hover:bg-gray-700 disabled:opacity-50"
//           onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//           disabled={currentPage === 1}
//         >
//           Previous
//         </button>
//         <button
//           className="bg-gray-800 text-white px-4 py-2 rounded-r shadow hover:bg-gray-700 disabled:opacity-50"
//           onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//           disabled={currentPage === totalPages}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./productSection.css";

const ProductCard = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async (page = 1) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/fur/products?page=${page}&limit=12`);
      setProducts(response.data.data);
      setTotalPages(response.data.pages); // Assumes API returns totalPages
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="relative cardBack  rounded-lg shadow-lg overflow-hidden group transition-transform transform hover:scale-105"
          >
            {/* "On Sale" Tag */}
            {product.availability && (
              <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded group-hover:opacity-100">
                {product['Workshop-Name']}
              </div>
            )}

            {/* Product Image */}
            <div className="relative h-64 overflow-hidden">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Info */}
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <h4 className="text-md text-gray-500 mb-2">{product.category}</h4>
              <h4 className="text-md text-gray-500 mb-2">{product['Workshop-Name']}</h4>
              <p className="text-xl font-bold text-orange-500">
                ₹ {product.price}
              </p>
            </div>

            {/* Hover Actions */}
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex justify-center items-center transition-opacity duration-300">
              <button className="bg-orange-500 text-white px-4 py-2 rounded shadow hover:bg-orange-600">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        {/* Previous Button */}
        <button
          className={`flex items-center justify-center px-4 py-2 mx-1 rounded-full shadow-md transition-colors duration-300 ${
            currentPage === 1 ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-gray-800 text-white hover:bg-gray-700'
          }`}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Page Numbers */}
        {[...Array(totalPages).keys()].map((page) => (
          <button
            key={page + 1}
            className={`px-4 py-2 mx-1 rounded-full shadow-md transition-colors duration-300 ${
              currentPage === page + 1 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setCurrentPage(page + 1)}
          >
            {page + 1}
          </button>
        ))}

        {/* Next Button */}
        <button
          className={`flex items-center justify-center px-4 py-2 mx-1 rounded-full shadow-md transition-colors duration-300 ${
            currentPage === totalPages ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-gray-800 text-white hover:bg-gray-700'
          }`}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
