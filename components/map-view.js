/* global L */

import "../leaflet/leaflet.min.js";
import "../leaflet/leaflet.markercluster.min.js";

import getCoordinates from "../models/nominatim.js";

import orderModels from "../models/orders.js";

export default class MapLocation extends HTMLElement {
    constructor() {
        super();

        this.order = "";
        this.map = null;
        this.info = {};
    }

    static get observedAttributes() {
        return ['order'];
    }

    attributeChangedCallback(property, oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        }

        this[property] = newValue;
    }

    async getOrder() {
        let orders = await orderModels.getOrders();

        orders.forEach(order => {
            if (order.id === parseInt(this.order)) {
                this.info = {
                    id: order.id,
                    name: order.name,
                    address: order.address
                };
            }
        });
    }

    async connectedCallback() {
        await this.getOrder();
        this.innerHTML = `
        <h1 class="order-person">${this.info.name} (${this.info.id})</h1>
        <div id="map" class="map"></div>
        `;
        this.renderMap();
    }

    async renderMap() {
        let adress = this.info.address;
        const results = await getCoordinates(adress);

        this.map = L.map('map').setView([
            parseFloat(results[0].lat),
            parseFloat(results[0].lon)
        ], 12);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.map);

        this.renderMarkers();

        this.renderLocation();
    }

    async renderMarkers() {
        let markers = L.markerClusterGroup();

        let adress = this.info.address;

        const results = await getCoordinates(adress);

        markers.addLayer(L.marker([
            parseFloat(results[0].lat),
            parseFloat(results[0].lon)
        ]).bindPopup(adress));

        this.map.addLayer(markers);
    }

    renderLocation() {
        let locationMarker = L.icon({
            iconUrl:      "leaflet/location.png",
            iconSize:     [24, 24],
            iconAnchor:   [12, 12],
            popupAnchor:  [0, 0]
        });


        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                L.marker(
                    [position.coords.latitude,                  position.coords.longitude],
                    {icon: locationMarker}
                ).addTo(this.map);
            });
        }
    }
}
