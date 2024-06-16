import Image from "next/image";
import JibranImage from '../../public/assests/jibran.png'
import Emoji from '../../public/assests/book_emoji_reading.svg'
import Book from '../../public/assests/book.JPG'
import Link from "next/link";

export default function Home() {

  const books = [
    {
      title: 'The Lost Expedition',
      description: 'An epic journey through uncharted lands filled with danger and discovery.',
      category: 'Adventure'
    },
    {
      title: 'The Enchanted Forest',
      description: 'A magical tale of mythical creatures and ancient spells.',
      category: 'Fantasy'
    },
    {
      title: 'Murder at Midnight',
      description: 'A thrilling mystery that keeps you guessing until the very end.',
      category: 'Mystery'
    },
    {
      title: 'The Fairy Kingdom',
      description: 'Discover the secrets of the hidden fairy realm and its enchanting inhabitants.',
      category: 'Fairy'
    },
    {
      title: 'Pride and Prejudice',
      description: 'A timeless classic exploring love, society, and human nature.',
      category: 'Classics'
    },
    {
      title: 'The Rise and Fall of Empires',
      description: 'An in-depth exploration of historical events that shaped civilizations.',
      category: 'History'
    },
    {
      title: 'Wilderness Tales',
      description: 'Journey into the heart of nature and witness its beauty and challenges.',
      category: 'Nature'
    },
    {
      title: 'Adventures of the Bear Family',
      description: 'Heartwarming stories of a bear family and their adventures in the wild.',
      category: 'Animals'
    },
    {
      title: 'Galactic Explorers',
      description: 'Bold adventurers venture into the depths of space to uncover its mysteries.',
      category: 'Space'
    },
    {
      title: 'The Wizard\'s Apprentice',
      description: 'Embark on a magical journey where spells and potions abound.',
      category: 'Magic'
    }
  ];

  return (
    <>
      <div className="container mx-auto text-center">
        <div className="bg-gray-800 flex items-center p-3 rounded-2xl shadow-lg max-w-2xl mx-auto">
          <span className="mr-4"> <Image src={Emoji} className='h-8 w-8' alt="emoji" width={32} height={32} /> </span>
          <p className="font-bold text-3xl text-center flex-grow">Category</p>
        </div>

        <br />

        <div className="carousel carousel-center sm:max-w-4xl max-w-xs p-2  space-x-2 bg-neutral rounded-box">

          {books.map((book, index) => (
            <div className="carousel-item" key={index}>
              <div className="card w-72 bg-base-100 shadow-xl">
                <figure className="px-10 pt-4">
                  <Image src={Book} className='rounded-xl' alt="emoji" height={152} width={152} />
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title">{book.title}</h2>
                  <p>{book.description}</p>
                  <div className="card-actions">
                    <Link href='/story' className="btn btn-success">Hear Now!</Link>
                  </div>
                </div>
              </div>
            </div>
          ))}

        </div>

        <footer className="p-4 mt-8 mb-10">
                <div className="flex items-center justify-center">
                    <p className="text-gray-400 mr-2">Made with</p> <span className="text-gray-700 text-xl mr-2"> <Image src={Emoji} className="h-6 w-6 rounded-full" alt="emoji" width={24} height={24} /> </span> <p className="text-gray-400 mr-2">by</p> <a href="https://www.linkedin.com/in/muhammad-jibran220/" target='_blank' rel='noopener noreferrer' className="text-green-400 font-bold underline mr-2">Jibran</a> <Image src={JibranImage} className="h-8 w-8 rounded-full" alt="Jibran" width={32} height={32} />
                </div>
            </footer>

      </div>

    </>
  );
}
