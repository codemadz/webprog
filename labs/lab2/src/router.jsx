import { createBrowserRouter } from "react-router-dom";
import App from './App';
import ComposeSalad from "./ComposeSalad";
import ViewOrder from "./ViewOrder";
import inventoryLoader from "./loaders";

const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: "compose-salad",
        loader: inventoryLoader,
        Component: ComposeSalad,
      }, {
        path: "view-order",
        Component: ViewOrder,
        children: [
          {
            path: "confirm/:orderId",
            Component: ViewOrder,
          }
        ]
      }, {
        index: true,
        element: <h1 className="text-bold text-center">Välkommen till Salladsbaren deluxe</h1>
      }, {
        path: "*",
        element: <p>404 Not Found</p>
      }]
  },
]);
export default router;