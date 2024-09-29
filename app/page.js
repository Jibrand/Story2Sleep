import Image from "next/image";

export default function Home() {

  return (
    <>
      <div className="container mx-auto text-center">
        <footer className="p-4 mt-8 mb-10">
          <div className="flex items-center justify-center">
            <p className="text-gray-400 mr-2">Made with</p> <span className="text-gray-700 text-xl mr-2"> </span> <p className="text-gray-400 mr-2">by</p> <a href="https://www.linkedin.com/in/muhammad-jibran220/" target='_blank' rel='noopener noreferrer' className="text-green-400 font-bold underline mr-2">Jibran</a> 
          </div>
        </footer>
      </div>
    </>
  );
}
