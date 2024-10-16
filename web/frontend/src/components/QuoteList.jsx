import { useState, useEffect } from 'react';
import { fetchQuotes, likeQuote, createQuote, deleteQuote } from '../services/api';
import '../App.css';

const QuoteList = () => {
  const [quotes, setQuotes] = useState([]);
  const [error, setError] = useState(null);
  const [newQuote, setNewQuote] = useState({ quote: '', saidBy: '' });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getQuotes();
  }, []);

  const getQuotes = async () => {
    try {
      setIsLoading(true);
      const fetchedQuotes = await fetchQuotes();
      setQuotes(fetchedQuotes);
      setError(null);
    } catch (error) {
      console.error('Error fetching quotes:', error);
      setError('Failed to fetch quotes');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLike = async (id) => {
    try {
      const updatedQuote = await likeQuote(id);
      setQuotes((prevQuotes) =>
        prevQuotes.map((quote) => (quote.id === id ? updatedQuote : quote))
      );
    } catch (error) {
      console.error('Error liking quote:', error);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createQuote(newQuote);
      setNewQuote({ quote: '', saidBy: '' });
      getQuotes();
    } catch (error) {
      console.error('Error creating quote:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteQuote(id);
      getQuotes();
    } catch (error) {
      console.error('Error deleting quote:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-8">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Movie Quotes</h1>
        <form onSubmit={handleCreate} className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <input
              type="text"
              placeholder="Enter Quote"
              value={newQuote.quote}
              onChange={(e) => setNewQuote({ ...newQuote, quote: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Said By"
              value={newQuote.saidBy}
              onChange={(e) => setNewQuote({ ...newQuote, saidBy: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-200 shadow-md"
          >
            Add Quote
          </button>
        </form>

        {isLoading ? (
          <p className="text-center text-gray-500 text-lg">Loading quotes...</p>
        ) : error ? (
          <p className="text-center text-red-500 text-lg">{error}</p>
        ) : quotes.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No quotes available</p>
        ) : (
          <div className="space-y-4">
            {quotes.map((quote) => (
              <div
                key={quote.id}
                className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200"
              >
                <p className="text-xl font-semibold text-gray-800 mb-1">"{quote.quote}"</p>
                <p className="text-md text-gray-600 mb-3">- {quote.saidBy}</p>
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => handleLike(quote.id)}
                    className="flex items-center space-x-2 text-blue-500 hover:text-blue-600"
                  >
                    <span className="text-2xl">❤️</span> 
                    <span className="text-xl">{quote.likes || 0}</span>
                  </button>
                  <button
                    onClick={() => handleDelete(quote.id)}
                    className="text-red-500 hover:text-red-600 px-3 py-1 border border-red-500 rounded-lg hover:bg-red-50 transition duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuoteList;


// import { useState, useEffect } from 'react';
// import { fetchQuotes, likeQuote, createQuote, deleteQuote } from '../services/api';
// import '../App.css';

// const mockQuotes = [
//   { id: 1, quote: "May the Force be with you.", saidBy: "Star Wars", likes: 5 },
//   { id: 2, quote: "I'm going to make him an offer he can't refuse.", saidBy: "The Godfather", likes: 3 },
//   { id: 3, quote: "You talkin' to me?", saidBy: "Taxi Driver", likes: 2 },
// ];

// const QuoteList = () => {
//   const [quotes, setQuotes] = useState(mockQuotes);
//   const [error, setError] = useState(null);
//   const [newQuote, setNewQuote] = useState({ quote: '', saidBy: '' });

//   useEffect(() => {
//     // Uncomment this to fetch real data
//     // getQuotes();
//   }, []);

//   const getQuotes = async () => {
//     try {
//       const fetchedQuotes = await fetchQuotes();
//       setQuotes(fetchedQuotes);
//     } catch (error) {
//       console.error('Error fetching quotes:', error);
//       setError('Failed to fetch quotes');
//     }
//   };

//   const handleLike = async (id) => {
//     // For demo purposes, just increment the likes locally
//     setQuotes(quotes.map(q => q.id === id ? {...q, likes: (q.likes || 0) + 1} : q));
//   };

//   const handleCreate = async (e) => {
//     e.preventDefault();
//     // For demo purposes, just add the new quote locally
//     const newId = Math.max(...quotes.map(q => q.id)) + 1;
//     setQuotes([...quotes, {...newQuote, id: newId, likes: 0}]);
//     setNewQuote({ quote: '', saidBy: '' });
//   };

//   const handleDelete = async (id) => {
//     // For demo purposes, just remove the quote locally
//     setQuotes(quotes.filter(q => q.id !== id));
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-8">
//       <div className="bg-white shadow-md rounded-lg p-8 max-w-lg w-full">
//         <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Movie Quotes</h1>
//         <form onSubmit={handleCreate} className="mb-8">
//           <div className="flex flex-col sm:flex-row gap-4 mb-4">
//             <input
//               type="text"
//               placeholder="Enter Quote"
//               value={newQuote.quote}
//               onChange={(e) => setNewQuote({ ...newQuote, quote: e.target.value })}
//               className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//             <input
//               type="text"
//               placeholder="Said By"
//               value={newQuote.saidBy}
//               onChange={(e) => setNewQuote({ ...newQuote, saidBy: e.target.value })}
//               className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-200 shadow-md"
//           >
//             Add Quote
//           </button>
//         </form>

//         {quotes.length === 0 ? (
//           <p className="text-center text-gray-500 text-lg">No quotes available</p>
//         ) : (
//           <div className="space-y-4">
//             {quotes.map((quote) => (
//               <div
//                 key={quote.id}
//                 className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200"
//               >
//                 <p className="text-xl font-semibold text-gray-800 mb-1">"{quote.quote}"</p>
//                 <p className="text-md text-gray-600 mb-3">- {quote.saidBy}</p>
//                 <div className="flex justify-between items-center">
//                   <button
//                     onClick={() => handleLike(quote.id)}
//                     className="flex items-center space-x-2 text-blue-500 hover:text-blue-600"
//                   >
//                     <span className="text-2xl">❤️</span> 
//                     <span className="text-xl">{quote.likes || 0}</span>
//                   </button>
//                   <button
//                     onClick={() => handleDelete(quote.id)}
//                     className="text-red-500 hover:text-red-600 px-3 py-1 border border-red-500 rounded-lg hover:bg-red-50 transition duration-200"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default QuoteList;









