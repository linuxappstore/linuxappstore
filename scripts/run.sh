#!/bin/bash
update_apps() {
    python3 appimageupdater.py
    python3 flatpakupdater.py
    python3 snapupdater.py
}

# 3600 = 1 hour
start_time=3600
current_time=start_time

update_apps

while true
do
((current_time--))
if [ $current_time -lt 1 ]
then
    echo "updating apps"
    update_apps
    current_time=$start_time
else
    echo "Restarting in $current_time seconds"
fi

# 1 second
sleep 1;
done