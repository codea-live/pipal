INTERVAL_MINS=1
CRON_JOB="*/$INTERVAL_MINS * * * * sh $(pwd)/pipal.sh"

(crontab -l | grep -v -F "$CRON_JOB" ; echo "$CRON_JOB") | crontab -