import React from "react";
import { Input, CircularProgress, Box, useToast, Button, Text, TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Td, Tfoot, Heading } from "@chakra-ui/react"
import { useBook } from "@/context"
import { useFormik } from "formik";


export default function Home() {
  const {
    books,
    loading,
    search,
    setSearch,
  } = useBook();
  const toast = useToast();
  const [selectedBook, setSelectedBook] = React.useState<any | null>(null);

  const formik = useFormik({
    initialValues: {
      search: '',
    },
    //@ts-ignore
    onSubmit: (values) => {
      try{
        if(values.search===''){
          toast({
            title: `search failed!`,
            status: 'error',
            isClosable: true,
          })
          return null
        }
        setSearch(values.search)
      }catch(error){
        toast({
          title: `search failed!`,
          status: 'error',
          isClosable: true,
        })
      }
    },
  })

  return (
    <Box
    width='100vw'
    display={'flex'}
    flexDir='column'
    alignItems= 'center'
    justifyContent={'center'}
      padding={10}>
      <Box
        width='80vh'
        display={'flex'}
        flexDirection={'row'}
        padding={10}>
          <form 
            style={{
              width: '100%',
              display: 'flex',
              flexDirection:'row',
              padding: 10,
            }}
            onSubmit={formik.handleSubmit}>
          <Input 
            name="search"
            id='search'
            type='text'
            placeholder="search"
            onChange={formik.handleChange} />
            <Button
              background={'green'}
              type='submit'
              >
              <Text
                color='white'>Search</Text>
            </Button>
          </form>
      </Box>
      {
        books && books.length>0?
        <TableContainer
          height={'50vh'}
          overflowY='scroll'
          maxWidth='100%'>
          <Table variant='simple'
          size='sm'>
            <TableCaption>Book Results for: {search}</TableCaption>
              <Thead>
                <Tr>
                  <Th>Title</Th>
                  <Th>Author Name </Th>
                  <Th>Publication Year</Th>
                </Tr>
              </Thead>
              <Tbody>
              {
                books.map((book) => {
                  const {key, title, author_name, publish_year} = book;
                  console.log(book)
                  return(
                    <Tr
                      onClick={() => {
                        let author = null
                        let year = null

                        if(author_name) author = author_name[0]
                        if(publish_year) year = publish_year[0]

                        setSelectedBook({
                          title,
                          author,
                          year
                        })
                      }}
                      cursor={'pointer'}
                      key={key}>
                      <Td>{title}</Td>
                      {author_name? <Td>{author_name[0]}</Td>: null}
                      {publish_year? <Td >{publish_year[0]}</Td>: null}
                    </Tr>
                  )                 
                })
              }
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th>Title</Th>
                  <Th>Author Name </Th>
                  <Th>Publication Year</Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
          :
        loading ?
          <Box
            height={'50vh'}
            width='100%'
            display={'flex'}
            alignItems= 'center'
            justifyContent={'center'}
            flexDir='column'
            background={'gray.100'}
            borderRadius={10}>
              <CircularProgress isIndeterminate color='green.300' />
              <Text>Loading</Text>
          </Box>
        :
        <Box
            height={'50vh'}
            width='100%'
            display={'flex'}
            alignItems= 'center'
            justifyContent={'center'}
            background={'gray.100'}
            borderRadius={10}
            >
          <Text>No Books Found</Text>
        </Box>
      }
      { 
        selectedBook? 
        <Box
          padding={10}
          width='100%'
          >
          <Box>
            <Heading>Title: {selectedBook.title}</Heading>
            <Heading>Author: {selectedBook.author}</Heading>
            <Heading>Publish Year: {selectedBook.year}</Heading>
          </Box>
        </Box>
        :
        null 
      }
    </Box>
  )
}
