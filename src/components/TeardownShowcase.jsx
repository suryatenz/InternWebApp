import React, { useState } from 'react';
export default function TeardownShowcase() {
  const [images, setImages] = useState({
    Header1: {},
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
const [previewImage, setPreviewImage] = useState('');
const [deleteModalOpen, setDeleteModalOpen] = useState(false);
const [imageToDelete, setImageToDelete] = useState(null);
const openDeleteModal = (header, name) => {
  setImageToDelete({ header, name });
  setDeleteModalOpen(true);
};

const handleDelete = () => {
  const { header, name } = imageToDelete;
  setImages(prevImages => {
    const newImages = { ...prevImages };
    delete newImages[header][name];
    return newImages;
  });
  setDeleteModalOpen(false);
};
  const handleImageUpload = (header, name, files) => {
    if (files.length > 0) {
      const file = files[0];
      const url = URL.createObjectURL(file); // create a URL for the file

      // update the images state
      setImages(prevImages => ({
        ...prevImages,
        [header]: {
          ...prevImages[header],
          [name]: {
            url,
            name: file.name,
            size: (file.size / (1024 * 1024)).toFixed(2), // size in MB
          },
        },
      }));
    }
  };
  const openModal = (image) => {
    setPreviewImage(image);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className='mx-8 pb-1 w-full gap-2'> 
      <span className=' text-sm font-medium'>Closeup Shots </span>
      <div className='pt-3'>
      {[...Array(5)].map((_, index) => (
        <div className='flex flex-col gap-2 ' key={index}>
          <span className='font-normal text-xs pt-2 '>Closeup Shot {index + 1}</span>
          <div className='border border-orange-500 border-dashed w-full justify-center items-center flex flex-col rounded-md gap-1 py-4 '>
            {images['Header1'][`Closeup Shot ${index + 1}`] ? (
              <div className='flex w-full gap-3 pl-4'>
                <img src={images['Header1'][`Closeup Shot ${index + 1}`].url} alt='ImageUpload' className='w-28 h-20 '  onClick={() => openModal(images['Header1'][`Closeup Shot ${index + 1}`].url)}/>
                {isModalOpen && (
  <div className='fixed z-10 inset-0 overflow-y-auto flex items-center justify-center '>
    <div className='bg-neutral-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full flex flex-col items-center p-10'>
      <img src={previewImage} alt='Preview' className='self-center pb-10' />
      <button onClick={closeModal} className='bg-orange-500 py-2 px-4 rounded text-white mt-4'>Close</button>
    </div>
  </div>
)}
                <div className='flex flex-col'>
                  <span className='text-sm font-medium'>{images['Header1'][`Closeup Shot ${index + 1}`].name}</span>
                  <span className='text-xs text-neutral-300 pt-3'>{images['Header1'][`Closeup Shot ${index + 1}`].size} MB</span>
                </div>
                <div className='flex justify-end items-end w-full gap-3 pr-3'>
                  <input  type="file" accept=".jpg,.jpeg,.png" onChange={(event) => handleImageUpload('Header1', `Closeup Shot ${index + 1}`, event.target.files)} style={{ display: 'none' }} id={`replace-${index}`} />
                  <label htmlFor={`replace-${index}`} className='bg-orange-500 p-1 rounded px-4'>Replace</label>
                  <button onClick={() => openDeleteModal('Header1', `Closeup Shot ${index + 1}`)} className='bg-orange-500 p-1 rounded px-4'>Delete</button>
                  {deleteModalOpen && (
    <div className='fixed z-10 inset-0 overflow-y-auto flex items-center justify-center'>
      <div className='bg-neutral-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full flex flex-col items-center p-4 pt-24 pb-20 gap-2'>
          <img src='/Delete.svg' alt='Delete' className='w-20 ' />
        <h2 className='text-lg font-medium text-white'>Confirm Deletion</h2>
        <p className='text-sm text-white'>Are you sure in deletion of {imageToDelete.name}?</p>
        <div className='mt-8 mb-4 gap-12 flex text-sm'>
          <button onClick={() => setDeleteModalOpen(false)} className='bg-white text-orange-500 border border-orange-500 py-2 rounded px-4 '>No,Cancel it</button>
          <button onClick={handleDelete} className='bg-orange-500 text-white py-2 rounded px-4'>Yes, Delete it</button>
        </div>
      </div>
    </div>
  )}
                </div>
              </div>
              
            ) : (
              <>
                <img src='/ImageUpload.svg' alt='ImageUpload' className='w-8' />
                <div className='text-sm font-normal'>
                  <span className='gap-1 flex'>Click on
                    <span className='text-orange-500  border border-orange-500 border-t-0 border-x-0 cursor-pointer'>
                      <input  type="file" accept=".jpg,.jpeg,.png" onChange={(event) => handleImageUpload('Header1', `Closeup Shot ${index + 1}`, event.target.files)} style={{ display: 'none' }} id={`upload-${index}`} />
                      <label htmlFor={`upload-${index}`} className='cursor-pointer'>Browse</label>
                    </span> to upload
                  </span>
                </div>
                <span className='text-xs text-neutral-400'>JPG, JPEG or PNG (Max size 50MB)</span>
              </>
            )}
          </div>
        </div>
      ))}
      <div className='flex  justify-end '>
      <button className='bg-orange-500 mt-8 py-2 px-6 rounded'> Add Asset </button>
       </div>      
       </div>
    </div>
  )

}