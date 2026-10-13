import { AppHeader } from "./components/AppHeader"
import { BookForm } from "./components/BookForm"
import { ReadingList } from "./components/ReadingList"
import  useReadingList  from "./hooks/useReadingList"

function App() {
  const { books,
    formState,
    addBookAction,
    isPending,
    inputBookTitleRef } = useReadingList()

  return (
    <main className="app">
      <AppHeader />
      <BookForm
        addBookAction={addBookAction}
        isPending={isPending}
        inputBookTitleRef={inputBookTitleRef}
        message={formState.message}
      />

      <ReadingList 
        books={books}
      />
      
    </main>
  )
}

export default App
