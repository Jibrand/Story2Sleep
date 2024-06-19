"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home(props) {

    const [Books, setBooks] = useState([]);
    const [Loading, setLoading] = useState(true);

    useEffect(() => {
        console.log(props.params.filterstories);
        getBooks(props.params.filterstories);
    }, []);

    const getBooks = async (category) => {
        let data = await fetch(`http://localhost:3000/api/Books/${category}`);
        data = await data.json();

        if (data.success) {
            setBooks(data.result);
            setLoading(false);
        }
        else {
            setLoading(false);
            return { success: false };
        }
    }

    const formatDescription = (desc) => {
        if (desc.length <= 50) return desc;

        const truncated = desc.slice(0, 47);
        return (
            <>
                {truncated}
                <span className="text-gray-600">{desc[47]}</span>
                <span className="text-gray-700">{desc[48]}</span>
                <span className="text-gray-800">{desc[49]}</span>
                ...
            </>
        );
    }

    return (
        <>
            <div className="container mx-auto text-center">
                <div className="bg-gray-800 flex items-center p-3 rounded-2xl shadow-lg max-w-2xl mx-auto">
                    <span className="mr-4"> <Image src='/assests/book_emoji_reading.svg' className='h-8 w-8' alt="emoji" width={32} height={32} /> </span>
                    <p className="font-bold text-3xl text-center flex-grow">{props.params.filterstories}</p>
                </div>

                <br />

                {Loading ? (
                    <span className="loading loading-ring loading-lg mt-24"></span>
                ) : (
                    <div className="carousel carousel-center sm:max-w-4xl max-w-xs p-2 space-x-2 bg-neutral rounded-box">
                        {
                            Books.map((book, index) => (
                                <div className="carousel-item" key={index}>
                                    <div className="card w-72 bg-base-100 shadow-xl">
                                        <figure className="px-10 pt-4">
                                            <Image src={book.Image} className='rounded-xl' alt="book" height={152} width={152} />
                                        </figure>
                                        <div className="card-body items-center text-center">
                                            <h2 className="card-title">{book.Title}</h2>
                                            <p className="text-gray-500">{formatDescription(book.smallDesc)}</p>
                                            <div className="card-actions">
                                                <Link href={`/stories/${props.params.filterstories}/${book._id}`} className="btn btn-success">Listen</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                )}

                <footer className="p-4 mt-8 mb-10">
                    <div className="flex items-center justify-center">
                        <p className="text-gray-400 mr-2">Made with</p> <span className="text-gray-700 text-xl mr-2"> <Image src='/assests/book_emoji_reading.svg' className="h-6 w-6 rounded-full" alt="emoji" width={24} height={24} /> </span> <p className="text-gray-400 mr-2">by</p> <a href="https://www.linkedin.com/in/muhammad-jibran220/" target='_blank' rel='noopener noreferrer' className="text-green-400 font-bold underline mr-2">Jibran</a> <Image src='/assests/jibran.png' className="h-8 w-8 rounded-full" alt="Jibran" width={32} height={32} />
                    </div>
                </footer>

            </div>

        </>
    );
}
