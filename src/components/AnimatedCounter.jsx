import CountUp from "react-countup";
import { counterItems } from "../constants/index.js";

const AnimatedCounter = () => (
  <div id="counter" className="padding-x-lg mt-12 xl:mt-0">
    <div className="grid-4-cols mx-auto">
      {counterItems.map((item) => (
        <div key={item.label} className="counter-card">
          <div className="counter-number">
            <CountUp
              end={item.value}
              suffix={item.suffix}
              duration={2.5}
              enableScrollSpy
              scrollSpyOnce
            />
          </div>
          <div className="text-lg text-blue-50">{item.label}</div>
        </div>
      ))}
    </div>
  </div>
);

export default AnimatedCounter;
