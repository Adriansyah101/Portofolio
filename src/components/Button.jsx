import { ArrowDownIcon } from "./Icons.jsx";

/**
 * Animated call-to-action. A circle behind the arrow expands to fill the
 * button on hover; clicking smooth-scrolls to the metrics counter with a
 * 15% viewport offset so the section isn't hidden under the navbar.
 */
const Button = ({ text, className = "", id, targetId = "counter" }) => {
  const handleClick = (event) => {
    event.preventDefault();
    const target = document.getElementById(targetId);
    if (!target) return;

    const offset = window.innerHeight * 0.15;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <a
      href={`#${targetId}`}
      id={id}
      onClick={handleClick}
      className={`cta-wrapper ${className}`}
    >
      <div className="cta-button group">
        <div className="bg-circle" />
        <p className="cta-text">{text}</p>
        <div className="arrow-wrapper">
          <ArrowDownIcon className="size-5" />
        </div>
      </div>
    </a>
  );
};

export default Button;
