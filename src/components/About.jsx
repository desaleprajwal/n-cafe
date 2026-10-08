import { Coffee, Heart, Sparkles, Utensils } from "lucide-react";
import { responsiveImageProps } from "../utils/responsiveImage";

const experiences = [
  ["Fresh Food", Utensils], ["Cozy Café", Coffee], ["Great Moments", Heart], ["Made With Care", Sparkles],
];

function About() {
  return (
    <section className="section section-about" id="about">
      <div className="container about-layout">
        <div className="about-photo"><img src="/images/cAFEiMAGE7.webp" {...responsiveImageProps("/images/cAFEiMAGE7.webp", "(max-width: 760px) 100vw, 50vw")} alt="Inside the N Café dining area" loading="lazy" decoding="async" /><span>Make yourself at home</span></div>
        <div className="about-copy">
          <p className="eyebrow">The N Café experience</p>
          <h2>Good things,<br /><em>shared.</em></h2>
          <p className="about-description">N Café is a cosy neighbourhood spot for good food and unhurried time together. Drop in with friends, bring the family, and find a new favourite at the table.</p>
          <ul className="experience-list">
            {experiences.map(([title, Icon]) => <li key={title}><Icon size={17} aria-hidden="true" /><span>{title}</span></li>)}
          </ul>
          <a className="text-link" href="#contact">Come visit us <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
  );
}

export default About;
