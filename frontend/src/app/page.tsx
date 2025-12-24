// import ProductManagement from "./components/ProductManagement";
import Link from "next/link";
import HomePage from "./home/page";


export default function Home() {
  return (
    <>
      <HomePage/>
      <div className="fixed bottom-4 right-4 z-50">
        <Link
          href="/admin"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm"
        >
          Admin Panel
        </Link>
      </div>
    </>
  )
};


