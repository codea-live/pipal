#!/bin/bash
cd $(dirname $0)

INTERVAL_MINS=1
LOG_JOB="*/$INTERVAL_MINS * * * * sh $(pwd)/pipal.sh"
START_JOB="@reboot sh $(pwd)/serve.sh"

(crontab -l | grep -Fv "$LOG_JOB" ; echo "$LOG_JOB") | crontab -
(crontab -l | grep -Fv "$START_JOB" ; echo "$START_JOB") | crontab -