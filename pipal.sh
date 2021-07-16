#!/bin/bash
cd $(dirname $0)

sh setup.sh

CPU=$(grep 'cpu ' /proc/stat | awk '{usage=($2+$4)*100/($2+$4+$5)} END {print usage}')
MEMORY=$(free | grep Mem | awk '{print $3/$2 * 100.0}')
STORAGE=$(df / | awk 'END{print $5}' | sed -e 's/[%]//g')
TEMP=$(cat /sys/class/thermal/thermal_zone*/temp | xargs -i expr {} / 1000)
TIME=$(date +"%D %T")

LOG_PATH="website/log.csv"

if [ ! -s $LOG_PATH ]; then
  echo time,cpu,memory,storage,temp >> $LOG_PATH
fi

sh clean.sh

echo $TIME,$CPU,$MEMORY,$STORAGE,$TEMP >> $LOG_PATH