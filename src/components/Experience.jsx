import React, { useState} from 'react';
export default function Experience() {
  const [selectedHeader, setSelectedHeader] = useState('Header1');
  const Showcase =  ["Unboxing Reviews", "Engineering Reviews", "Experience Stories", "Performance Showcase"];
  const PostPurchase=["Servicing & Maintanence", "Trobuleshooting", "Repari & Replacement"]
  const Videos = ["Disassemble/Reassemble", "Components Explanation", "Customization", "Right to repair"];
  const [images, setImages] = useState({ Header1: {}, Header2: {}, Header3: {} });
  console.log(images);
  const [isModalOpen, setIsModalOpen] = useState(false);
const [previewImage, setPreviewImage] = useState('');
const [deleteModalOpen, setDeleteModalOpen] = useState(false);
const [imageToDelete, setImageToDelete] = useState(null);
const openDeleteModal = (header, name) => {
  setImageToDelete({ header, name });
  setDeleteModalOpen(true);  
};
const handleImageUpload = (header, name, files) => {
  if (files.length > 0) {
    const file = files[0];
    const fileType = file.type;
    const validFileTypes = ['video/mp4', 'video/x-matroska', 'video/x-msvideo'];
    const maxSizeMB = 600;
    const sizeMB = (file.size / (1024 * 1024)).toFixed(2); // size in MB

    if (!validFileTypes.includes(fileType)) {
      alert('Invalid file type. Only MP4, MKV, and AVI files are allowed.');
      return;
    }

    if (sizeMB > maxSizeMB) {
      alert('File size exceeds the 600MB limit.');
      return;
    }

    const url = URL.createObjectURL(file); // create a URL for the file

    // update the images state
    setImages(prevImages => ({
      ...prevImages,
      [header]: {
        ...prevImages[header],
        [name]: { url, name, size: sizeMB },
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
  
  const handleDelete = () => {
    const { header, name } = imageToDelete;
    setImages(prevImages => {
      const newImages = { ...prevImages };
      delete newImages[header][name];
      return newImages;
    });
    setDeleteModalOpen(false);
  };

  return (
    <div className='mx-8  w-full gap-2'>
      <div className='text-sm font-bold flex gap-6  ' >
        <button 
          onClick={() => setSelectedHeader('Header1')}
          className={selectedHeader === 'Header1' ? 'text-orange-500 border pb-1 border-orange-500 border-t-0 border-r-0 border-l-0' : ''}
        >
          Showcase
        </button>
        <button 
          onClick={() => setSelectedHeader('Header2')}
          className={selectedHeader === 'Header2' ? 'text-orange-500 border pb-1 border-orange-500 border-t-0 border-r-0 border-l-0' : ''}
        >
         Post Purchase
        </button>
        <button 
          onClick={() => setSelectedHeader('Header3')}
          className={selectedHeader === 'Header3' ? 'text-orange-500 border pb-1 border-orange-500 border-t-0 border-r-0 border-l-0' : ''}
        >
          Teardown
        </button>
      </div>
      {selectedHeader === 'Header1' &&
  <div className='pt-3'> 
    {Showcase.map((name, index) => (
      <div className='flex flex-col gap-2 ' key={index}>
        <span className='font-normal text-xs pt-2 '>{name}</span>
        <div className='border border-orange-500 border-dashed w-full justify-center items-center flex flex-col rounded-md gap-1 py-4 '>
          {images['Header1'][name] ? (
            <div className='flex w-full gap-3 pl-4'> 
        
        <video 
  src={images['Header1'][name].url} 
  alt='VideoUpload' 
  className='w-28 h-20' 
  onClick={() => openModal(images[selectedHeader][name].url)} 
  
/>
{isModalOpen && (
  <div className='fixed z-10 inset-0 overflow-y-auto flex items-center justify-center '>
    <div className='bg-neutral-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full flex flex-col items-center p-10'>
      <video src={previewImage} controls className='self-center pb-10' />
      <button onClick={closeModal} className='bg-orange-500 py-2 px-4 rounded text-white mt-4'>Close</button>
    </div>
  </div>
)}
  
              <div className='flex flex-col'>
              <span className='text-sm font-medium '>{images['Header1'][name].name}</span>
              <span className='text-xs text-neutral-300 pt-3'>{images['Header1'][name].size} MB</span>
              </div>
              <div className='flex justify-end items-end w-full gap-3 pr-3 '>
                <input  type="file" accept="*" onChange={(event) => handleImageUpload('Header1', name, event.target.files)} style={{ display: 'none' }} id={`replace-${index}`} />
                <label htmlFor={`replace-${index}` } className='bg-orange-500 p-1 rounded px-4'>Replace</label>
                <button onClick={() => openDeleteModal('Header1', name)} className="bg-orange-500 p-1 rounded px-4">Delete</button>
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
              <img src='/VideoUpload.svg' alt='VideoUpload' className='w-8' />
              <div className='text-sm font-normal'>
                <span className='gap-1 flex'>
                  <span className='text-orange-500  border border-orange-500 border-t-0 border-x-0 cursor-pointer'>
                    <input  type="file" accept="*" onChange={(event) => handleImageUpload('Header1', name, event.target.files)} style={{ display: 'none' }} id={`upload-${index}`} />
                    <label htmlFor={`upload-${index}`} className='cursor-pointer'>Browse</label>
                  </span> to upload your video here
                </span>
              </div>
              <span className='text-xs text-neutral-400'>MP4, MKV or AVI (Max size 600MB)</span>
            </>
          )}
        </div>
      </div>
    ))}
  </div>
}
{selectedHeader === 'Header2' &&
  <div className=' pt-3'> 
    {PostPurchase.map((name, index) => (
      <div className='flex flex-col gap-2 ' key={index}>
        <span className='font-normal text-xs pt-2 '>{name}</span>
        <div className='border border-orange-500 border-dashed w-full justify-center items-center flex flex-col rounded-md gap-1 py-4 '>
          {images['Header2'][name] ? (
            <div className='flex w-full gap-3 pl-4'>
            <video 
  src={images['Header2'][name].url} 
  alt='VideoUpload' 
  className='w-28 h-20' 
  onClick={() => openModal(images[selectedHeader][name].url)} 
/>
              {isModalOpen && (
  <div className='fixed z-10 inset-0 overflow-y-auto flex items-center justify-center '>
    <div className='bg-neutral-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full flex flex-col items-center p-10'>
      <video src={previewImage} controls className='self-center pb-10' />
      <button onClick={closeModal} className='bg-orange-500 py-2 px-4 rounded text-white mt-4'>Close</button>
    </div>
  </div>
)}
  
              <div className='flex flex-col'>
              <span  className='text-sm font-medium ' >{images['Header2'][name].name}</span>
              <span className='text-xs text-neutral-300 pt-3'>{images['Header2'][name].size} MB</span>
              </div>
              <div className='flex justify-end items-end w-full gap-3 pr-3'>
                <input  type="file" accept="*" onChange={(event) => handleImageUpload('Header2',name, event.target.files)} style={{ display: 'none' }} id={`replace-${index}`} />
                <label htmlFor={`replace-${index}`} className='bg-orange-500 p-1 rounded px-4'>Replace</label>
                <button onClick={() => openDeleteModal('Header2', name)} className='bg-orange-500 p-1 rounded px-4'>Delete</button>
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
<img src='/VideoUpload.svg' alt='VideoUpload' className='w-8' />
              <div className='text-sm font-normal'>
                <span className='gap-1 flex'>
                  <span className='text-orange-500  border border-orange-500 border-t-0 border-x-0 cursor-pointer'>
                    <input  type="file" accept="*" onChange={(event) => handleImageUpload('Header2', name, event.target.files)} style={{ display: 'none' }} id={`upload-${index}`} />
                    <label htmlFor={`upload-${index}`} className='cursor-pointer'>Browse</label>
                  </span> to upload your video here
                </span>
              </div>
              <span className='text-xs text-neutral-400'>MP4, MKV or AVI (Max size 600MB)</span>
            </>
          )}
        </div>
      </div>
    ))}
    </div>}
    {selectedHeader === 'Header3' &&
  <div className=' pt-3'> 
    {Videos.map((name, index) => (
      <div className='flex flex-col gap-2 ' key={index}>
        <span className='font-normal text-xs pt-2 '>{name}</span>
        <div className='border border-orange-500 border-dashed w-full justify-center items-center flex flex-col rounded-md gap-1 py-4 '>
          {images['Header3'][name] ? (
            <div className='flex w-full gap-3 pl-4'>
             <video 
  src={images['Header3'][name].url} 
  alt='VideoUpload' 
  className='w-28 h-20' 
  onClick={() => openModal(images[selectedHeader][name].url)} 
  
/>
{isModalOpen && (
  <div className='fixed z-10 inset-0 overflow-y-auto flex items-center justify-center '>
    <div className='bg-neutral-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full flex flex-col items-center p-10'>
      <video src={previewImage} controls className='self-center pb-10' />
      <button onClick={closeModal} className='bg-orange-500 py-2 px-4 rounded text-white mt-4'>Close</button>
    </div>
  </div>
)}
  
  
              <div className='flex flex-col'>
              <span className='text-sm font-medium '>{images['Header3'][name].name}</span>
              <span className='text-xs text-neutral-300 pt-3'>{images['Header3'][name].size} MB</span>
              </div>
              <div className='flex justify-end items-end w-full gap-3 pr-3'>
                <input  type="file" accept="*" onChange={(event) => handleImageUpload('Header3', name, event.target.files)} style={{ display: 'none' }} id={`replace-${index}`} />
                <label htmlFor={`replace-${index}`} className='bg-orange-500 p-1 rounded px-4'>Replace</label>
                <button onClick={() => openDeleteModal('Header3', name)} className='bg-orange-500 p-1 rounded px-4'>Delete</button>
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
              <img src='/VideoUpload.svg' alt='VideoUpload' className='w-8' />
              <div className='text-sm font-normal'>
                <span className='gap-1 flex'> 
                  <span className='text-orange-500  border border-orange-500 border-t-0 border-x-0 cursor-pointer'>
                    <input  type="file" accept="*" onChange={(event) => handleImageUpload('Header3', name, event.target.files)} style={{ display: 'none' }} id={`upload-${index}`} />
                    <label htmlFor={`upload-${index}`} className='cursor-pointer'>Browse</label>
                  </span> to upload your video here
                </span>
              </div>
              <span className='text-xs text-neutral-400'>MP4, MKV or AVI (Max size 600MB)</span>
            </>
          )}
        </div>
      </div>
    ))}
  </div>
}
<div className='flex  justify-end '>
      <button className='bg-orange-500 mt-8 py-2 px-6 rounded'> Add Asset </button>
       </div>  
    </div>
  );
}