import HomePage from "./home/page";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <HomePage />
      {/* Admin link in footer */}
      <div className="fixed bottom-4 right-4 z-50">
        <Link
          href="/admin"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm shadow-lg"
        >
          Admin Panel
        </Link>
      </div>
    </>
  );
}