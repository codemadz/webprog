import { createBrowserRouter } from "react-router-dom";
import App from './App';
import ComposeSalad from "./ComposeSalad";
import ViewOrder from "./ViewOrder";

const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: "compose-salad",
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
        element: <p>Welcome to my own salad bar</p>
      }, {
        path: "*",
        element: <p>404 Not Found</p>
      }]
  },
]);
export default router;