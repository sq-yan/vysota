// Брендированные фото «Вертикальные Решения» — public/photos/.
// У каждого кадра есть уменьшенная копия <name>-480.jpg для srcset
// (генерируются вместе с оригиналами, см. вложение фото в репо).
export type Photo = { src: string; srcSet: string; width: number; height: number }

const photo = (name: string, width: number, height: number): Photo => ({
  src: `/photos/${name}.jpg`,
  srcSet: `/photos/${name}-480.jpg 480w, /photos/${name}.jpg ${width}w`,
  width,
  height,
})

// Ключи описывают содержимое кадра — по ним секции выбирают фото под смысл.
export const PHOTOS = {
  // У фона Hero есть промежуточный размер 960w: на телефонах с DPR 2-3
  // 480w мылится (портретный object-cover растягивает кадр по высоте)
  heroBg: {
    ...photo('hero-bg', 1672, 941),
    srcSet:
      '/photos/hero-bg-480.jpg 480w, /photos/hero-bg-960.jpg 960w, /photos/hero-bg.jpg 1672w',
  },
  montazhFasad: photo('montazh-fasad', 1200, 896),
  remontShvov: photo('remont-shvov', 1200, 896),
  moykaFasada: photo('moyka-fasada', 1200, 896),
  germetizatsiyaShvov: photo('germetizatsiya-shvov', 843, 1264),
  uborkaSnega: photo('uborka-snega', 843, 1264),
  montazhZhk: photo('montazh-zhk', 896, 1200),
  vysotnyeRaboty: photo('vysotnye-raboty', 896, 1200),
}
