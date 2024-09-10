import React, { useState, useEffect } from "react";
import { Trash2, Plus } from "lucide-react";
import { X } from 'lucide-react';  
export default function KeyNotes() {
  const [selectedHeader, setSelectedHeader] = useState("Header1");
  const [formData, setFormData] = useState({
    Header1: Array(5).fill({ headline: "", description: "" }),
    Header2: Array(5).fill({ headline: "", description: "" }),
    Header3: Array(5).fill({ headline: "", description: "" }),
  });
  const [images, setImages] = useState({
    Header1: {},
    Header2: {},
    Header3: {},
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState(null);

  const handleInputChange = (header, index, field, value) => {
    const updatedData = [...formData[header]];
    updatedData[index] = {
      ...updatedData[index],
      [field]: value,
    };
    setFormData({
      ...formData,
      [header]: updatedData,
    });
  };
    console.log(formData)
  const handleImageUpload = (header, index, files) => {
    if (files && files.length > 0) {
      const file = files[0];
      const url = URL.createObjectURL(file);
      const updatedImages = { ...images };
      updatedImages[header][index] = {
        url,
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2),
      };
      setImages(updatedImages);
    }
  };

  const openModal = (url) => {
    setPreviewImage(url);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openDeleteModal = (header, index) => {
    setImageToDelete({ header, index });
    setDeleteModalOpen(true);
  };

  const handleDelete = () => {
    const updatedImages = { ...images };
    delete updatedImages[imageToDelete.header][imageToDelete.index];
    setImages(updatedImages);
    setDeleteModalOpen(false);
  };

  const handleAddFields = (header) => {
    const updatedData = [
      ...formData[header],
      { headline: "", description: "" },
    ];
    setFormData({
      ...formData,
      [header]: updatedData,
    });
  };

  const handleDeleteFields = (header, index) => {
    if (index >= 5) {
      const updatedData = formData[header].filter((_, i) => i < 5 || i !== index);
      setFormData({
        ...formData,
        [header]: updatedData,
      });
    }
  };

  useEffect(() => {
    // Update formData when headers change, ensuring the initial 5 items.
    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData };
      ["Header1", "Header2", "Header3"].forEach((header) => {
        if (updatedFormData[header].length < 5) {
          updatedFormData[header] = [
            ...updatedFormData[header],
            ...Array(5 - updatedFormData[header].length).fill({ headline: "", description: "" }),
          ];
        }
      });
      return updatedFormData;
    });
  }, []);

  return (
    <div className="mx-8 w-full gap-2">
      <div className="text-sm font-medium flex gap-6 pb-2">
        <button
          onClick={() => setSelectedHeader("Header1")}
          className={
            selectedHeader === "Header1"
              ? "text-orange-500 border pb-1 border-orange-500 border-t-0 border-r-0 border-l-0" : '' 
          }
        >
          Key Features
        </button>
        <button
          onClick={() => setSelectedHeader("Header2")}
          className={
            selectedHeader === "Header2"
              ?"text-orange-500 border pb-1 border-orange-500 border-t-0 border-r-0 border-l-0" : '' 
          }
        >
         Key Components
        </button>
        <button
          onClick={() => setSelectedHeader("Header3")}
          className={
            selectedHeader === "Header3"
              ? "text-orange-500 border pb-1 border-orange-500 border-t-0 border-r-0 border-l-0" : '' 
          }
        >
          Key Functions
        </button>
      </div>
      <div className="flex flex-col text-white gap-2 pt-3">
      {selectedHeader === 'Header1' && <p>List the top 5 features below</p>}
  {selectedHeader === 'Header2' && <p>List  the top 5 components below</p>}
  {selectedHeader === 'Header3' && <p>List the top 5 functions below</p>}
        {formData[selectedHeader].map((data, index) => (
          <div key={index} className="mb-4 pt-3">
            <div className="flex  w-full  ">
              <div className="flex flex-col gap-3 w-full">
                <div className="flex justify-between items-center">
                <label htmlFor={`headline-${index}`} className="font-normal text-sm">
                  Headline {index + 1} [Maximum 5 Words*]
                </label>
                {index >= 5 && (
                <button
                  type="button"
                  onClick={() => handleDeleteFields(selectedHeader, index)}
                  className="text-white hover:opacity-75 bg-orange-500 rounded-full p-2"
                >
                  <X size={15} />
                </button>
              )}
                </div>
                <input
                  id={`headline-${index}`}
                  type="text"
                  value={data.headline}
                  onChange={(e) => {
                    if (e.target.value.split(" ").length <= 5) {
                      handleInputChange(selectedHeader, index, "headline", e.target.value);
                    }
                  }}
                  placeholder="Type here"
                  className="bg-neutral-700  text-sm  rounded-sm placeholder-neutral-500 pl-3  py-2"
                />
              </div>
              
            </div>
            <div className="flex flex-col gap-3 mt-3">
              <label htmlFor={`description-${index}`} className="font-normal text-sm">
                Description {index + 1} [Maximum 100 Words*]
              </label>
              <textarea
                id={`description-${index}`}
                value={data.description}
                onChange={(e) => {
                  if (e.target.value.split(" ").length <= 100) {
                    handleInputChange(selectedHeader, index, "description", e.target.value);
                  }
                }}
                placeholder="Type here"
                className="bg-neutral-700 rounded-sm placeholder-neutral-500 text-sm pl-3 py-1  h-40"
              />
            </div>
            <div className="pt-2">
              <span className="text-sm"> Upload Photos </span>
            <div className="border border-orange-500 border-dashed w-full justify-center items-center flex flex-col rounded-md gap-1 py-4 mt-3">
              {images[selectedHeader][index] ? (
                <div className="flex w-full gap-3 pl-4">
                  <img
                    src={images[selectedHeader][index].url}
                    alt="ImageUpload"
                    className="w-28 h-20"
                    onClick={() => openModal(images[selectedHeader][index].url)}
                  />
                  {isModalOpen && (
                    <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
                      <div className="bg-neutral-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full flex flex-col items-center p-10">
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="self-center pb-10"
                        />
                        <button
                          onClick={closeModal}
                          className="bg-orange-500 py-2 px-4 rounded text-white mt-4"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">
                      {images[selectedHeader][index].name}
                    </span>
                    <span className="text-xs text-neutral-300 pt-3">
                      {images[selectedHeader][index].size} MB
                    </span>
                  </div>
                  <div className="flex justify-end items-end w-full gap-3 pr-3">
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      onChange={(event) =>
                        handleImageUpload(selectedHeader, index, event.target.files)
                      }
                      style={{ display: "none" }}
                      id={`replace-${index}`}
                    />
                    <label
                      htmlFor={`replace-${index}`}
                      className="bg-orange-500 p-1 rounded px-4"
                    >
                      Replace
                    </label>
                    <button
                      onClick={() => openDeleteModal(selectedHeader, index)}
                      className="bg-orange-500 p-1 rounded px-4"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <img
                    src="/ImageUpload.svg"
                    alt="ImageUpload"
                    className="w-8"
                  />
                  <div className="text-sm font-normal">
                    <span className="gap-1 flex">
                      {" "}
                      Click on
                      <span className="text-orange-500 border border-orange-500 border-t-0 border-x-0 cursor-pointer">
                        <input
                          type="file"
                          accept=".jpg,.jpeg,.png"
                          onChange={(event) =>
                            handleImageUpload(selectedHeader, index, event.target.files)
                          }
                          style={{ display: "none" }}
                          id={`upload-${index}`}
                        />
                        <label htmlFor={`upload-${index}`} className="cursor-pointer">
                          Browse
                        </label>
                      </span>{" "}
                      to upload
                    </span>
                  </div>
                  <span className="text-xs text-neutral-400">
                    JPG, JPEG or PNG (Max size 50MB)
                  </span>
                </>
              )}
            </div>
          </div>
          </div>
        ))}
          <div className="flex  hover:cursor-pointer items-center justify-center gap-2 border border-dashed border-spacing-10 p-1 border-orange-500 rounded-sm  text-sm py-3"
                 onClick={() => handleAddFields(selectedHeader)}
            >
              <span className="bg-orange-500 text-neutral-800  rounded-sm "><Plus size={13}/></span>
              <span className="text-sm">Add more </span>
            </div>
        <div className='flex  justify-end '>
      <button className='bg-orange-500 mt-8 py-2 px-6 rounded'> Add Asset </button>
       </div> 
      </div>
      {deleteModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
          <div className="bg-neutral-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full flex flex-col items-center p-4 pt-24 pb-20 gap-2">
            <img src="/Delete.svg" alt="Delete" className="w-20" />
            <h2 className="text-lg font-medium text-white">
              Confirm Deletion
            </h2>
            <p className="text-sm text-white">
              Are you sure you want to delete this image?
            </p>
            <div className="mt-8 mb-4 gap-12 flex text-sm">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="bg-white text-orange-500 border border-orange-500 py-2 rounded px-4"
              >
                No, Cancel it
              </button>
              <button
                onClick={handleDelete}
                className="bg-orange-500 text-white py-2 rounded px-4"
              >
                Yes, Delete it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
