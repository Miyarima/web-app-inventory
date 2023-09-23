import LagerTitle from "./components/lager-title.js";
import ProductList from "./components/product-list.js";
import SingleProduct from "./components/single-product.js";

import Router from "./router.js";
import Navigation from "./navigation.js";
import ProductsView from "./views/products.js";

import PacklistView from "./views/packlist.js";
import OrderList from "./components/order-list.js";
import SingleOrder from "./components/single-order.js";

import DeliveriesView from "./views/deliveries.js";
import ReceivedList from "./components/received-list.js";
import NewDelivery from "./components/new-delivery.js";
import singleDelivery from "./components/single-delivery.js";

import LoginForm from "./components/login-form.js";
import loginView from "./views/login.js";

import InvoicesView from "./views/invoices.js";
import InvoicesTable from "./components/invoices-table.js";
import NewInvoice from "./components/new-invoice.js";

customElements.define('lager-title', LagerTitle);
customElements.define('product-list', ProductList);
customElements.define('single-product', SingleProduct);

customElements.define('router-outlet', Router);
customElements.define('navigation-outlet', Navigation);
customElements.define('products-view', ProductsView);

customElements.define('packlist-view', PacklistView);
customElements.define('order-list', OrderList);
customElements.define('single-order', SingleOrder);

customElements.define('deliveries-view', DeliveriesView);
customElements.define('received-list', ReceivedList);
customElements.define('new-delivery', NewDelivery);
customElements.define('single-delivery', singleDelivery);

customElements.define('login-form', LoginForm);
customElements.define('login-view', loginView);

customElements.define('invoices-view', InvoicesView);
customElements.define('invoices-table', InvoicesTable);
customElements.define('new-invoice', NewInvoice);

import MapView from "./views/map.js";
customElements.define('map-view', MapView);

import OrdersView from "./views/orders.js";
customElements.define('orders-view', OrdersView);

import MapLocation from "./components/map-view.js";
customElements.define("map-location", MapLocation);

import Camera from "./components/camera.js";
customElements.define("camera-comp", Camera);
