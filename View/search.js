// import axios from 'axios';
// import React, { useState, useEffect } from 'react';


// function Search() {
//   const [car, setcar] = useState([]);
//     useEffect(() => {
//         axios.get(`https://localhost:7175/api/Cars`)
//             .then(res => setcar(res.data));   
//     }, []);
//   const [searchTerm, setSearchTerm] = useState(''); // State to store the search term
//   const [filteredProducts, setFilteredProducts] = useState(car); // State to store filtered products

//   useEffect(() => {
//     const filteredProducts = car.filter((product) =>
//       product.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredProducts(filteredProducts);
//   }, [searchTerm, car]); // Update filteredProducts when searchTerm or products change

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   return (
//     <div>
//       <input type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Search products..." />
//       <ul>
//         {filteredProducts.map((product) => (
//           <li key={product.id}>
//             {product.name} - {product.description}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Search;

import React, { useState, useEffect } from 'react';
import Navbar from './module/navbar'; 
import axios from 'axios';
import Footer from './module/footer';

function Search() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const isScreen = windowWidth > 768;
  const content = isScreen ? <Desktop /> : <Mobile />;

  return (
    <body>
      {content}
    </body>
  );
};

const Desktop = () => {
  const [car, setcar] = useState([]);
    useEffect(() => {
        axios.get(`https://localhost:7175/api/Cars`)
            .then(res => setcar(res.data));   
    }, []);
  const [searchTerm, setSearchTerm] = useState(''); // State to store the search term
  const [filteredProducts, setFilteredProducts] = useState(car); // State to store filtered products

  useEffect(() => {
    const filteredProducts = car.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filteredProducts);
  }, [searchTerm, car]); // Update filteredProducts when searchTerm or products change

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <body class='Desktop'>
      <Navbar/>
      
      <Footer/>
    </body>
  );
};
const Mobile = () => {
  return (
    <body>
       <Navbar/>
      Nội dung cho màn hình dưới 1000px
    </body>
  );
};
export default Search;