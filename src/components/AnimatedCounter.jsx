import CountUp from "react-countup";
import { counterItems } from "../constants/index.js";
import { useLocalized } from "../context/LanguageContext.jsx";
import { renderInlineCode } from "../utils/text.jsx";

/**
 * Home metric strip: four compact cells (2 × 2 on phones). An item with
 * `text` shows that word instead of counting up; `note` adds a small line.
 */
const AnimatedCounter = ({ className = "" }) => {
  const items = useLocalized(counterItems);
  return (
    <ul id="counter" className={`metric-strip ${className}`}>
      {items.map((item) => (
        <li key={item.id} className="metric">
          <p className="metric-value">
            {item.text ?? <CountUp end={item.value} decimals={item.decimals ?? 0} suffix={item.suffix} duration={2.5} />}
          </p>
          <p className="metric-label">{renderInlineCode(item.label)}</p>
          {item.note && <p className="metric-note">{item.note}</p>}
        </li>
      ))}
    </ul>
  );
};

export default AnimatedCounter;
