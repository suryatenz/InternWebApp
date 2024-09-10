import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import Demo from './Demo';

export default function Specifications() {
  const [selectedItem, setSelectedItem] = useState("External Physical Information");
  const [isLeftScrollable, setIsLeftScrollable] = useState(false);
  const [isRightScrollable, setIsRightScrollable] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState({});
  const scrollContainer = useRef(null);
  const nav = useNavigate();

  const items = Demo.map((demo) => demo.name);

  const checkScroll = () => {
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.current;
    setIsLeftScrollable(scrollLeft > 0);
    setIsRightScrollable(scrollLeft < scrollWidth - clientWidth - 1);
  };

  useEffect(() => {
    checkScroll();
  }, []);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const scroll = (scrollOffset) => {
    scrollContainer.current.scrollTo({
      left: scrollContainer.current.scrollLeft + scrollOffset,
      behavior: 'smooth',
    });
    setTimeout(checkScroll, 200);
  };

  const handleOptionClick = (attributeName, option) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [attributeName]: option,
    }));
  };
  
  const selectedItemData = Demo.find((demo) => demo.name === selectedItem);

  return (
    <div className='flex flex-col mx-auto pt-4 pr-14'>
  <div className='flex flex-row'>
    <div
      className={`pl-2 ${isLeftScrollable ? 'cursor-pointer' : 'text-neutral-700 cursor-not-allowed'}`}
      onClick={() => scroll(-200)}
    >
      <ChevronLeft size={25} />
    </div>
    <div className='max-w-3xl overflow-x-auto scrollbar-hide' ref={scrollContainer} onScroll={checkScroll}>
      <ul className='pl-3 flex gap-7'>
        {items.map((item, index) => (
          <li
            key={index}
            className={`text-sm font-medium whitespace-nowrap pb-1 ${selectedItem === item ? 'border-b-2 border-orange-400 text-orange-400' : ''} cursor-pointer`}
            onClick={() => handleItemClick(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
    <div
      className={`pl-2 ${isRightScrollable ? 'cursor-pointer' : 'text-neutral-700 cursor-not-allowed'}`}
      onClick={() => scroll(200)}
    >
      <ChevronRight size={25} />
    </div>
  </div>
  <div className="mt-4">
    {selectedItemData ? (
      <div className='w-full text-sm px-5'>
        <ul className='w-full'>
          {selectedItemData.attributes.map((attribute, index) => (
            <li key={index} className='mt-2'>
              <div className='flex flex-col items-center'>
                <div className='w-full flex items-center'>
                  <h3 className=''>{attribute.name}:</h3>
                  {attribute.values.map((value, idx) => (
                    <div key={idx} className='flex items-center w-full'>
                      {value.type === 'text' && (
                        <div className='flex items-center w-full'>
                          <input
                            type="text"
                            value={value.value}
                            disabled={value.disabled}
                            className='px-4 py-2 text-[#6F6F6F] bg-[#353535] rounded-md w-full'
                          />
                          {value.unit && (
                            <select disabled={value.unit.disabled} className='ml-2 px-3 py-2 text-white bg-neutral-800 border border-solid border-white rounded-md'>
                              {value.unit.option.map((option, optIdx) => (
                                <option key={optIdx} value={option} selected={option === value.unit.selected}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          )}
                        </div>
                      )}
                      {value.type === 'radio' && (
                        <div className='flex items-center'>
                          {value.options.map((option, optIdx) => (
                            <div
                              key={optIdx}
                              className={`px-4 py-2 cursor-pointer text-white ${selectedOptions[attribute.name] === option ? 'bg-orange-500' : 'bg-neutral-800'}`}
                              style={{
                                borderRadius: '4px',
                                border:'1px solid orange',
                                marginRight: '4px'
                              }}
                              onClick={() => handleOptionClick(attribute.name, option)}
                            >
                              {option}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    ) : (
      <p className='text-white'>Please select an item to view its specifications.</p>
    )}
  </div>
</div>
  );
}
