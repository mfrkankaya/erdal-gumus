import React, { Component } from "react";
import "./scss/app.scss";
import * as firebase from "firebase";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  fetchCategories,
  fetchSubCategories,
  fetchPatterns,
  fetchProducts,
  fetchColors,
  fetchCovers,
  fetchOrders,
  fetchImageSize,
  fetchLastProductNumber,
  fetchTableSize
} from "./store/actions";
import Navbar from "./components/Navbar";
import HomeRoute from "./routes/Home";
import LoginRoute from "./routes/Login";
import PatternsRoute from "./routes/Patterns";
import PatternRoute from "./routes/PatternPage";
import ProductsRoute from "./routes/Products";
import ProductRoute from "./routes/ProductPage";
import OtherSettingsRoute from "./routes/OtherSettings";
import CreateOrdersRoute from "./routes/CreateOrders";
import OrdersRoute from "./routes/Orders";
import OrderRoute from "./routes/Order";

class App extends Component {
  state = {
    user: { empty: "empty" }
  };

  componentWillMount() {
    itializeFB();
  }

  render() {
    return (
      <div>
        {!this.state.user && <Redirect to="/" />}
        <Route path="/" exact component={LoginRoute} />
        <Route path="/app" component={Navbar} />
        <Route path="/anasayfa" exact component={HomeRoute} />
        <Route path="/app/mumKaliplari" exact component={PatternsRoute} />
        <Route path="/app/mumKaliplari/:id" exact component={PatternRoute} />
        <Route path="/app/urunler" exact component={ProductsRoute} />
        <Route path="/app/urunler/:id" exact component={ProductRoute} />
        <Route path="/app/digerAyarlar" exact component={OtherSettingsRoute} />
        <Route path="/app/siparisOlustur" exact component={CreateOrdersRoute} />
        <Route path="/app/siparisler" exact component={OrdersRoute} />
        <Route path="/app/siparisler/:id" exact component={OrderRoute} />
      </div>
    );
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user }, this.fetchData);
      } else {
        this.setState({ user: null });
      }
    });
  }

  fetchData = () => {
    this.props.fetchCategories();
    this.props.fetchSubCategories();
    this.props.fetchPatterns();
    this.props.fetchProducts();
    this.props.fetchOrders();
    this.props.fetchCovers();
    this.props.fetchColors();
    this.props.fetchImageSize();
    this.props.fetchTableSize();
    this.props.fetchLastProductNumber();
  };
}

const itializeFB = () => {
  const config = {
    apiKey: "AIzaSyDYrxQSnjOMXNBcvRzOTejTm8WCf9l8GU0",
    authDomain: "erdal-gumus.firebaseapp.com",
    databaseURL: "https://erdal-gumus.firebaseio.com",
    projectId: "erdal-gumus",
    storageBucket: "erdal-gumus.appspot.com",
    messagingSenderId: "917862710607",
    appId: "1:917862710607:web:af21b1d74826ceb70e193a"
    // apiKey: "AIzaSyCqV1dGvwIH-NivCy-20KNoTS01m6eft1A",
    // authDomain: "fir-playground-71c9e.firebaseapp.com",
    // databaseURL: "https://fir-playground-71c9e.firebaseio.com",
    // projectId: "fir-playground-71c9e",
    // storageBucket: "fir-playground-71c9e.appspot.com",
    // messagingSenderId: "846408687098",
    // appId: "1:846408687098:web:cb71cd108e918118"
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
};

const mapStateToProps = ({ general: { categories } }) => ({ categories });

export default connect(mapStateToProps, {
  fetchCategories,
  fetchSubCategories,
  fetchPatterns,
  fetchProducts,
  fetchColors,
  fetchCovers,
  fetchOrders,
  fetchImageSize,
  fetchLastProductNumber,
  fetchTableSize
})(App);

/* -------------------------------------------------------------------------- */
/*                                 Playgorund                                 */
/* -------------------------------------------------------------------------- */

// apiKey: "AIzaSyCqV1dGvwIH-NivCy-20KNoTS01m6eft1A",
// authDomain: "fir-playground-71c9e.firebaseapp.com",
// databaseURL: "https://fir-playground-71c9e.firebaseio.com",
// projectId: "fir-playground-71c9e",
// storageBucket: "fir-playground-71c9e.appspot.com",
// messagingSenderId: "846408687098",
// appId: "1:846408687098:web:cb71cd108e918118"

/* -------------------------------------------------------------------------- */
/*                                  ORIGINAL                                  */
/* -------------------------------------------------------------------------- */

// apiKey: "AIzaSyDYrxQSnjOMXNBcvRzOTejTm8WCf9l8GU0",
// authDomain: "erdal-gumus.firebaseapp.com",
// databaseURL: "https://erdal-gumus.firebaseio.com",
// projectId: "erdal-gumus",
// storageBucket: "erdal-gumus.appspot.com",
// messagingSenderId: "917862710607",
// appId: "1:917862710607:web:af21b1d74826ceb70e193a"
