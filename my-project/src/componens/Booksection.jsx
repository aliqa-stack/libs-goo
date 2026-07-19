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
      <div className='w-32 h-32 flex items-center'>
        <div className='py-6 px-3 bg-[#FFA500]'>
          <h1 className='text-2xl font-bold'>Gallery</h1>
        </div>
      </div>
      
      <div className='flex items-center justify-center  my-6'>
        <form onSubmit={createBook} className='md:flex '>
          <label htmlFor="books" className='text-sm scale-0 focus:scale-1 focus:top-[-10px]'>Insert</label>
          <input id='books' type="text" className="relative bg-gray-100 ring-0 outline-none border border-neutral-500 text-neutral-900 placeholder-violet-700 text-sm rounded-lg focus:ring-violet-500  focus:border-violet-500 block w-64 p-2.5 checked:bg-emerald-500" 
          value={libs} onChange={(e) => setInsertBook(e.target.value)} />
          <input id='books' type="text" className="relative bg-gray-100 ring-0 outline-none border border-neutral-500 text-neutral-900 placeholder-violet-700 text-sm rounded-lg focus:ring-violet-500  focus:border-violet-500 block w-64 p-2.5 checked:bg-emerald-500" 

          value={auth} 
          onChange={(e) => setAuthor(e.target.value)} />
          <div className='flex justify-between'>

          <button type='submit' disabled={isInvalid} className=''>submit</button>
          </div>
        </form>



      </div>
            <div className="grid lg:grid-cols-4 gap-5 rounded-2xl my-8 p-5 shadow-inner">
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
