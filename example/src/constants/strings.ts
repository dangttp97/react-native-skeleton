export const CONSTANTS = {
  apiToken: 'XaZSH1T_9VEOjABePn_aMFGi2VMPQ9uRYg850_3gUXQ',
  defaultImage:
    'https://t4.ftcdn.net/jpg/04/99/93/31/360_F_499933117_ZAUBfv3P1HEOsZDrnkbNCt4jc3AodArl.jpg',
  baseUrl: 'https://api.unsplash.com',
  paths: {
    getPhotos: '/photos',
    getCollections: '/collections',
    getUserPhotos: (username: string) => `/users/${username}/photos`,
  },
};
