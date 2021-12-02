import { Switch } from "react-router-dom";
import Route from "./Route";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import Customers from "../pages/Costumers";
import New from "../pages/New";
import Products from "../pages/Products";
import NewProducts from "../pages/NewProducts";
import ExitProductsList from "../pages/ExitProductsList";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route exact path="/register" component={SignUp} />
      <Route exact path="/dashboard" component={Dashboard} isPrivate />
      <Route exact path="/profile" component={Profile} isPrivate />
      <Route exact path="/customers" component={Customers} isPrivate />
      <Route exact path="/new" component={New} isPrivate />
      <Route exact path="/new/:id" component={New} isPrivate />
      <Route exact path="/listaprodutos" component={Products} isPrivate />
      <Route exact path="/newProducts" component={NewProducts} isPrivate />
      <Route exact path="/newProducts/:id" component={NewProducts} isPrivate />
      <Route exact path="/listasaidadeprodutos" component={ExitProductsList} isPrivate />
    </Switch>
  );
}
