import { useState } from 'react';
import {InstantSearch, SearchBox, Hits} from 'react-instantsearch-hooks-web';
import algoliasearch from "algoliasearch";
import Hit from "../components/Hit";

const Search = () => {
    const [searchState, setSearchState] = useState({ query: ''})
    const algoliaClient = algoliasearch('76OUI9Z29U', '24edbfefcec4e973fedaf2dbfb5b2468')
    const algoliaIndex = algoliaClient.initIndex('member-search');

    const handleSearchStateChange = (newSearchState) => {
        setSearchState(newSearchState)
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        algoliaIndex.search(searchState.query).then(({hits}) => {
            console.log(hits)
        });
    };

  return (
    <div>
        <InstantSearch
        indexName="member-search"
        searchClient={algoliaClient}
        onStateChange={handleSearchStateChange}
        >
            <div className='flex mt-10'>
                <div className='w-15 bg-gray-100 p-4 hidden md:block' >
                    <form onSubmit={handleSearchSubmit}>
                        <SearchBox />
                        <button type="submit">Search</button>
                    </form>
                </div>
                <div className='container p-2 bg-white'>
                    <Hit />
                </div>
            </div>
        </InstantSearch>
    </div>
  )
}

export default Search