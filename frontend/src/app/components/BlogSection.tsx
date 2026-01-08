export default function BlogSection() {
  return (
    <section className="text-center bg-slate-50 text-2xl my-20 py-10">
      <h3 className="mb-4">Our Blog</h3>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Stay updated with the latest trends, product reviews, and shopping tips.
      </p>
      <div className="mt-6">
        <button className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition-colors">
          Read Blog
        </button>
      </div>
    </section>
  );
}
