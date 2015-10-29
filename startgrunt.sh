nohup grunt serve:dist &> server.log &
PID=$!
echo $PID > pid.txt
