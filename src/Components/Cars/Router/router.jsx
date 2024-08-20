
import { createBrowserRouter } from "react-router-dom";
import App from "../../../App";
import Cars from "../Cars";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
    },
    {
        path:"/cars",
        element:<Cars/>
    }
])
export default router