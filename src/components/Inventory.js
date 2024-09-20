import React, { useEffect, useState } from 'react';
import '../styles/Inventory.css';
import axios from 'axios';
import { useMediaQuery } from 'react-responsive';

function Inventory() {

    /**
     * Rename DB as inventory
     */

    const [ books, setBooks ] = useState("");
    const [ filter, setFilter ] = useState("Title");
    const [ keywords, setKeywords ] = useState("");
    const [ format, setFormat ] = useState("JSON");

    const isMobile = useMediaQuery({ query: '(max-width: 425px)' });

    useEffect(() => {
        getAllBooks();
    }, []);

    /**
     * Fetches all books from the database
     */
    function getAllBooks() {
        axios.get('http://localhost:5000/data')
        .then((response) => {
            console.log(response.data);
            setBooks(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    /**
     * Sets the value of the filter
     * @param {*} event Event object
     */
    function onFilterChange(event) {
        setFilter(event.target.value);
    }

    /**
     * Filters the books based on the keywords
     * @param {*} event Event object
     */
    function filterByKeywords(event) {
        setKeywords(event.target.value);

        axios.get('http://localhost:5000/filter', {
            params: {
                filter: filter,
                keywords: event.target.value
            }
        }).then((response) => {
            console.log(response.data);
            setBooks(response.data);
        });
    }

    /**
     * Sets the format of the download
     * @param {*} event Event object
     */
    function onFormatChange(event) {
        setFormat(event.target.value);
    }

    /**
     * Downloads the books in the selected format
     * @param {*} event Event object
     */
    function download(event) {
        event.preventDefault();
        axios.get('http://localhost:5000/download', {
            params: {
                format: format
            }
        }).then((response) => {
            if (format === 'csv') {
                const csvData = new Blob([response.data], { type: 'text/csv' });
                const csvURL = document.createElement('a');
                csvURL.href = URL.createObjectURL(csvData);

                csvURL.download = `Books.csv`;

                csvURL.click();

                URL.revokeObjectURL(csvURL.href);
            } else {
                const jsonData = new Blob([JSON.stringify(response.data)], { type: 'application/json' });
                const jsonURL = document.createElement('a');
                jsonURL.href = URL.createObjectURL(jsonData);

                jsonURL.download = `Books.json`;

                jsonURL.click();

                URL.revokeObjectURL(jsonURL.href);
            }
        });
    }

  return (
    <div>
        <input style={{
                backgroundColor: '#f1f1f1',
                backgroundPosition: '10px 10px',
                backgroundRepeat: 'no-repeat',
                width: '50%',
                fontSize: '16px',
                padding: '12px 20px 12px 20px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                marginBottom: '12px',
            }} type="text" name="keywords" placeholder="Filter By..." value={keywords} onChange={filterByKeywords}/>
            {
                isMobile
                ?
                <div>
                    <form>
                        <label style={{margin: "10px"}}>
                            Filter by:
                        </label>
                        <select value={filter} onChange={onFilterChange}>
                            <option value="Title">Title</option>
                            <option value="Author">Author</option>
                            <option value="Genre">Genre</option>
                        </select>
                    </form>
                    <form>
                        <label>
                            Download:
                        </label>
                        <select style={{margin: "10px"}} value={format} onChange={onFormatChange}>
                            <option value="JSON">JSON</option>
                            <option value="csv">CSV</option>
                        </select>
                        <input style={{margin: "10px"}} type="submit" name="download" value="Download" onClick={(e) => {download(e)}}/>
                    </form>
                </div>                
                : 
                <form>
                    <label style={{margin: "10px"}}>
                        Filter by:
                    </label>
                    <select value={filter} onChange={onFilterChange}>
                        <option value="Title">Title</option>
                        <option value="Author">Author</option>
                        <option value="Genre">Genre</option>
                    </select>
                    
                    <label className='download'>
                        Download:
                    </label>
                    <select style={{margin: "10px"}} value={format} onChange={onFormatChange}>
                        <option value="JSON">JSON</option>
                        <option value="csv">CSV</option>
                    </select>
                    <input style={{margin: "10px"}} type="submit" name="download" value="Download" onClick={(e) => {download(e)}}/>
                </form>
            }
        <br />
        {
            books.length === 0 ? <h2>No books found</h2> :
            <table className='table'>
                <thead>
                    <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Genre</th>
                    {isMobile ? <th>Date</th> : <th>Publication Date</th>}
                    <th>ISBN</th>
                    </tr>
                </thead>
                <tbody>
                    {books && books.map((book, index) => {
                        return (
                            <tr key={index}>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.genre}</td>
                                <td>{book.publication_date}</td>
                                <td>{book.isbn}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        }
    </div>
  );
}

export default Inventory;
