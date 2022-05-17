#!/bin/bash

CONTAINER=tutorark

lxc launch ubuntu:20.04 $CONTAINER -p base

echo "Installing packages"
lxc exec $CONTAINER -- cloud-init status --wait