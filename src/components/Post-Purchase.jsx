import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, ChevronLeft, X, Plus } from 'lucide-react';

export default function PostPurchase() {
  const [selectedItem, setSelectedItem] = useState('Service Availability');
  const [isLeftScrollable, setIsLeftScrollable] = useState(false);
  const [isRightScrollable, setIsRightScrollable] = useState(true);
  const scrollContainer = useRef(null);

  const items = ['Service Availability', 'Maintenance Requirements', 'Troubleshooting Information', 'Repair Services'];

  const checkScroll = () => {
    setIsLeftScrollable(scrollContainer.current.scrollLeft > 0);
    setIsRightScrollable(scrollContainer.current.scrollLeft < scrollContainer.current.scrollWidth - scrollContainer.current.clientWidth);
  };

  useEffect(() => {
    checkScroll();
  }, []);

  const scroll = (scrollOffset) => {
    scrollContainer.current.scrollTo({
      left: scrollContainer.current.scrollLeft + scrollOffset,
      behavior: 'smooth'
    });
    setTimeout(checkScroll, 200);
  };

  const defaultQueries = [
    'How do I update Sony A80L television\'s firmware to fix issues?',
    'How do I prevent screen burn-in on OLED and plasma in Sony A80L television?',
    'How do I factory reset Sony A80L television to its default settings?',
    'Should I consult Sony A80L television manufacturer before seeking third-party repair?',
    'How do I transfer settings and data from my old televisions to new Sony A80L television?'
  ];

  const [queries, setQueries] = useState(defaultQueries);
  const [answers, setAnswers] = useState(Array(defaultQueries.length).fill(''));
  const [newQuestion, setNewQuestion] = useState('');

  const handleAddQuery = () => {
    if (newQuestion.trim() !== '') {
      setQueries([...queries, newQuestion]);
      setAnswers([...answers, '']);
      setNewQuestion('');
    }
  };

  const handleRemoveQuery = (index) => {
    const updatedQueries = queries.filter((_, i) => i !== index);
    const updatedAnswers = answers.filter((_, i) => i !== index);
    setQueries(updatedQueries);
    setAnswers(updatedAnswers);
  };

  const handleAnswerChange = (index, value) => {
    const updatedAnswers = answers.map((answer, i) =>
      i === index ? value : answer
    );
    setAnswers(updatedAnswers);
  };

  const canAddNewQuestion = answers.every(answer => answer !== '');

  return (
    <div className="pl-12 text-white">
      <div className='flex mx-auto pt-1 pr-10'>
        <div
          className={`pl-2 ${isLeftScrollable ? 'cursor-pointer' : 'text-neutral-700 cursor-not-allowed'}`}
          onClick={() => scroll(-200)}
        >
          <ChevronLeft size={25} />
        </div>
        <div className='max-w-2xl overflow-x-auto scrollbar-hide' ref={scrollContainer} onScroll={checkScroll}>
          <ul className='pl-3 flex gap-7'>
            {
              items.map((item, index) => (
                <li
                  key={index}
                  className={`text-sm font-medium whitespace-nowrap ${selectedItem === item ? 'border-b-2 border-orange-400 text-orange-400' : ''} cursor-pointer`}
                  onClick={() => setSelectedItem(item)}
                >
                  {item}
                </li>
              ))
            }
          </ul>
        </div>
        <div
          className={`pl-2 ${isRightScrollable ? 'cursor-pointer' : 'text-neutral-700 cursor-not-allowed'}`}
          onClick={() => scroll(200)}
        >
          <ChevronRight size={25} />
        </div>
      </div>
      <div className='flex flex-col text-white gap-2 pt-6'>
        {queries.map((query, index) => (
          <div key={index} className="mb-4 pt-3">
            <div className="flex flex-col gap-4 w-full">
              <label className="font-normal text-sm">
                {query}
              </label>
              <input
                type="text"
                value={answers[index]}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
                placeholder="Type the answer here [Maximum 75 characters]"
                className="bg-neutral-700 text-sm rounded-md placeholder-neutral-500 pl-3 py-2 w-full"
              />
            </div>
            <div className=" flex justify-end items-end">
            {index >= 5 && (
              <button
                type="button"
                onClick={() => handleRemoveQuery(index)}
                className="text-white hover:opacity-75 bg-orange-500 rounded-full p-2 self-end mt-3"
              >
                <X size={15} />
              </button>
            )}
            </div>
          </div>
        ))}
        <div className="mb-2">
          <label className="font-normal text-sm mb-2 block">Add more questions</label>
          <input
            type="text"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="Type your question here"
            className="bg-neutral-700 text-sm rounded-md placeholder-neutral-500 pl-3 py-2 w-full mb-2"
          />
          <div
            className={`flex items-center justify-center gap-2 border border-dashed border-spacing-10 p-1 border-orange-500 rounded-md text-sm py-3 hover:cursor-pointer `}
            onClick={handleAddQuery }
          >
            <span className="bg-orange-500 text-neutral-800 rounded-md"><Plus size={13} /></span>
            <span className="text-sm">Add more queries</span>
          </div>
          <div className=" flex justify-end mt-2">
           <button
             className="bg-orange-500 px-5 py-2 text-white text-sm rounded-md"
            onClick={() => console.log("Add Asset clicked")}
           >
             Add Asset
           </button>
           </div>
        </div>
      </div>
    </div>
  );
}
