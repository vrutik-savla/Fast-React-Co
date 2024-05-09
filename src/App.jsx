import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import AppLayout from './ui/AppLayout';
import Home from './ui/Home';
import Error from './ui/Error';
import Menu, { loader as menuLoader } from './features/menu/Menu';
import Cart from './features/cart/Cart';
import CreateOrder, {
  action as createOrderAction,
} from './features/order/CreateOrder';
import Order, { loader as orderLoader } from './features/order/Order';
import { action as updateOrderAction } from './features/order/UpdateOrder';

const router = createBrowserRouter([
  {
    // 286. Building the App Layout
    element: <AppLayout />,
    errorElement: <Error />, //289. Handling Errors With Error Elements

    children: [
      // 285. A New Way Of Implementing Routes
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/menu',
        element: <Menu />,
        //287. Fetching Data With React Router "Loaders": Pizza Menu
        //S2)PROVIDING THE LOADER
        loader: menuLoader,
        errorElement: <Error />,
      },
      { path: '/cart', element: <Cart /> },
      {
        path: '/order/new',
        element: <CreateOrder />,
        action: createOrderAction, //291. Writing Data With React Router "Actions"
      },
      {
        path: '/order/:orderId',
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
        action: updateOrderAction, //325. Updating Data Without Navigation
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
