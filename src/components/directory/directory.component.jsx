import DirectoryItem from '../directory-item/directory-item.component';

import './directory.styles.scss';

const categories = [
  {
    id: 1,
    title: 'Hats',
    imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
    route: 'shop/hats',
  },
  {
    id: 2,
    title: 'Jackets',
    imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png',
    route: 'shop/jackets',
  },
  {
    id: 3,
    title: 'Sneakers',
    imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png',
    route: 'shop/sneakers',
  },
  {
    id: 4,
    title: 'Womens',
    imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png',
    route: 'shop/womens',
  },
  {
    id: 5,
    title: 'Mens',
    imageUrl:
      'https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg',
    route: 'shop/mens',
  },
];

const Directory = () => {
  return (
    <div className='directory-container'>
      <h2 className='directory-container title'>THE CLOTHING BAKERY</h2>
      {categories.map((category) => (
        <DirectoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default Directory;
