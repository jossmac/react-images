function unsplash(id) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=${quality}&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D`;
}

const quality = 80;
const width = 1024;

export const images = [
  {
    src: unsplash('1437422061949-f6efbde0a471'),
    description: 'Blue mountains',
  },
  // {
  //   src: unsplash('1508604140312-8dc6638aec97'),
  //   description: 'Little wharf',
  // },
  {
    src: unsplash('1421789665209-c9b2a435e3dc'),
    description: 'Baby forest',
  },
  {
    src: unsplash('1431794062232-2a99a5431c6c'),
    description: 'Cliff waterfall',
  },
  {
    src: unsplash('1470813740244-df37b8c1edcb'),
    description: 'Milky way above canyon',
  },
];
