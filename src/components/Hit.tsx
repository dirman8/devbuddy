import CodeCard from './CodeCard';
import React, { ReactNode, useEffect, useRef } from 'react';
import { useInstantSearch } from 'react-instantsearch-hooks-web';

const Hit = () => {
    const language = 'javascript';
    const gridRef = useRef(null);
    const {results} = useInstantSearch();

    console.log("results from Hit  :", results)

  useEffect(() => {
    const masonryLayout = async () => {
      if (typeof window!=='undefined' && gridRef.current) {
        const { default: Masonry } = await import('masonry-layout');
        new Masonry(gridRef.current, {
            itemSelector: '.grid-item',
            columnWidth: '.grid-sizer',
            percentPosition: true,
            horizontalOrder: true,
          });
    }
  }
  masonryLayout();
  }, [results.hits]);

    return (
      <div ref={gridRef} className="grid">
        <div className='grid-sizer w-1/6'></div>
          {results.hits.map((hit)=>(
            <div key={hit.objectID} className='grid-item w-2/6 p-2'>
              <h1 className='text-white text-center p-4 bg-indigo-950 rounded-t-md'>{hit.title as ReactNode}</h1>
              <CodeCard code={hit.content} language={language}/>
            </div>
          ))}
      </div>

    )
}

export default Hit