interface Review {
  rating: number;
  comment: string;
  date: string;
}

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="bg-white border border-gray-100 rounded-3xl p-6">
      {/* Star Rating with inline SVG */}
      <div className="flex gap-1 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            className={`w-5 h-5 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.975 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118L4.98 9.132c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
        ))}
      </div>
      
      <p className="text-gray-700 italic">"{review.comment}"</p>
      <p className="text-xs text-gray-400 mt-4">
        {new Date(review.date).toLocaleDateString('en-NG')}
      </p>
    </div>
  );
}