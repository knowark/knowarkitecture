#!/bin/bash

CONTAINER=tutorark

lxc launch ubuntu:20.04 $CONTAINER -p base

sleep 3

lxc exec $CONTAINER -- /bin/bash -c "curl -fsSL \
    https://deb.nodesource.com/setup_16.x | sudo -E bash -"

lxc exec $CONTAINER -- apt update -y

lxc exec $CONTAINER -- apt install -y nodejs
