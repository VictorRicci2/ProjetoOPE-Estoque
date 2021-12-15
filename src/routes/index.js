import { Switch } from "react-router-dom";
import Route from "./Route";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import Products from "../pages/Products";
import EditProducts from "../pages/EditProducts"
import EditProviders from "../pages/EditProviders"
import ExitProductsList from "../pages/ExitProductsList";
import Providers from "../pages/Providers";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route exact path="/register" component={SignUp} />
      <Route exact path="/dashboard" component={Dashboard} isPrivate />
      <Route exact path="/profile" component={Profile} isPrivate />
      <Route exact path="/fornecedores" component={Providers} isPrivate />
      <Route exact path="/fornecedores/:id" component={EditProviders} isPrivate />
      <Route exact path="/listaprodutos" component={Products} isPrivate />
      <Route exact path="/listaprodutos/:id" component={EditProducts} isPrivate />
      <Route
        exact
        path="/listasaidadeprodutos"
        component={ExitProductsList}
        isPrivate
      />
    </Switch>
  );
}
