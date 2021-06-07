#!/bin/bash

INTERVAL_MINS=1

CRON_JOB="*/$INTERVAL_MINS * * * * sh $(pwd)/pipal.sh"
(crontab -l | grep -Fv "pipal.sh" ; echo "$CRON_JOB") | crontab -