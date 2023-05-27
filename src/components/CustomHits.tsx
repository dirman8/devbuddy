import CodeCard from './CodeCard';
import React, { useEffect, useRef } from 'react';
import { useHits } from 'react-instantsearch-hooks-web';
import Masonry from 'masonry-layout';

const Hitson = (props) => {
    const language = 'javascript';
    const gridRef = useRef(null);
    const {hits,results, sendEvent} = useHits(props);
    
    console.log(hits)

  useEffect(() => {
    if (typeof window !== 'undefined' && gridRef.current) {
      new Masonry(gridRef.current, {
        // Specify Masonry options here
        itemSelector: '.grid-item',
        columnWidth: 400,
        percentPosition: true,
        horizontalOrder: true
        // Other Masonry options...
      });
    }
  }, []);

  return (
    <div>
      <div ref={gridRef} className="grid">
        <div className='grid-sizer w-1/3'></div>
        <div key={hit.objectID} className='grid-item w-1/3'>
          <h1>{hit.title}</h1>
          <CodeCard code={hit.content} language={language}/>
        </div>
      </div>
      <h1>TEST</h1>
    </div>
  )}

export default Hitson