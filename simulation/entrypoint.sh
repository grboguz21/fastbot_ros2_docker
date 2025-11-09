#!/bin/bash
set -e

# Source ROS environment
source /opt/ros/humble/setup.bash

# Start rosbridge in the background
echo "[INFO] Starting rosbridge_websocket..."
ros2 launch rosbridge_server rosbridge_websocket_launch.xml &

# Start nginx in the foreground
echo "[INFO] Starting Nginx web server..."
nginx -g 'daemon off;'
