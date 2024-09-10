import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ProductModelSidebar() {
  const tabs = ['Gallery', 'Specifications', 'KeyNotes', 'CompanyProfile', 'Performance', 'Experience', 'Review', 'Safety', 'Queries','Warranty','Seller','Accessories','Services'];
const galleryTabs = ['OutsideShowcase', 'TeardownShowcase'];
const  queriesTabs=['Pre-Purchase','Post-Purchase']
  const [activeTab, setActiveTab] = useState('Specifications');
  const [activeGalleryTab, setActiveGalleryTab] = useState('OutsideShowcase');
  const [activeQueriesTab,setActiveQueriesTab] =useState('Pre-Purchase')
  const [isGalleryDropdownVisible, setGalleryDropdownVisible] = useState(false);
  const [isQueriesDropdownVisible, setQueriesDropdownVisible] = useState(false);
  useEffect(() => {
    setActiveTab('Specifications');
  }, []);
  return (
    <div className=" ">
      <aside className='flex flex-col border-2 border-neutral-800 w-72 rounded-md border-b-0 font-medium text-white '>
        <span className='pb-4 pt-3 pl-4 text-base'>Product Model Name </span>
        <div className='flex flex-col w-full gap-5 '>
          {tabs.map(tab => (
            <div key={tab} className={`w-full text-sm p-2 pl-5 ${activeTab === tab && tab !== 'Gallery'  && tab !=='Queries'? 'bg-neutral-800 text-orange-500' : ''}`}>
              <Link
                to={tab === 'Gallery' ? "OutsideShowcase" : tab=== 'Queries' ? 'Pre-Purchase': tab}
                onClick={() => {
                  setActiveTab(tab);
                  if (tab === 'Gallery') {
                    setGalleryDropdownVisible(!isGalleryDropdownVisible);
                    setQueriesDropdownVisible(false)
                  } 
                  else if (tab ==='Queries'){
                    setQueriesDropdownVisible(!isQueriesDropdownVisible);
                    setGalleryDropdownVisible(false);
                  } else {
                    setGalleryDropdownVisible(false);
                    setQueriesDropdownVisible(false)
                  }
                }}
                className='hover:text-orange-500'
              >
                {tab ==='KeyNotes' ? 'Key Notes' : tab === 'CompanyProfile' ? 'Company Profile' : tab}
              </Link>
              {tab === 'Queries' && isQueriesDropdownVisible && (
                <div className='pl-3 pr-5 pt-4 flex flex-col gap-2'>
                  {queriesTabs.map(queriesTab => (
                    <Link
                      key={queriesTab}
                      to={`${queriesTab}`}
                      onClick={() => setActiveQueriesTab(queriesTab)}
                      className={`w-full text-sm p-2 pl-4 ${activeQueriesTab ===queriesTab ? 'bg-neutral-800 text-orange-500' : ''} hover:text-orange-500`}
                    >
                        {queriesTab}
                    </Link>
                  ))}
                </div>
              )}
              {tab === 'Gallery' && isGalleryDropdownVisible && (
                <div className='pl-3 pr-5 pt-4 flex flex-col gap-2'>
                  {galleryTabs.map(galleryTab => (
                    <Link
                      key={galleryTab}
                      to={`${galleryTab}`}
                      onClick={() => setActiveGalleryTab(galleryTab)}
                      className={`w-full text-sm p-2 pl-4 ${activeGalleryTab === galleryTab ? 'bg-neutral-800 text-orange-500' : ''} hover:text-orange-500`}
                    >
                      { galleryTab==='OutsideShowcase' ? 'Outside Showcase' : 'Teardown Showcase'}
                    </Link>
                  ))}
                  </div>
              )}
                  
            </div>
))}
 </div>
      </aside>
    </div>
  );
}