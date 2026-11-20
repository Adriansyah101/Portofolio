import CountUp from "react-countup";
import { counterItems } from "../constants/index.js";
import { useLocalized } from "../context/LanguageContext.jsx";
import { renderInlineCode } from "../utils/text.jsx";

/** Home metrics. An item with `text` shows that word instead of counting up; `note` adds a small line. */
const AnimatedCounter = () => {
  const items = useLocalized(counterItems);
  return (
    <div id="counter" className="padding-x-lg mt-12 xl:mt-0">
      <div className="grid-4-cols mx-auto">
        {items.map((item) => (
          <div key={item.id} className="counter-card">
            <div className={item.text ? "counter-number is-text" : "counter-number"}>
              {item.text ?? (
                <CountUp
                  end={item.value}
                  decimals={item.decimals ?? 0}
                  suffix={item.suffix}
                  duration={2.5}
                  enableScrollSpy
                  scrollSpyOnce
                />
              )}
            </div>
            <div className="text-lg text-blue-50">{renderInlineCode(item.label)}</div>
            {item.note && <div className="mt-2 font-mono text-xs tracking-wide text-body">{item.note}</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedCounter;
