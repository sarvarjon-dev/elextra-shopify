import type { Review } from "../../../types";

interface Props {
  review: Review;
}

// 2. Bitta sharhni chizib beradigan mustaqil komponent (Card)
const ReviewCard = ({ review }: Props) => {
  return (
    <div className="w-full border-b border-slate-100 py-6 last:border-0">
      <div className="flex items-center justify-between mb-3">
        {/* Ism va Yulduzchalar */}
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 font-bold text-slate-600">
            {review?.user?.full_name?.charAt(0) || "U"}
          </div>
          <div>
            <h4 className="font-bold text-slate-900">
              {review.user?.full_name || "Foydalanuvchi"}
            </h4>
            <div className="text-yellow-400 text-sm tracking-widest">
              {"★".repeat(review.rating)}
              <span className="text-slate-200">
                {"★".repeat(5 - review.rating)}
              </span>
            </div>
          </div>
        </div>

        {/* Sana */}
        <span className="text-sm text-slate-400">
          {new Date(review.created_at || "").toLocaleDateString()}
        </span>
      </div>

      {/* Sharh matni */}
      <p className="text-slate-600 leading-relaxed">{review.comment}</p>
    </div>
  );
};

export default ReviewCard;
