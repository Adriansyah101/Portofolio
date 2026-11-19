/**
 * Renders a string where `backtick` segments become inline <code> chips.
 * Used for repository names and version tags inside project descriptions.
 */
export const renderInlineCode = (text) =>
  text.split("`").map((segment, index) =>
    index % 2 === 1 ? (
      <code key={index} className="inline-code">
        {segment}
      </code>
    ) : (
      <span key={index}>{segment}</span>
    ),
  );

/**
 * Adds <wbr> break opportunities inside long CamelCase identifiers such as
 * `GTRacingMotorAcademyRecomp`, so they wrap at word boundaries on narrow
 * screens instead of overflowing. Short words are left untouched.
 */
export const softBreak = (text, minLength = 14) =>
  text.split(/(\s+)/).flatMap((word, wordIndex) => {
    if (word.length < minLength || /\s/.test(word)) return [word];
    const parts = word.split(/(?<=[a-z0-9])(?=[A-Z])/);
    return parts.flatMap((part, index) =>
      index === 0 ? [part] : [<wbr key={`${wordIndex}-${index}`} />, part],
    );
  });
