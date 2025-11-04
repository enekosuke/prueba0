import { FiStar } from 'react-icons/fi';

export default function ReviewSection({ reviews = [] }) {
  if (reviews.length === 0) {
    reviews = [
      {
        id: '1',
        name: 'Elena Q.',
        rating: 5,
        comment: 'Texturas impecables y experiencia de compra impecable. El asesor me recomendó piezas complementarias perfectas.',
        date: 'Hace 3 días'
      },
      {
        id: '2',
        name: 'Lucía M.',
        rating: 4,
        comment: 'El bolso Halo llegó con packaging sostenible precioso y la personalización NFC es magia pura.',
        date: 'Hace 1 semana'
      }
    ];
  }

  return (
    <div className="card-glass rounded-3xl p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Reseñas verificadas</h3>
        <span className="flex items-center gap-2 text-sm text-secondary">
          <FiStar className="text-lg" /> 4.9 sobre 5
        </span>
      </div>
      <div className="mt-6 space-y-6">
        {reviews.map((review) => (
          <article key={review.id} className="rounded-2xl bg-white/5 p-4">
            <div className="flex items-center justify-between text-sm text-slate-300">
              <p className="font-semibold text-white">{review.name}</p>
              <p>{review.date}</p>
            </div>
            <div className="mt-2 flex gap-1 text-secondary">
              {Array.from({ length: 5 }).map((_, idx) => (
                <FiStar key={idx} className={idx < review.rating ? 'fill-secondary text-secondary' : 'text-slate-600'} />
              ))}
            </div>
            <p className="mt-3 text-sm text-slate-200">{review.comment}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
