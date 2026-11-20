import { ArrowDownIcon } from "./Icons.jsx";

/**
 * Animated call-to-action. A circle behind the arrow expands to fill the
 * button on hover; clicking smooth-scrolls to `targetId` with a 15% viewport
 * offset so the section isn't hidden under the navbar. It is a <button>
 * rather than an "#anchor" link because HashRouter owns the URL hash.
 */
const Button = ({ text, className = "", id, targetId = "counter" }) => {
  const handleClick = () => {
    const target = document.getElementById(targetId);
    if (!target) return;

    const offset = window.innerHeight * 0.15;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <button type="button" id={id} onClick={handleClick} className={`cta-wrapper ${className}`}>
      <div className="cta-button group">
        <div className="bg-circle" />
        <p className="cta-text">{text}</p>
        <div className="arrow-wrapper">
          <ArrowDownIcon className="size-5" />
        </div>
      </div>
    </button>
  );
};

export default Button;
