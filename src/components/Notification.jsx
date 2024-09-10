import React, { useState, forwardRef } from 'react';
const Notification = forwardRef((props, ref) => {
  const [displayCount, setDisplayCount] = useState(3);

  const notifications = new Array(3).fill({
    id: 1,
    message: "New Community member Validated your Product Attributes from Catalog No. 540043.",
    time: "40 minutes ago"
  });

  const viewMore = () => {
    setDisplayCount(displayCount + 16);
  };
 const handleClear = () => {
       setDisplayCount(0)
 }
 if (!props.isOpen) {
  return null;
}

  return (
<div className="absolute right-0 top-full mt-2 w-80 h-80 rounded shadow-lg p-4 z-10 bg-neutral-950" ref={ref} >
  <div className="flex justify-between items-center mb-2">
    <h2 className="font-semibold text-lg">Notifications</h2>
    <button onClick={handleClear} className={`text-sm ${displayCount==0 ?"text-neutral-600":"text-orange-400" } font-medium mr-1`} style={{fontSize:"13px"}}>Clear all</button>
  </div>
  {displayCount === 0  ? (
   
   <div className='flex items-center justify-center h-64 text-orange-400 font-normal text-sm'>

      0 New Notifications
    </div>
  ) : (
    <div>
      {notifications.map((notification, index) => (
        <div key={index} className="border border-neutral-800 rounded p-3 mb-2 flex  ">
            <div className='h-full pr-2'>
                <div className="bg-white rounded-full h-4 w-4 mt-1"></div>

            </div>
            <div> 
          <p className='text-xs text-neutral-#00'>{notification.message}</p>
          <p className=" text-neutral-500" style={{fontSize:"10px"}}>{notification.time}</p>

            </div>
        </div>
      ))}
      <div className='flex justify-center border items-center rounded-sm border-neutral-800'>

      <button onClick={viewMore} className="text-xs text-orange-500 font-normal py-1">View 16 more notifications</button>
        </div>
    </div>
  )}
</div>
);
});

export default Notification;