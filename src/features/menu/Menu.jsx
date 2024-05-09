import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../services/apiRestaurant';
import MenuItem from './MenuItem';

function Menu() {
  //287. Fetching Data With React Router "Loaders": Pizza Menu
  //S3) PROVIDING DATA TO PAGE
  const menu = useLoaderData();
  // console.log(menu);

  return (
    <ul className="divide-y divide-stone-200 px-2">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

export async function loader() {
  //287. Fetching Data With React Router "Loaders": Pizza Menu
  //S1) CREATING THE LOADER
  const menu = await getMenu();
  return menu;
}

export default Menu;
