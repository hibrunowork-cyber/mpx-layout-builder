export interface ImageAsset {
  id: string;
  label: string;
  path: string;
}

export const IMAGES: ImageAsset[] = [
  { id: 'background',         label: 'Background',  path: '/imgs/background.png' },
  { id: 'image',              label: 'Imagem',       path: '/imgs/image.png' },
  { id: 'imagem-onboarding',  label: 'Onboarding',  path: '/imgs/imagem-onboarding.png' },
  { id: 'top',                label: 'Top',          path: '/imgs/top.png' },
];
