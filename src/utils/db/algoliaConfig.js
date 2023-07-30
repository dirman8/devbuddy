import algoliasearch from "algoliasearch";

//This is using Search-only API key
// const algoliaClient = algoliasearch("76OUI9Z29U", "24edbfefcec4e973fedaf2dbfb5b2468");

//This is using Admin API key
const algoliaClient = algoliasearch("76OUI9Z29U", "8ed50fd65f9a50ab18622d4f94375709");

const algoliaIndex = algoliaClient.initIndex("member-search");

export default algoliaIndex;
