import { useRef } from "react";
import { Icon } from "./Icons.jsx";

/** Element ids shared by a tab and the panel it controls. */
export const tabIds = (base, id) => ({ tab: `${base}-tab-${id}`, panel: `${base}-panel-${id}` });

/**
 * WAI-ARIA tab row: one selected tab in the Tab order, Arrow keys / Home / End
 * move between tabs and select them. `tabs` is `[{ id, label, icon? }]`; pair
 * it with <TabPanel> using the same `base`.
 */
export const TabList = ({ tabs, value, onChange, label, base, className = "" }) => {
  const refs = useRef({});

  const onKeyDown = (event, index) => {
    const last = tabs.length - 1;
    const target = {
      ArrowRight: index === last ? 0 : index + 1,
      ArrowLeft: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    }[event.key];
    if (target === undefined) return;
    event.preventDefault();
    const next = tabs[target];
    onChange(next.id);
    refs.current[next.id]?.focus();
  };

  return (
    <div role="tablist" aria-label={label} className={`tab-list ${className}`}>
      {tabs.map((tab, index) => {
        const ids = tabIds(base, tab.id);
        const selected = tab.id === value;
        return (
          <button
            key={tab.id}
            ref={(node) => {
              refs.current[tab.id] = node;
            }}
            type="button"
            role="tab"
            id={ids.tab}
            aria-selected={selected}
            aria-controls={ids.panel}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(tab.id)}
            onKeyDown={(event) => onKeyDown(event, index)}
            className="tab"
          >
            {tab.icon && <Icon name={tab.icon} className="size-4 flex-none" />}
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

/** The panel of the selected tab (render only the active one). Keyed by tab so switching replays the fade. */
export const TabPanel = ({ base, value, className = "", children }) => {
  const ids = tabIds(base, value);
  return (
    <div key={value} role="tabpanel" id={ids.panel} aria-labelledby={ids.tab} tabIndex={0} className={`tab-panel ${className}`}>
      {children}
    </div>
  );
};
