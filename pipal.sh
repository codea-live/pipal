#!/bin/bash
cd $(dirname $0)
sh setup.sh

CPU="3"
MEMORY="42"
STORAGE="8.6"
TEMP="43.5"
TIME=$(date +"%D %T")

LOG_PATH="website/log.csv"

if [ ! -s $LOG_PATH ]; then
  echo time,cpu,memory,storage,temp >> $LOG_PATH
fi

echo $TIME,$CPU,$MEMORY,$STORAGE,$TEMP >> $LOG_PATH