import PhotoScreensaver from '../../components/PhotoScreensaver';

import { getAllScreensaverPhotos } from '../../lib/notion'; 

export const revalidate = 86400;

export default async function Home() {
  const photos = await getAllScreensaverPhotos();

  return (
    <main className="max-w-6xl mx-auto px-6 py-8">
      <PhotoScreensaver photos={photos} />
    </main>
  );
}