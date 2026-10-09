import { business } from "../config/business";

function Logo({ className = "", onClick }) {
  return (
    <a
      className={`brand ${className}`.trim()}
      href="#home"
      onClick={onClick}
      aria-label="N Café home"
    >
      <span className="brand-mark" aria-hidden="true">
        <svg
          viewBox="0 0 40 40"
          className="brand-emblem-svg"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="20"
            cy="20"
            r="18.5"
            className="brand-ring-outer"
            stroke="currentColor"
            strokeWidth="0.8"
          />
          <circle
            cx="20"
            cy="20"
            r="15"
            className="brand-ring-inner"
            stroke="#E83E8C"
            strokeWidth="1.4"
          />
          <text
            x="20"
            y="20.5"
            textAnchor="middle"
            dominantBaseline="central"
            className="brand-monogram"
          >
            N
          </text>
        </svg>
      </span>
      <span className="brand-copy">
        <strong>{business.name}</strong>
        <small>FOOD · CAFE · MOMENTS</small>
      </span>
    </a>
  );
}

export default Logo;
