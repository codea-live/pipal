#!/bin/bash

# https://stackoverflow.com/questions/878600/how-to-create-a-cron-job-using-bash-automatically-without-the-interactive-editor

CRON_JOB="*/5 * * * * sh $(pwd)/pipal.sh"
(crontab -l | grep -Fv "pipal.sh" ; echo "$CRON_JOB") | crontab -