let vueApp = new Vue({
    el: "#vueApp",
    data: {
        // 🔌 ROS bağlantı bilgileri
        ros: null,
        rosbridge_address: 'wss://i-0d80969dcecf23ab0.robotigniteacademy.com/c06f03e0-e91f-4839-97e9-24bd22da5377/rosbridge/',
        connected: false,
        menu_title: 'Connection',

        // 🕹️ Joystick verileri
        dragging: false,
        x: 0,
        y: 0,
        dragCircleStyle: {
            top: '0px',
            left: '0px',
            display: 'none',
            width: '75px',
            height: '75px',
        },
        joystick: {
            vertical: 0,
            horizontal: 0,
        },

        // ROS topic
        cmdVelTopic: null
    },

    methods: {
        // ✅ Bağlantı kur
        connect() {
            console.log("Connecting to:", this.rosbridge_address);
            this.ros = new ROSLIB.Ros({ url: this.rosbridge_address });

            this.ros.on('connection', () => {
                this.connected = true;
                console.log("✅ Connected to ROSBridge!");
                this.cmdVelTopic = new ROSLIB.Topic({
                    ros: this.ros,
                    name: '/fastbot/cmd_vel',
                    messageType: 'geometry_msgs/Twist'
                });
            });

            this.ros.on('error', (err) => {
                console.error("❌ Connection error:", err);
                this.connected = false;
            });

            this.ros.on('close', () => {
                console.warn("⚠️ Connection closed");
                this.connected = false;
            });
        },

        disconnect() {
            if (this.ros) this.ros.close();
            this.connected = false;
            console.log("🔌 Disconnected");
        },

        // 🕹️ Joystick hareketleri
        startDrag() {
            this.dragging = true;
        },

        stopDrag() {
            if (!this.dragging) return;
            this.dragging = false;
            this.dragCircleStyle.display = 'none';
            this.resetJoystickVals();
            this.publishCmdVel(0, 0); // stop
        },

        doDrag(event) {
            if (this.dragging) {
                const ref = document.getElementById('dragstartzone');
                this.x = event.offsetX;
                this.y = event.offsetY;
                this.dragCircleStyle.display = 'inline-block';
                this.dragCircleStyle.top = `${ref.offsetTop + this.y - 37}px`;
                this.dragCircleStyle.left = `${ref.offsetLeft + this.x - 37}px`;
                this.setJoystickVals();
                this.publishCmdVel(this.joystick.vertical, this.joystick.horizontal);
            }
        },

        setJoystickVals() {
            this.joystick.vertical = -1 * ((this.y / 200) - 0.5);
            this.joystick.horizontal = +1 * ((this.x / 200) - 0.5);
        },

        resetJoystickVals() {
            this.joystick.vertical = 0;
            this.joystick.horizontal = 0;
        },

        // 🚀 Publish to /cmd_vel
        publishCmdVel(vertical, horizontal) {
            if (!this.connected || !this.cmdVelTopic) return;
            const msg = new ROSLIB.Message({
                linear: { x: vertical * 0.4, y: 0, z: 0 },
                angular: { x: 0, y: 0, z: -horizontal * 1.2 },
            });
            this.cmdVelTopic.publish(msg);
            console.log(`📡 linear.x=${(vertical * 0.4).toFixed(2)}, angular.z=${(horizontal * 1.2).toFixed(2)}`);
        },
    },

    mounted() {
        window.addEventListener('mouseup', this.stopDrag);
        this.connect(); // sayfa açıldığında otomatik bağlan
    },
});
