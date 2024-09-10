import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../index.css'
import { updateCount } from '../redux/productSlice';
import { useNavigate } from 'react-router-dom';
export default function Card(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = props.title;
  const products = useSelector((state) => state.products.products);
  const filteredProducts = data.trim() !== '' ? products.filter(product => {
    const searchWords = data.toLowerCase().split(' ');
    return searchWords.some(word => product.modelName.toLowerCase().includes(word));
  }) : [];
  const handleAddReviewClick = () => {
    navigate('/search/ProductVariants'); 
};
  useEffect(() => {
    dispatch(updateCount(filteredProducts.length));
  }, [dispatch,filteredProducts.length]);

  return (
    <>
      <div className=' flex flex-col justify-center items-center'>
        <div className='scrollbar-nav overflow-y-auto max-h-96 mt-1 scroll-smooth pr-3'>
          {filteredProducts.length > 0 ? (filteredProducts.map((product) => (
            <div className="group">
            <div className="flex flex-row text-zinc-300  bg-[#141416] gradient-border rounded-lg mb-4 h-60 w-full group-hover:bg-neutral-800 ">
              <div className="flex flex-row">
                <div className=" w-52 h-full bg-black group-hover:bg-neutral-900"/>
                <div className="w-2/3 mr-10 pt-1 border-l-2 rounded-md border-neutral-700">
                  <div className=" flex flex-col mb-1 ml-2 mt-2">
                  <p className=' text-lg ml-8'>{product.modelName}</p>
                  <p className=' text-xs ml-3 text-[#454444]'>Laptop/Gaming Laptop</p>
                  </div>
                  <div className="mt-3 flex flex-row ml-5">
                    <div className="flex flex-col mr-7"><div className=""><p className=' text-sm text-[#464646]'>Model</p></div><div className="">
                      <p className=' text-zinc-300 text-xs mt-2'>Titan GT76</p></div></div>
                    <div className="border border-t-1 border-gray-600" style={{ height: "53px" }}/>
                    <div className="flex flex-col mr-7 ml-3.5"><div className=""><p className=' text-sm text-[#464646]'>Manufacturer</p></div><div className="">
                      <p className=' text-xs mt-1.5 text-zinc-300'>Micro-Star<br /> International</p></div></div>
                      <div className="border border-t-1 border-gray-600" style={{ height: "53px" }}/>
                    <div className="flex flex-col ml-3"> <div className=""><p className=' text-sm text-[#464646]'>Manufactored</p></div><div className="">
                      <p className=' text-xs text-zinc-300 text-center mt-2.5' >China</p></div></div>
                  </div>
                  <div className=" flex flex-col mt-8 ml-4">
                    <div className="flex flex-row ml-1 gap-3">
                    <div className=""><p className=' text-[#464646] text-md' >Variants</p></div>
                      <div className=""><a className=' text-orange-600 underline text-xs'>#i3-12700HX</a></div>
                      <div className=""><a className=' text-orange-600 underline text-xs'>#i3-12700HX</a></div>
                      <div className=""><a className=' text-orange-600 underline text-xs'>#i3-12700HX</a></div>
                    </div>
                    <div className="flex flex-row ml-16 pl-2 gap-3">
                      <div className=""><a className=' text-orange-600 underline  text-xs '>#i3-12700HX</a></div>
                      <div className=""><a className=' text-orange-600 underline  text-xs '>#i3-12700HX</a></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col ml-12 mt-10 mr-5 gap-7">
                <div className=""><button className=' text-white bg-orange-600 text-xs px-2.5 py-2' onClick={handleAddReviewClick} >Add Review</button></div>
                <div className=""><button className=' text-white border border-orange-600 text-xs px-3.5 py-2' >Add Asset</button></div>
                <div className=""><button className=' text-white border border-orange-600 text-xs px-5 py-2 ' >Validate</button></div>
              </div>
            </div>
            </div>
          )
          )
          )
            : (
              <div className='flex flex-row gap-80 bg-neutral-900 hover:bg-neutral-800  h-24 px-5 py-3  rounded-md items-center text-neutral-300'>
                <div className=' mr-20'>
                  <h1 className='text-2xl'>{props.title}</h1>
                  <span className='font-extralight text-xs'>Product Not Found</span>
                </div>
                <div className=" ml-20">
                <Link to="/search/AddProduct">
                  <div className='flex float-right '>
                    <button className='bg-orange-500 text-neutral-300 font-normal text-sm rounded-sm items-center px-2 py-1 h-7 mr-3 pr-3'>
                      Add Product
                    </button>
                  </div>
                </Link>
                </div>
              </div>
            )
          }
        </div>
      </div>
    </>
  )
}