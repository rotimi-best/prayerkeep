export default function formatVerses(verses) {
  return verses.reduce((acc, cur, i) => {
    const prev = verses[i === 0 ? i : i - 1];
    if (!acc) {
      acc = `${cur}`;
    } else {
      if (cur - prev === 1) {
        acc = acc.includes(`-${prev}`)
          ? acc.replace(`-${prev}`, `-${cur}`)
          : `${acc}-${cur}`;
      } else {
        acc = `${acc}, ${cur}`;
      }
    }
    return acc;
  }, '');
}
