import React, { useState } from 'react'
import { Button, Checkbox, Label, Select, TextInput, Textarea } from 'flowbite-react';

const BASE_URL = "http://localhost:4000"

export const UploadBook = () => {

    const bookCategories = [
        "Fiction",
        "Non-Fiction",
        "Mistery",
        "Programming",
        "Science Fiction",
        "Fantasy",
        "Horror",
        "Autobiography",
        "History",
        "Self-help",
        "Memoir",
        "Bussiness",
        "Children Books",
        "Travel",
        "Religion",
        "Art and Design"
    ]

    const [selectedBookCategory, setSelectedBookCategory] = useState(bookCategories[0])
    
    const handleChangeSelectedValue = (event) => {
        setSelectedBookCategory(event.target.value)
    }

    // handle book submission
    const hanldeBookSubmit = (event) => {
        event.preventDefault();
        const form = event.target;

        const bookTitle = form.bookTitle.value;
        const authorName = form.authorName.value;
        const imageUrl = form.imageUrl.value;
        const category = form.category.value;
        const bookDescriptions = form.bookDescriptions.value;
        const bookPdfUrl = form.bookPdfUrl.value;

        const bookObj = {
            bookTitle, authorName, imageUrl, category, bookDescriptions, bookPdfUrl
        }

        // console.log(bookObj)

        fetch(BASE_URL+"/upload-book", {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(bookObj)
        }).then(res => res.json()).then(data => {
            alert('Book uploaded successfully!');
            form.reset();
        })
    } 

  return (
    <div className='px-4 my-12'>
        <h2 className='mb-8 text-3xl font-bold'>
            Upload A Book
        </h2>

        <form
         onSubmit={hanldeBookSubmit}
         className="flex  flex-col gap-4 lg:w-[1060px] flex-wrap"
        >
            {/* first row  */}
            <div className='flex gap-8'>
                {/* book title  */}
                <div className='lg:w-1/2'>
                    <div className="mb-2 block">
                        <Label htmlFor="bookTitle" value="Book Title" />
                    </div>
                    <TextInput id="bookTitle" type="text" name='bookTitle' placeholder="Book Title" required />
                </div>

                {/* author name  */}
                <div className='lg:w-1/2'>
                    <div className="mb-2 block">
                        <Label htmlFor="authorName" value="Author Name" />
                    </div>
                    <TextInput id="authorName" type="text" name='authorName' placeholder="Author Name" required />
                </div>
            </div>

            {/* second row  */}
            <div className='flex gap-8'>
                {/* book image url  */}
                <div className='lg:w-1/2'>
                    <div className="mb-2 block">
                        <Label htmlFor="imageUrl" value="Book Image URL" />
                    </div>
                    <TextInput id="imageUrl" type="text" name='imageUrl' placeholder="Book Image URL" required />
                </div>

                {/* category */}
                <div className='lg:w-1/2'>
                    <div className="mb-2 block">
                        <Label htmlFor="category" value="Book Category" />
                    </div>
                    <Select id="inputState" name="category" className="w-full rounded" value={selectedBookCategory}
                        onChange={handleChangeSelectedValue}
                    >
                        {
                            bookCategories.map((option) => 
                                <option key={option} value={option} className=' cursor-pointer'>
                                    {option}
                                </option>
                            )
                        }
                    </Select>
                </div>

            </div>

            {/* thired row */}
            <div>
                {/* book descripton  */}
                <div className=''>
                    <div className="mb-2 block">
                        <Label htmlFor="bookDescriptions" value="Book Description" />
                    </div>
                    <Textarea id="bookDescriptions" type="text" name='bookDescriptions' placeholder="Book description" rows={5} required />
                </div>
            </div>

            {/* book pdf link  */}
            <div className=''>
                <div className="mb-2 block">
                    <Label htmlFor="bookPdfUrl" value="Book pdf URL" />
                </div>
                <TextInput id="bookPdfUrl" type="text" name='bookPdfUrl' placeholder="Book pdf URL" required />
            </div>

            {/* upload button  */}
            <Button type='submit' className='mt-5'>
                Upload Book
            </Button>
        </form>
    </div>
  )
}
