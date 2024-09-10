import { Link } from "react-router-dom";
import React, { useState,useEffect,useRef } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/productSlice";
import { useNavigate } from "react-router-dom";
import { Trash2, Plus,X } from "lucide-react";
export default function AddProduct() {
  const dispatch = useDispatch();
  const [productDetails, setProductDetails] = useState({
    brandName: "",
    modelName: "",
    catalogName: "",
    subCatalogName: "",
    modelVariants: [{ variantName: "", productReference: "" }],
  });
  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedVariants = [...productDetails.modelVariants];
    updatedVariants[index][name] = value;
    setProductDetails({ ...productDetails, modelVariants: updatedVariants });
  };
  const handleAddField = () => {
    setProductDetails({
      ...productDetails,
      modelVariants: [
        ...productDetails.modelVariants,
        { variantName: "", productReference: "" },
      ],
    });
  };
  useEffect(() => {
    brandNameRef.current.focus();
  },[]);
  const handleRemoveField = (index) => {
    const updatedVariants = [...productDetails.modelVariants];
    updatedVariants.splice(index, 1);
    setProductDetails({ ...productDetails, modelVariants: updatedVariants });
  };

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addToCart(productDetails));
    navigate("/search");
  };
   const brandNameRef = useRef(null);

  return (
      <div className=" bg-neutral-900 rounded-lg  pt-4  max-w-7xl  mr-7  ml-5 mx-auto  pb-3">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col text-neutral-300  gap-2   p-3 m-3  pl-10 ml-12 "
        >  
          <div className="flex flex-col gap-3">
            <label for="Brand Name" className=" font-normal ">
              Brand Name
            </label>
            <input
              ref={brandNameRef}
              name="brandName"
              value={productDetails.brandName}
              onChange={(e) =>
                setProductDetails({
                  ...productDetails,
                  brandName: e.target.value,
                })
              }
              type="text"
              placeholder="Describe Brand Name"
              className="bg-neutral-700 h-8 rounded-sm placeholder-neutral-500 pl-5 max-w-5xl  "
            />
          </div>
          <div className="flex flex-col gap-3">
            <label for="Brand Name" className="font-normal ">
              Model Name
            </label>
            <input
              name="modelName"
              value={productDetails.modelName}
              onChange={(e) =>
                setProductDetails({
                  ...productDetails,
                  modelName: e.target.value,
                })
              }
              type="text"
              placeholder="Describe Model Name"
              className="bg-neutral-700 h-8 rounded-sm placeholder-neutral-500 pl-5 max-w-5xl  "
            />
          </div>

          <div className="flex flex-col gap-3">
            <label for="Catalog Name" className="font-normal ">
              Catalog Name
            </label>
            <input
              name="catalogName"
              value={productDetails.catalogName}
              onChange={(e) =>
                setProductDetails({
                  ...productDetails,
                  catalogName: e.target.value,
                })
              }
              type="text"
              placeholder="Describe Catalog Name"
              className="bg-neutral-700 h-8 rounded-sm placeholder-neutral-500 pl-5 max-w-5xl  "
            />
          </div>
          <div className="flex flex-col gap-3">
            <label for="sub catalog name" className="font-normal ">
              Sub Catalog Name
            </label>
            <input
              name="subCatalogName"
              value={productDetails.subCatalogName}
              onChange={(e) =>
                setProductDetails({
                  ...productDetails,
                  subCatalogName: e.target.value,
                })
              }
              type="text"
              placeholder="Describe Sub Catalog Name"
              className="bg-neutral-700 h-8 rounded-sm placeholder-neutral-500 pl-5 max-w-5xl  "
            />
          </div>
          <div className="flex flex-col gap-3">
            {productDetails.modelVariants.map((variant, index) => (
              <div className="flex flex-col gap-3 transition-all">
                <div key={index} className="flex  gap-3 items-center justify-between pr-14 mr-16">
                  <label for="sub catalog name" className="font-normal ">
                    Model Variant Name
                  </label>
                  {productDetails.modelVariants.length > 1 && (
                    <span
                  type="button"
                 onClick={() => handleRemoveField(index)}
                  className="text-white hover:opacity-75 bg-orange-500 rounded-full p-2"
                >
                  <X size={15} />
                </span>
                  )}
                </div>
                <input
                  name="variantName"
                  value={variant.variantName}
                  onChange={(e) => handleChange(index, e)}
                  type="text"
                  placeholder="Describe Model Variant Name"
                  className="bg-neutral-700 h-8 rounded-sm placeholder-neutral-500 pl-5 max-w-5xl"
                />
                {/* </div> */}
                <div className="flex flex-col gap-3">
                  <label for="Reference Link" className="font-normal ">
                    Product Reference Link
                  </label>

                  <input
                    name="productReference"
                    value={variant.productReference}
                    onChange={(e) => handleChange(index, e)}
                    type="text"
                    placeholder="Describe Product Reference Link"
                    className="bg-neutral-700 h-8 rounded-sm placeholder-neutral-500 pl-5 max-w-5xl"
                  />
                </div>
              </div>
            ))}
            
            <div className="flex  hover:cursor-pointer items-center justify-center gap-2 border border-dashed border-spacing-10 p-1 border-orange-500 rounded-sm  text-sm py-3 max-w-5xl"
                 onClick={handleAddField}
            >
              <span className="bg-orange-500 text-neutral-800  rounded-sm "><Plus size={13}/></span>
              <span className="text-sm">Add more </span>
            </div>
          </div>
          <div className="flex justify-between max-w-5xl pt-5">
            <Link to="/search">
              <button className="bg-orange-500 text-neutral-300 font-semibold py-2 px-6 rounded-sm hover:opacity-50 ">
                Cancel
              </button>
            </Link>

            <button
              type="submit"
              className="bg-orange-500 text-neutral-300 font-semibold py-2 px-6 rounded-sm hover:opacity-50 "
            >
              Add Product
            </button>
          </div>
        </form>
      </div>

  );
}