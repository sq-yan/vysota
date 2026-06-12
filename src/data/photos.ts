const u = (id: string, w = 1200, q = 80) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=${q}`

export const CASE_PHOTOS = {
  facadeBig: u('photo-1545324418-cc1a3fa10c00', 1600),
  windowsClean: u('photo-1541888946425-d81bb19240f5', 1200),
  bridge: u('photo-1504307651254-35680f356dfd', 1200),
  industrialTank: u('photo-1486406146926-c627a92ad1ab', 1200),
  offshore: u('photo-1503387762-592deb58ef4e', 1200),
  windTurbine: u('photo-1513467535987-fd81bc7d62f8', 1200),
}

export const HERO_PHOTOS = {
  main: u('photo-1545324418-cc1a3fa10c00', 1400),
  side: u('photo-1541888946425-d81bb19240f5', 900),
}

export const GALLERY_PHOTOS = [
  u('photo-1486406146926-c627a92ad1ab', 1000),
  u('photo-1513467535987-fd81bc7d62f8', 1000),
  u('photo-1503387762-592deb58ef4e', 1000),
  u('photo-1504307651254-35680f356dfd', 1000),
  u('photo-1541888946425-d81bb19240f5', 1000),
  u('photo-1545324418-cc1a3fa10c00', 1000),
]

export const BACKDROP_PHOTO = u('photo-1545324418-cc1a3fa10c00', 2000, 60)
