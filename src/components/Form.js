import React, { useState } from 'react';
import axios from 'axios';

/**
 * A form component that allows verifies a book entry and submits it to the database
 * @returns A form component that allows users to enter a new book entry
 */
function Form() {

    const [ bookDetails, setBookDetails ] = useState({
        title: '',
        author: '',
        genre: '',
        date: '',
        isbn: ''
    });

    /**
     * Handles changes to the book details form
     * @param {*} e Event object
     */
    function handleBookChange(e) {
        const { name, value } = e.target;
        setBookDetails({
            ...bookDetails,
            [name]: value
        })
    };

    /**
     * Checks if the ISBN is valid
     * @param {*} isbn The ISBN to check
     * @returns true if the ISBN is valid, false otherwise
     */
    function checkISBN(isbn) {
        let numbers = isbn.split("-");
        if (numbers.length !== 5 || numbers[0].length !== 3 || numbers[1].length !== 2 || numbers[2].length !== 5 || numbers[3].length !== 2 || numbers[4].length !== 1) {
            return false;
        }

        for (let i = 0; i < numbers.length; i++) {
            if (isNaN(numbers[i])) {
                return false;
            }
        }

        return true;
    }

    /**
     * Checks if the date is valid
     * @param {*} date 
     * @returns 
     */
    function checkDate(date) {
        if (date.length !== 4 || isNaN(date) || parseInt(date) < 1800) {
            return false;
        }

        return true
    }
    
    /**
     * Submits the book entry to the database
     * @param {*} event Event object
     */
    function handleSubmit(event) {
        event.preventDefault();
        const validISBN = checkISBN(bookDetails.isbn);
        const validDate = checkDate(bookDetails.date);

        const { title, author, genre, date, isbn} = bookDetails;

        if (!title || !author || !genre || !date || !isbn) {
            alert("Please fill out all fields");
        } else if (!validISBN && !validDate) {
            alert("Invalid ISBN and Date");
        } else if (!validISBN) {
            alert("Invalid ISBN");
        } else if (!validDate) {
            alert("Invalid Date");
        } else {
            console.log(title, author, genre, date, isbn);
            axios.post('http://localhost:5000/add-book', {
                bookDetails
            }).then((response) => {
                console.log(response);
            });
            setBookDetails({
                title: '',
                author: '',
                genre: '',
                date: '',
                isbn: ''
            });
            alert("Book entry submitted");
        }
    };

  return (
    <div>
        <p>Enter a new book entry:</p>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '5px'}}>
            <input type="text" name="title" placeholder="Book Title" value={bookDetails.title} onChange={handleBookChange} />
            <input type="text" name="author" placeholder="Author" value={bookDetails.author} onChange={handleBookChange} />
            <input type="text" name="genre" placeholder="Genre" value={bookDetails.genre} onChange={handleBookChange} />
            <input type="text" name="date" placeholder="Publication Date (YYYY)" value={bookDetails.date} onChange={handleBookChange} />
            <input type="text" name="isbn" placeholder="ISBN (###-##-#####-##-#)" value={bookDetails.isbn} onChange={handleBookChange} />
            <input style={{ width: "50%", margin: "10px auto" }} type="submit" value="Submit" onClick={(e) => {handleSubmit(e)}} />
        </form>
    </div>
  );
}

export default Form;
