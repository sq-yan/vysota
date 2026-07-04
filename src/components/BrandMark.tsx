// Фирменный знак «Вертикальные Решения»: буква V из двух сходящихся строп,
// верёвка-спусковуха и карабин снизу. V наследует цвет текста (currentColor),
// карабин — оранжевый акцент.
//
// watermark=true — режим гигантского призрачного знака (в Hero): всё рисуется
// одним currentColor, без хардкод-оранжа и тёмной прорези, иначе карабин
// вылезает ярко-оранжевым «квадратом» поверх фона.
export function BrandMark({
  className,
  watermark = false,
}: {
  className?: string
  watermark?: boolean
}) {
  return (
    <svg
      viewBox="0 0 100 116"
      fill="none"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Левая стропа */}
      <path d="M8 8 L26 8 L52 74 L43 74 Z" fill="currentColor" />
      {/* Правая стропа */}
      <path d="M92 8 L74 8 L57 74 L48 74 Z" fill="currentColor" />
      {/* Верёвка от вершины вниз */}
      <rect x="48" y="70" width="4" height="30" rx="2" fill="currentColor" />
      {/* Карабин */}
      <rect x="42" y="100" width="16" height="12" rx="4" fill={watermark ? 'currentColor' : '#f97316'} />
      {!watermark && <rect x="46" y="103" width="8" height="6" rx="2" fill="#070b16" />}
    </svg>
  )
}
