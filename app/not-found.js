import Link from "next/link"
 
export default function NotFound() {
    return (
        <main className="text-center">
            <h1 className="mt-4 text-3xl">Oops! Page not found</h1>
            <p className="mt-4 text-md">The page you’re looking for doesn’t exist.</p>
            <Link href='/' className="btn btn-success mt-4">Go Home</Link>

            <footer className="p-4 mt-8 mb-10">
                <div className="flex items-center justify-center">
                    <p className="text-gray-400 mr-2">Made with</p> <span className="text-gray-700 text-xl mr-2">   </span> <p className="text-gray-400 mr-2">by</p> <a href="https://www.linkedin.com/in/muhammad-jibran220/" target='_blank' rel='noopener noreferrer' className="text-green-400 font-bold underline mr-2">Jibran</a>  
                </div>
            </footer>

        </main>
    )
}