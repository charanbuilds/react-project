import { useEffect, useState } from "react";

export default function OffersSection() {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/offers")
      .then((res) => res.json())
      .then((data) => setOffers(data || []))
      .catch(() => setOffers([]));
  }, []);

  return (
    <div className="px-4 my-6">
      <h2 className="text-lg font-bold mb-3">
        🔥 Offers for you
      </h2>

      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar">
        {offers.map((o, i) => (
          <div
            key={i}
            className="snap-start min-w-[300px] h-[140px] rounded-2xl relative overflow-hidden shadow-md"
          >
            <img
              src={
                o.image ||
                "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=800&h=300&fit=crop&q=80"
              }
              className="w-full h-full object-cover"
            />

            <div className=" overlay absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>

            {/* Text */}
            <div className="absolute left-4 top-4 text-white">
              <p className="text-xs opacity-80">Use Code</p>
              <h2 className="text-lg font-bold tracking-wide">
                {o.code}
              </h2>
              <p className="text-sm">
                ₹{o.discount} OFF
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}