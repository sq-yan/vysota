// Фирменный знак «Вертикальные Решения» — утверждённый концепт (вариант 1),
// вырезанный на прозрачный фон: белый V из строп + верёвка со спусковым
// устройством. Рендерится картинкой из /logo-mark.png; размер и прозрачность
// задаются через className в месте использования.
export function BrandMark({ className }: { className?: string }) {
  return <img src="/logo-mark.png" alt="" aria-hidden className={className} />
}
