import React, {useEffect, useState} from 'react'
import './ListProduct.css'
import delete_icon from '../../assets/delete-bin.png'

const ListProduct = () => {

    const [allProducts, setAllProducts] = useState([]);
    
    const fetchInfo = async () => {
        
         try {
            const res = await fetch('https://adminecomapp.onrender.com/allproducts');
            if (!res.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await res.json();
            setAllProducts(data);
         } catch (error) {
            console.log('Error fetching products:', error);
         }
      };
  
    useEffect(() => {
        fetchInfo();
    }, [])

    const remove_product = async (id) => {
      try {
          const res = await fetch('https://adminecomapp.onrender.com/removeproduct', {
              method: 'POST',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ id: id }),
          });
          if (!res.ok) {
              throw new Error('Failed to remove product');
          }
          await fetchInfo(); // Refresh the product list after removal
      } catch (error) {
          console.error('Error removing product:', error);
      }
  };

     return (
        <div className="list-product">
             <h1>All Products List</h1>
             <div className="list-products-main">
                <p>Products</p>
                <p>Title</p>
                <p>Old Price</p>
                <p>New Price</p>
                <p>Category</p>
                <p>Remove</p>
             </div>
             <div className="list-all-product">
                <hr/> 
                 
                {allProducts.map((product) => {
                       <div key={product.id} className="list-products-main list-of-product-format">
                        <img src={product.image} className="listproduct-product-image"/>        
                        <p>{product.name}</p>
                        <p>${product.old_price}</p>
                        <p>${product.new_price}</p>
                        <p>{product.category}</p>
                        <img onClick={() => {remove_product(product.id)}} className='list-product-icon' src={delete_icon} alt=""/>
                    </div>
                  })}
                </div>
                
        </div>
     )
}

export default ListProduct