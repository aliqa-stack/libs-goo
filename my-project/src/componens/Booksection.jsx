import React from 'react'
import {useState, useEffect} from 'react'

const Booksection = () => {
  const [books, setBooks] = useState([]);

  const [libs, setInsertBook] = useState("");
  const [auth, setAuthor] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const url = 'http://localhost:3000/book';
      const response = await fetch(url, {
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('server error');
      }

      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('error fetching books', error);
    }
  };

  //soon fixed

  
  const isInvalid = !libs.trim() || Number(libs) === 0 && !auth.trim() || Number(auth) === 0;
  const createBook = async (event) => {
    event.preventDefault();

    try {
      const url = 'http://localhost:3000/book';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({title : libs, author : auth}),
      });

      if (!response.ok) {
        throw new Error('server error');
      }

      const data = await response.json();
      setBooks((prevBooks) => [...prevBooks, data]);
    } catch (error) {
      console.error('cant catch api', error);
    }
  };

  

  

  return (
    <div className='bg-gradient-to-br from-blue-400 to-indigo-600 '>
      <div className='w-full flex justify-center py-6'>
        <div className='py-6 px-3 bg-[#FFA500] rounded-md'>
          <h1 className='text-2xl font-bold text-center'>Gallery</h1>
        </div>
      </div>
      
      <div className='flex items-center justify-center my-6'>
        <form onSubmit={createBook} className='flex flex-col gap-4 items-center'>
          <input id='books' type="text" className="w-64 bg-gray-100 ring-0 outline-none border border-neutral-500 text-neutral-900 placeholder-violet-700 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 p-2.5" 
            value={libs} onChange={(e) => setInsertBook(e.target.value)} 
            placeholder='Book title' />
          <input id='author' type="text" className="w-64 bg-gray-100 ring-0 outline-none border border-neutral-500 text-neutral-900 placeholder-violet-700 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 p-2.5" 
            value={auth} 
            onChange={(e) => setAuthor(e.target.value)} 
            placeholder='Author name' />
          <button type='submit' disabled={isInvalid} className='w-full py-3 px-3 bg-[#FFA500] rounded-md shadow-[5px_8px_0px_0px_rgba(0,0,0,1)] border border-solid border-black border-4  bg-disabled:opacity-50 disabled:cursor-not-allowed'>submit</button>
        </form>



      </div>
            <div className="grid lg:grid-cols-4 gap-5 rounded-2xl  p-5 shadow-inner">
  {books.map((book) => (
    <div
      key={book.id || book._id}
      className="row-span-4 h-64 rounded-xl bg-[#FFA500] shadow-md p-4  border border-blue-100 hover:border-blue-300 hover:shadow-[5px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
    >
      <div className='relative h-10 flex items-center justify-center rounded-lg bg-blue-50 border border-blue-200 py-12 px-8 hover:px-10 transition duration-150'>
        <span className='text-blue-700 font-semibold text-sm tracking-wide'>{book.title}</span>
      </div>
      <div className='p-6 text-center'>
        <span className='inline-flex items-center justify-center border border-blue-300 text-blue-600 bg-blue-50/50 text-xs font-medium px-2.5 py-1 rounded-full'>
          {book.author}
        </span>
        <h3 className='mt-3 mb-6 text-2xl font-semibold text-slate-800'>{book.title}</h3>
      </div>
    </div>
  ))}
  </div>
 </div>
  )
}


export default Booksection;
