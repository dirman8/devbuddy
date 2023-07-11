import { useState, useEffect } from 'react';
import {InstantSearch, Configure , SearchBox, Hits} from 'react-instantsearch-hooks-web';
import algoliasearch from "algoliasearch";
import Hit from "../components/Hit";
import { Search as FeatherSearchIcon } from 'react-feather';

const Search = ({authUser}) => {

    const [searchState, setSearchState] = useState({ query: ''})
    const algoliaClient = algoliasearch('76OUI9Z29U', '24edbfefcec4e973fedaf2dbfb5b2468')
    const algoliaIndex = algoliaClient.initIndex('member-search');

    const handleSearchStateChange = (newSearchState) => {
        setSearchState(newSearchState)
    };

  return (
    <div>
        <InstantSearch
        indexName={"member-search"}
        searchClient={algoliaClient}
        onStateChange={handleSearchStateChange}
        >
            <Configure filters={`User:${authUser.uid}`}/>
            <div className='flex mt-10'>
                <div className='w-15 bg-gray-100 p-4 hidden md:block' >
                    <SearchBox 
                        submitIconComponent={()=>(
                            <FeatherSearchIcon className='mt-3' size={20}/>
                    )}
                    />
                </div>
                <div className='container p-2'>
                      <Hit />
                </div>
            </div>
        </InstantSearch>
    </div>
  )
}

export default Search