
# 🦾 FastBot ROS 2 Docker Setup

This project provides a **Docker-based simulation and web interface** environment for the **FastBot** robot.  
It allows you to run Gazebo, SLAM, and a web control panel easily on any system with Docker installed.

---

## 🚀 Simulation Setup

### 1️⃣ Install Required Packages
```bash
sudo apt-get update
sudo apt-get install -y docker.io docker-compose
sudo service docker start
````

---

### 2️⃣ Configure Docker Permissions

```bash
sudo usermod -aG docker $USER
newgrp docker
```

> 💡 This allows you to run Docker commands **without using `sudo`**.

---

### 3️⃣ Enable GUI (X11) Support

```bash
sudo apt update
sudo apt install -y x11-xserver-utils
xhost +local:root
```

> 👀 This step enables GUI visualization from Docker containers, such as **Gazebo** or **RViz**.

---

### 4️⃣ Clean Old Docker Images (Optional)

```bash
docker rmi -f $(docker images -aq)
```

> 🧹 Removes all local Docker images. Use with caution!

---

### 5️⃣ Pull the Latest Images

```bash
cd /home/user/ros2_ws/src/fastbot_ros2_docker/simulation
docker-compose pull
```

---

Start webpage and connect to robot with the commands below:
```bash
webpage_address
rosbridge_address
```

---

## 🤖 Real Robot (Physical Robot)

> This section will include deployment instructions for the real robot setup.


## 🧩 Installation Steps

```bash
git clone https://github.com/grboguz21/fastbot_ros2_docker.git
cd fastbot_ros2_docker/real
docker-compose pull
docker-compose up -d

---

## 🧩 Notes

* All Docker images are hosted on Docker Hub:
  👉 [grboguz/oguzhangurbuz-cp22](https://hub.docker.com/repository/docker/grboguz/oguzhangurbuz-cp22/general)