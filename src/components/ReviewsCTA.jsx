import { ArrowUpRight, MessageSquareText } from "lucide-react";

const googleReviewsUrl = "https://www.google.com/search?q=N+Cafe+Opposite+PMT+College+Loni+Budruk+Shirdi+Google+reviews";

function ReviewsCTA() {
  return (
    <section className="section reviews-cta" aria-labelledby="reviews-title">
      <div className="container">
        <div className="reviews-cta-inner">
          <div className="reviews-cta-mark" aria-hidden="true"><MessageSquareText size={24} /></div>
          <div className="reviews-cta-copy">
            <p className="eyebrow">A note from our table</p>
            <h2 id="reviews-title">Enjoyed your time at N Café?</h2>
            <p>Your feedback helps our little café keep getting better—and helps others find us.</p>
          </div>
          <div className="reviews-cta-action">
            <a className="button button-primary" href={googleReviewsUrl} target="_blank" rel="noreferrer">
              Open Google Reviews <ArrowUpRight size={16} />
            </a>
            <span>On N Café’s Google profile, choose “Write a review”.</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ReviewsCTA;
