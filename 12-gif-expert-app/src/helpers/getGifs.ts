export const getGiffs = async (category: string) => {
  const url = `https://api.giphy.com/v1/gifs/search?api_key=e3vObV34FPGYDkJtcixDupe5NeS6kpkF&q=${category}&limit=3`;
  const res = await fetch(url);
  const { data = [] } = await res.json();

  const gifs = data.map((img: any) => ({
    id: img.id,
    title: img.title,
    url: img.images.downsized_medium.url,
  }));
  return gifs;
};
