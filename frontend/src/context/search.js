import { useEffect,useState,useContext,createContext } from "react";

const SearchContext= createContext()

const SearchProvider= ({children}) =>{
    const [auth,setAuth]= useState({
        keywords: "",
        result: [],
        })
        
    return (
        <SearchContext.Provider value={[auth,setAuth]}>
            {children}
        </SearchContext.Provider>
    )
}

//custom hook
const useSearch= ()=> useContext(SearchContext)
export {useSearch,SearchProvider} 