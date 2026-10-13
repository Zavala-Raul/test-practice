import { useActionState, useRef, useState } from 'react'
import { type Book } from '../types/Book'
const initialState: Book[] = [
    {id: '1', title: 'Project Hail Mary', author: 'Andy Weir', pages: 496},
    {id: '2', title: 'Circe', author: 'Madeline Miller', pages: 393},
    {id: '3', title: 'The Midnight Library', author: 'Matt Haig', pages: 304},
]    
type FormState = {
    message: string,
}

const useReadingList = () => {
  const [books, setBooks] = useState(initialState)

  const inputBookTitleRef = useRef<HTMLInputElement | null>(null)
  const bookAction = async (_prevState: FormState, formData: FormData): Promise<FormState> => {
  await new Promise((resolve) => setTimeout(resolve, 3000))  
  const title = String(formData.get('title') ?? '').trim()
  const author = String(formData.get('author') ?? '').trim()
  const pages = Number(formData.get('pages'))

    if (!title || !author || !Number.isInteger(pages) || pages <= 0) {
        inputBookTitleRef.current?.focus()

    return {
      message: 'Indica título, autor y un número entero de páginas mayor que 0.',
    }
    }
  const newBook: Book = {
    id: crypto.randomUUID(),
    title,
    author,
    pages,
  }
   setBooks(currentBooks => [...currentBooks, newBook])
   inputBookTitleRef.current?.focus()
  return {
    message: 'Libro agregado correctamente.',
  }
}

  const [formState, addBookAction,isPending] = useActionState(bookAction, { message: '' })

  return {
    books,
    formState,
    addBookAction,
    isPending,
    inputBookTitleRef

  }
}

export default useReadingList
