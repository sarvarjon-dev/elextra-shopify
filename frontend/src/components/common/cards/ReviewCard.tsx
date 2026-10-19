// 1. Vaqtincha sharhlar ro'yxati (Backend ulanganda bu API'dan keladi)
export const mockReviews = [
  {
    id: 1,
    author: "Ali Valiyev",
    rating: 5,
    date: "15 Oktabr, 2026",
    comment:
      "Kutganimdan ham ajoyib chiqdi. Rangi va ishlashi juda zo'r. Tavsiya qilaman!",
  },
  {
    id: 2,
    author: "Sardor",
    rating: 4,
    date: "12 Oktabr, 2026",
    comment:
      "Mahsulot yaxshi, lekin yetkazib berishda biroz kechikish bo'ldi. Qolgani joyida.",
  },
];

// 2. Bitta sharhni chizib beradigan mustaqil komponent (Card)
const ReviewCard = ({ review }: { review: any }) => {
  return (
    <div className="w-full border-b border-slate-100 py-6 last:border-0">
      <div className="flex items-center justify-between mb-3">
        {/* Ism va Yulduzchalar */}
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 font-bold text-slate-600">
            {review.author.charAt(0)} {/* Ismning birinchi harfi */}
          </div>
          <div>
            <h4 className="font-bold text-slate-900">{review.author}</h4>
            <div className="text-yellow-400 text-sm tracking-widest">
              {"★".repeat(review.rating)}
              <span className="text-slate-200">
                {"★".repeat(5 - review.rating)}
              </span>
            </div>
          </div>
        </div>

        {/* Sana */}
        <span className="text-sm text-slate-400">{review.date}</span>
      </div>

      {/* Sharh matni */}
      <p className="text-slate-600 leading-relaxed">{review.comment}</p>
    </div>
  );
};

export default ReviewCard;
