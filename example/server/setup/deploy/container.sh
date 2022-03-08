#!/bin/bash

CONTAINER=tutorark

lxc launch ubuntu:20.04 $CONTAINER

lxc config device add $CONTAINER config disk source=/home path=/mnt/home

sleep 3

lxc exec $CONTAINER -- /bin/bash -c "curl -fsSL \
    https://deb.nodesource.com/setup_16.x | sudo -E bash -"

lxc exec $CONTAINER -- apt update -y

lxc exec $CONTAINER -- apt install -y build-essential nodejs
