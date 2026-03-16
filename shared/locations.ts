export const melbourneLocations = [
  "Abbotsford", "Armadale", "Ashburton", "Balwyn", "Bentleigh", "Blackburn", "Box Hill", "Brighton", "Brunswick",
  "Bulleen", "Burwood", "Camberwell", "Canterbury", "Caulfield", "Chadstone", "Cheltenham", "Clayton", "Coburg",
  "Cremorne", "Dingley Village", "Doncaster", "Elsternwick", "Essendon", "Glen Iris", "Glen Waverley", "Hampton",
  "Hawthorn", "Highett", "Kew", "Keysborough", "Kooyong", "Malvern", "Mentone", "Moorabbin", "Mordialloc",
  "Mulgrave", "Noble Park", "Northcote", "Notting Hill", "Oakleigh", "Parkdale", "Pascoe Vale", "Prahran",
  "Richmond", "Sandringham", "South Yarra", "Springvale", "St Kilda", "Strathmore", "Templestowe", "Toorak"
];

export function toSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-');
}
