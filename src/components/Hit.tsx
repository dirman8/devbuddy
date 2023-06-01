import CodeCard from './CodeCard';
import React, { ReactNode, useEffect, useRef } from 'react';
// import Masonry from 'masonry-layout';
import { useHits } from 'react-instantsearch-hooks-web';

const Hit = ({props}) => {
    const language = 'javascript';
    const gridRef = useRef(null);
    const { hits, results, sendEvent } = useHits(props);

  useEffect(() => {
    if (typeof window!=='undefined' && gridRef.current) {
      async function masonryLayout() {
        try {
          const {Masonry} = await import('masonry-layout');
            new Masonry(gridRef.current, {
              itemSelector: '.grid-item',
              columnWidth: '.grid-sizer',
              percentPosition: true,
              horizontalOrder: true,
            });
        }catch (error) {
          // Handle any errors that occurred during the import
        }
      }
    }
  }, []);

    return (
      <div ref={gridRef} className="grid ">
        <div className='grid-sizer sm:w-6/12'></div>
          {hits.map((hit)=>(
            <div key={hit.objectID} className='grid-item sm:w-6/12 p-2 '>
              <h1 className='text-white text-center p-4 bg-indigo-950 rounded-t-md'>{hit.title}</h1>
              <CodeCard code={hit.content} language={language}/>
            </div>
          ))}
      </div>
    )
}

export default Hit