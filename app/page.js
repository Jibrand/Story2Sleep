import Image from "next/image";
import Link from "next/link";

export default function Home() {

  const categories = [
    { name: 'Adventure', emoji: '🗺️' },
    { name: 'Fantasy', emoji: '🧚' },
    { name: 'Mystery', emoji: '🕵️‍♂️' },
    { name: 'Fairy', emoji: '🧚‍♀️' },
    { name: 'Classics', emoji: '📖' },
    { name: 'History', emoji: '🏰' },
    { name: 'Nature', emoji: '🌳' },
    { name: 'Animals', emoji: '🐻' },
    { name: 'Space', emoji: '🚀' },
    { name: 'Magic', emoji: '🎩' },
    { name: 'Fiction', emoji: '👽' },
    { name: 'Brains', emoji: '🧠' },
    { name: 'Dreams', emoji: '💫' },
    { name: 'Friends', emoji: '🤝' },
    { name: 'Family', emoji: '👨‍👩‍👧‍👦' },
    { name: 'Heroes', emoji: '🦸‍♂️' },
    { name: 'Legends', emoji: '🏆' },
    { name: 'Seasons', emoji: '❄️' },
    { name: 'Humor', emoji: '😂' },
    { name: 'Romance', emoji: '❤️' }
  ];

  return (
    <>
      <div className="container mx-auto text-center">
        <div className="bg-gray-800 flex items-center p-3 rounded-2xl shadow-lg max-w-2xl mx-auto">
          <span className="mr-4">
            <Image src='/assests/book_emoji_reading.svg' className='h-8 w-8' alt="emoji" width={32} height={32} />
          </span>
          <p className="font-bold text-3xl text-center flex-grow">Story2Sleep</p>

        </div>
        <br />

        <h1 className="text-5xl font-bold mb-8 sm:px-14 mt-2"> Delightful bedtime stories for every mood. </h1>
        <p className="text-xl mb-8">Willing to have sweat Dreams?</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:px-16 ">
          {categories.map((category, index) => (
            <Link href='/stories' key={index} className="sm:mx-5 btn  btn-outline btn-md sm:btn-sm md:btn-md lg:btn-lg btn-success"> <span className='text-lg'>{category.emoji}</span>    {category.name}</Link>
          ))}
        </div>

        <footer className="p-4 mt-8 mb-10">
          <div className="flex items-center justify-center">
            <p className="text-gray-400 mr-2">Made with</p> <span className="text-gray-700 text-xl mr-2"> <Image src='/assests/book_emoji_reading.svg' className="h-6 w-6 rounded-full" alt="emoji" width={24} height={24} /> </span> <p className="text-gray-400 mr-2">by</p> <a href="https://www.linkedin.com/in/muhammad-jibran220/" target='_blank' rel='noopener noreferrer' className="text-green-400 font-bold underline mr-2">Jibran</a> <Image src='/assests/jibran.png' className="h-8 w-8 rounded-full" alt="Jibran" width={32} height={32} />
          </div>
        </footer>

      </div>

    </>
  );
}
