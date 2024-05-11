import React from 'react'
import Searches from "../components/Route/Searches";
import  {SearchHeader}  from "../components/Layout/Header.jsx"
import { Footer2 } from '../components/Layout/Footer.jsx'

const SearchResult = () => {
  return (
    <div>
        <SearchHeader/>
         <Searches />
         <Footer2/>
    </div>
  )
}

export default SearchResult