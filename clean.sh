#!/bin/bash
cd $(dirname $0)

LOG_PATH="website/log.csv"
MAX_LOGS="43200"
LOG_COUNT=$(cat $LOG_PATH | wc -l | xargs -i expr {} - 1)

if [ $MAX_LOGS -lt $LOG_COUNT ]; then
  EXTRA_LOGS=$(expr $LOG_COUNT - $MAX_LOGS)
  echo "Removing $EXTRA_LOGS logs"

  sed -i "2,${EXTRA_LOGS}d" $LOG_PATH
fi