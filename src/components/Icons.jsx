/**
 * Inline SVG icon set. Everything is drawn in-code so the site never depends
 * on external image files for its UI glyphs.
 */

const Stroke = ({ children, className = "size-6", strokeWidth = 1.8, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
    {...props}
  >
    {children}
  </svg>
);

export const CodeIcon = (props) => (
  <Stroke {...props}>
    <path d="m8 7-5 5 5 5" />
    <path d="m16 7 5 5-5 5" />
    <path d="m13.5 4-3 16" />
  </Stroke>
);

export const ShaderIcon = (props) => (
  <Stroke {...props}>
    <path d="M12 3 3 8l9 5 9-5-9-5Z" />
    <path d="m3 13 9 5 9-5" />
    <path d="m3 17.5 9 5 9-5" opacity="0.55" />
  </Stroke>
);

export const ChipIcon = (props) => (
  <Stroke {...props}>
    <rect x="6" y="6" width="12" height="12" rx="2" />
    <rect x="9.5" y="9.5" width="5" height="5" rx="1" />
    <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
  </Stroke>
);

export const CubeIcon = (props) => (
  <Stroke {...props}>
    <path d="M12 2.5 3.5 7v10L12 21.5 20.5 17V7L12 2.5Z" />
    <path d="M3.5 7 12 11.5 20.5 7M12 11.5v10" />
  </Stroke>
);

export const GamepadIcon = (props) => (
  <Stroke {...props}>
    <path d="M7 7h10a5 5 0 0 1 4.9 6l-.8 4a2.5 2.5 0 0 1-4.3 1.2L14.6 16H9.4l-2.2 2.2A2.5 2.5 0 0 1 2.9 17l-.8-4A5 5 0 0 1 7 7Z" />
    <path d="M7.5 10v4M5.5 12h4" />
    <circle cx="15.5" cy="11" r="0.6" fill="currentColor" />
    <circle cx="17.5" cy="13" r="0.6" fill="currentColor" />
  </Stroke>
);

export const CloudIcon = (props) => (
  <Stroke {...props}>
    <path d="M7 18a4.5 4.5 0 0 1-.5-8.97A6 6 0 0 1 18 8.5a4.75 4.75 0 0 1-.5 9.5H7Z" />
  </Stroke>
);

export const FlagIcon = (props) => (
  <Stroke {...props}>
    <path d="M5 21V4" />
    <path d="M5 4h13l-2.5 4L18 12H5" />
    <path d="M9 4v8M13 4v8" opacity="0.5" />
  </Stroke>
);

export const CityIcon = (props) => (
  <Stroke {...props}>
    <path d="M3 21h18" />
    <path d="M5 21V9l5-3v15" />
    <path d="M10 21V4h6v17" />
    <path d="M16 21v-9h3v9" />
    <path d="M12.5 8h1M12.5 11h1M12.5 14h1M7 12h1M7 15h1" />
  </Stroke>
);

export const LayersIcon = (props) => (
  <Stroke {...props}>
    <rect x="3" y="3" width="8" height="6" rx="1.5" />
    <rect x="13" y="3" width="8" height="6" rx="1.5" />
    <rect x="8" y="15" width="8" height="6" rx="1.5" />
    <path d="M7 9v3h10V9M12 12v3" />
  </Stroke>
);

export const ArrowDownIcon = (props) => (
  <Stroke strokeWidth={2.2} {...props}>
    <path d="M12 4v16" />
    <path d="m6 14 6 6 6-6" />
  </Stroke>
);

export const ArrowRightIcon = (props) => (
  <Stroke strokeWidth={2} {...props}>
    <path d="M4 12h16" />
    <path d="m14 6 6 6-6 6" />
  </Stroke>
);

export const ArrowLeftIcon = (props) => (
  <Stroke strokeWidth={2} {...props}>
    <path d="M20 12H4" />
    <path d="m10 6-6 6 6 6" />
  </Stroke>
);

export const MenuIcon = (props) => (
  <Stroke strokeWidth={2} {...props}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Stroke>
);

export const CloseIcon = (props) => (
  <Stroke strokeWidth={2} {...props}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Stroke>
);

export const TabletIcon = (props) => (
  <Stroke {...props}>
    <rect x="4" y="2.5" width="16" height="19" rx="2.5" />
    <path d="M11 18.5h2" />
  </Stroke>
);

export const LaptopIcon = (props) => (
  <Stroke {...props}>
    <rect x="4" y="4.5" width="16" height="11" rx="1.5" />
    <path d="M2 19.5h20" />
  </Stroke>
);

export const MonitorIcon = (props) => (
  <Stroke {...props}>
    <rect x="2.5" y="3.5" width="19" height="13" rx="2" />
    <path d="M8 21h8M12 16.5V21" />
  </Stroke>
);

export const ShieldIcon = (props) => (
  <Stroke {...props}>
    <path d="M12 2.5 4 5.5v6c0 5 3.4 8.6 8 10 4.6-1.4 8-5 8-10v-6l-8-3Z" />
    <path d="m8.5 12 2.5 2.5 4.5-5" />
  </Stroke>
);

export const ArchiveIcon = (props) => (
  <Stroke {...props}>
    <rect x="2.5" y="3.5" width="19" height="5" rx="1" />
    <path d="M4.5 8.5v10a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-10" />
    <path d="M10 12.5h4" />
  </Stroke>
);

export const TerminalIcon = (props) => (
  <Stroke {...props}>
    <rect x="2.5" y="3.5" width="19" height="17" rx="2" />
    <path d="m7 9 3 3-3 3M12.5 15H17" />
  </Stroke>
);

export const ServerIcon = (props) => (
  <Stroke {...props}>
    <rect x="3" y="3.5" width="18" height="7" rx="1.5" />
    <rect x="3" y="13.5" width="18" height="7" rx="1.5" />
    <path d="M7 7h.01M7 17h.01" strokeWidth={2.6} />
  </Stroke>
);

export const DatabaseIcon = (props) => (
  <Stroke {...props}>
    <ellipse cx="12" cy="5.5" rx="8" ry="3" />
    <path d="M4 5.5v13c0 1.66 3.58 3 8 3s8-1.34 8-3v-13" />
    <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
  </Stroke>
);

export const LockIcon = (props) => (
  <Stroke {...props}>
    <rect x="4.5" y="10.5" width="15" height="10.5" rx="2" />
    <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
  </Stroke>
);

export const KeyboardIcon = (props) => (
  <Stroke {...props}>
    <rect x="2" y="5.5" width="20" height="13" rx="2" />
    <path d="M6 9.5h.01M10 9.5h.01M14 9.5h.01M18 9.5h.01M6 13h.01M18 13h.01M9 15.5h6" strokeWidth={2.2} />
  </Stroke>
);

export const BrokenIcon = (props) => (
  <Stroke {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="m5.6 5.6 12.8 12.8" />
  </Stroke>
);

export const ExternalIcon = (props) => (
  <Stroke {...props}>
    <path d="M14 4h6v6" />
    <path d="M20 4 10 14" />
    <path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />
  </Stroke>
);

export const TagIcon = (props) => (
  <Stroke {...props}>
    <path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9-9-9Z" />
    <circle cx="7.5" cy="7.5" r="1.3" />
  </Stroke>
);

export const SendIcon = (props) => (
  <Stroke {...props}>
    <path d="M21 3 10 14" />
    <path d="m21 3-7 18-4-7-7-4 18-7Z" />
  </Stroke>
);

export const StarIcon = ({ className = "size-5", ...props }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...props}>
    <path
      fill="currentColor"
      d="m12 2.6 2.9 5.9 6.5.95-4.7 4.6 1.1 6.45L12 17.45 6.2 20.5l1.1-6.45-4.7-4.6 6.5-.95L12 2.6Z"
    />
  </svg>
);

export const GitHubIcon = ({ className = "size-5", ...props }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...props}>
    <path
      fill="currentColor"
      d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.27-.01-1-.02-1.96-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14 0 1.55-.01 2.8-.01 3.18 0 .31.21.68.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"
    />
  </svg>
);

export const XIcon = ({ className = "size-5", ...props }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...props}>
    <path
      fill="currentColor"
      d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z"
    />
  </svg>
);

export const SunIcon = (props) => (
  <Stroke {...props}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" />
  </Stroke>
);

export const MoonIcon = (props) => (
  <Stroke {...props}>
    <path d="M20.5 14.2A8.5 8.5 0 1 1 9.8 3.5a6.8 6.8 0 0 0 10.7 10.7Z" />
  </Stroke>
);

/** Lookup used by data-driven sections (`icon: "chip"` in constants). */
export const iconMap = {
  code: CodeIcon,
  shader: ShaderIcon,
  chip: ChipIcon,
  cube: CubeIcon,
  gamepad: GamepadIcon,
  cloud: CloudIcon,
  flag: FlagIcon,
  city: CityIcon,
  layers: LayersIcon,
  github: GitHubIcon,
  x: XIcon,
  tag: TagIcon,
  external: ExternalIcon,
  arrowRight: ArrowRightIcon,
  tablet: TabletIcon,
  laptop: LaptopIcon,
  monitor: MonitorIcon,
  shield: ShieldIcon,
  archive: ArchiveIcon,
  terminal: TerminalIcon,
  server: ServerIcon,
  database: DatabaseIcon,
  lock: LockIcon,
  keyboard: KeyboardIcon,
  broken: BrokenIcon,
};

export const Icon = ({ name, ...props }) => {
  const Component = iconMap[name] ?? ExternalIcon;
  return <Component {...props} />;
};
