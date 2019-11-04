#!/bin/bash

# Some definitions
rm -f /tmp/etl_load.*
TMPF=`mktemp /tmp/etl_load.XXXX`
LOGFILE="/home/etl/log/output_etl.log"
WORKDIR="/home/workdir"
DATABASE="db_example"

# Register some texts as log of operation
function trace {
   echo $1 > $TMPF
   log
}

# Make permanent any trace of operation
function log {
   [ ! -f $TMPF ] && return
   TLOG=`date "+%Y-%m-%d %H:%M:%S"`
   awk '{printf "%s [%s] %s\n",t,p,$0}' t="$TLOG" p="$0" $TMPF >> $LOGFILE
   rm -f $TMPF
}

# Call this with a "out" in 3rd param place, make error go out from bash
function check_error {
log
if [ $1 != 0 ]
then
   echo "Error $1 $2"
   mail -s "Error $1 $2 en $0" root@localhost < $TMPF
   [ ! -z $3 ] && if [ $3 == "out" ]
   then
     exit 1
   fi
fi

}

#
# Section "EXPORT"
#

IFACE0=FILE_EXP1.txt
IFACE1=FILE_EXP2.txt

# Getting export files from some systems
# Call any copy or UNLOAD or EXPORT


# Validate files
[ -f ${IFACE0} ] || check_error 1 "Doesn't exist ${IFACE0} export file" "out"
[ -f ${IFACE1} ] || check_error 1 "Doesn't exist ${IFACE1} export file" "out"

#
# Section "TRANSFORM"
#
trace "Editing some portions on every file"
sed -i "s/|$//g" $IFACE0 
sed -i "s/|$//g" $IFACE1
sed -i "s/|A|/|1|/g" $IFACE1
sed -i "s/|I|/|0|/g" $IFACE1
sed -i "s/S$/1/g" $IFACE1
sed -i "s/N$/0/g" $IFACE1


#
# Section "LOAD"
#


# Execute load on postgres
psql -a -d $DATABASE &>$TMPF <<!
\set ON_ERROR_STOP 1
BEGIN;
  TRUNCATE TABLE load_table1 CASCADE;
  TRUNCATE TABLE load_table2 CASCADE;
  

  COPY  load_table1(field1, field2, field3)
   FROM '${WORKDIR}/$IFACE0'
   WITH CSV;

  COPY  load_table2(field1, field2, field3)
   FROM '${WORKDIR}/$IFACE1'
   WITH CSV;

COMMIT;
!
check_error $? "Load export files" "out"



# Save historical files
DATE=`date +%Y%m%d`
cat $IFACE0 | gzip -9 > ${IFACE0}-${DATE}.gz
cat $IFACE1 | gzip -9 > ${IFACE1}-${DATE}.gz

rm -f $IFACE0 $IFACE1

# Delete historical files with more than 1 month
find $SPOOL -name "*.gz" -ctime +30 -exec rm -f {} \;

trace "End of ETL operation"
