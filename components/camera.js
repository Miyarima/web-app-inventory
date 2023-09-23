import { UploadClient } from "../uploadcare/index.browser.min.js";
import orderModel from "../models/orders.js";

export default class CameraComponent extends HTMLElement {
    constructor() {
        super();

        this.photoData = "";
        this.front = false;
        this.stream = null;
        this.order = "";
        this.imageURL = "";
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

    startup() {
        let streaming = false;
        const width = 320;
        let height = 0;

        let video = document.getElementById("video");
        let canvas = document.getElementById("canvas");
        let startbutton = document.getElementById("startbutton");
        let sendbutton = document.getElementById("sendbutton");
        let flipbutton = document.getElementById("flipbutton");

        video.setAttribute("class", "center-cam");

        this.capture(video);

        video.addEventListener("canplay", () => {
            if (!streaming) {
                height = video.videoHeight / (video.videoWidth / width);

                if (isNaN(height)) {
                    height = width / (4/3);
                }

                video.setAttribute("width", width);
                video.setAttribute("height", height);
                canvas.setAttribute("width", width);
                canvas.setAttribute("height", height);
                streaming = true;
            }
        }, false);

        startbutton.addEventListener("click", (ev) => {
            ev.preventDefault();
            this.takepicture(canvas, video, width, height);
        }, false);

        sendbutton.addEventListener("click", (ev) => {
            ev.preventDefault();
            this.sendpicture();

            setTimeout(function() {
                location.hash = "orders";
            }, 1000);
        }, false);

        flipbutton.addEventListener("click", (ev) => {
            ev.preventDefault();
            this.front = !this.front;
            if (this.stream === null) {return;}
            this.stream.getTracks().forEach(t => {
                t.stop();
            });
            this.capture(video);
        }, false);

        this.clearphoto(canvas);
    }

    capture(video) {
        navigator.mediaDevices
            .getUserMedia({video: {facingMode: this.front ? "user" : "environment"},  audio: false})
            .then(function (stream) {
                this.stream = stream;
                video.srcObject = stream;
                video.play();
            }.bind(this))
            .catch((err) => {
                console.log(`An error occurred: " + ${err}`);
            });
    }

    takepicture(canvas, video, width, height) {
        const context = canvas.getContext("2d");

        if (width && height) {
            canvas.width = width;
            canvas.height = height;
            context.drawImage(video, 0, 0, width, height);
            this.photoData = canvas.toDataURL("image/png");
        } else {
            this.clearphoto(canvas);
        }
    }

    clearphoto(canvas) {
        const context = canvas.getContext("2d");

        context.fillStyle = "#AAA";
        context.fillRect(0, 0, canvas.width, canvas.height);
        this.photoData = canvas.toDataURL("image/png");
    }

    async sendpicture() {
        const blob = await (await fetch(this.photoData)).blob();
        const client = new UploadClient({ publicKey: '3f87a781c6346f090bf7' });
        const fileInfo = await client.uploadFile(blob);
        const cdnUrl = fileInfo.cdnUrl;

        this.imageURL = cdnUrl;
        await this.updateOrder();
    }

    async getOrder() {
        let orders = await orderModel.getOrders();

        orders.forEach(order => {
            if (order.id === parseInt(this.order)) {
                this.info = {
                    id: order.id,
                    name: order.name
                };
            }
        });
    }

    async updateOrder() {
        await this.getOrder();
        let orderUpdate = {
            id: this.info.id,
            name: this.info.name,
            status_id: 400,
            image_url: this.imageURL
        };

        orderModel.updateOrder(orderUpdate);
    }

    connectedCallback() {
        this.innerHTML = `
        <div class="camera">
            <div class="camera-video">
                <video id="video">Video stream not available.</video>
            </div>
            <div class="camera-buttons">
                <button class="cam-btn" id="startbutton">Ta Bild</button>
                <button class="cam-btn" id="sendbutton">Skicka Bild</button>
                <button class="cam-btn" id="flipbutton">Byt Kamera</button>
            </div>
            <div class="camera-video">
                <canvas id="canvas"></canvas>
            </div>
        </div>
        `;

        window.addEventListener("load", () => {
            this.startup();
        }, false);
    }
}
