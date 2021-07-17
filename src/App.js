import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./assets/theme";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomeScreen from "./Views/HomeScreen";
import ProductScreen from "./Views/ProductScreen";
import CategoryScreen from "./Views/CategoryScreen";
import LoginScreen from "./Views/LoginScreen";
import AddProductScreen from "./Views/AddProductScreen";
import OrderScreen from "./Views/OrderScreen";
import OrderSuccess from "./Views/OrderSuccess";
import Dashboard from "./Views/Dashboard";
import AllProducts from "./Views/AllProducts";

import "./App.css";

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Header />
        <Switch>
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/category/:category" component={CategoryScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/addproduct" component={AddProductScreen} />
          <Route path="/orders" component={OrderScreen} />
          <Route path="/ordersuccess/:id" component={OrderSuccess} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/allproducts" component={AllProducts} />
          <Route path="/" component={HomeScreen} />
        </Switch>
        <Footer />
      </ThemeProvider>
    </Router>
  );
}

export default App;
