import React from "react"
import { useToast } from "@chakra-ui/react"

export const BookContext = React.createContext({
    books: [],
    search: '',
    loading: false,
    setSearch: (search: string) => {},
    searchBook: () => {}
})

export const useBook = () => React.useContext(
    BookContext
)

export const BookProvider = ({children}:{children:any}) => {
    const [books, setBooks] = React.useState<any>([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [search, setSearch ] = React.useState('');
    
    const searchBook = async() => {
        try{
            setLoading(true)
            fetch(`https://openlibrary.org/search.json?q=${search.replace(/\s/g, '+')}`,
            ).then((res) => res.json())
            .then((data) => {
                const {docs} = data
                setBooks(docs);
                setLoading(false);
            })
        }catch(error){
            setLoading(false);
        }
    }

    React.useEffect(() => {
        if(search!==''){
            setBooks([])
            searchBook()
        }
    },[search])

    return(
        <BookContext.Provider
            value={{
                books,
                search,
                loading,
                searchBook,
                setSearch
            }}>
                {children}
        </BookContext.Provider>
    )
}