import axios from "axios"
import Card from "../components/base/Card";
import React,{useEffect,useState} from 'react'
import { useSearchParams } from 'react-router-dom';
import Footer from '../components/base/Footer/Footer'
import Navbar from '../components/module/home/Navbar/Navbar'


const MyProducts = () => {

  const [search, setSearch] = useSearchParams([]);
  const [products, setProducts] = useState([])
  const getProducts = async () => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND}/product?sortby=id&${search}&sort=asc&page=1&limit=5`
      )
      .then((response) => {
        console.log(response.data.data);
        setProducts(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
    useEffect(() => {
  
      getProducts();
      search.get("search");
    }, [ search]);

return (
  <div className="h-100">
    <Navbar />
    <div className="container">
      <div className="row">
        <div className="products">
          <h3 className="title">New</h3>
          <p className="mt-5">My Products List</p>
        </div>

        {/* <div className="row row-cols-2 row-cols-sm-3 row-cols-md-5 mt-5">
        </div> */}

        <div className="row row-cols-2 row-cols-sm-3 row-cols-md-5 g-3">
          {products.length > 0 ? (
            products.map(item => (
              < div className="col" key={item.id}>
                <Card
                  src={item.photo}
                  to={`/detail/${item.id}`}
                  titleName={item.productname}
                  price={item.priceproduct}
                />
              <Footer/>
              </div>
            ))
          ) : (
            <div className=" text-center m-auto mb-5">
              <h2>Very sorry... the Product that you looking for is not found :(</h2>
              <Footer />
            </div>
          )
        }
        </div>
        {/* <div className="row row-cols-2 row-cols-sm-3 row-cols-md-5 mt-5 justify-content-evenly">
        </div> */}
        
      </div>
    </div>
    
  </div>
);
}

export default MyProducts