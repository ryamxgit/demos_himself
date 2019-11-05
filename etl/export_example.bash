#!/bin/bash

TMPF=`mktemp /tmp/export.XXXX`
WORKDIR="/home/workdir"
DATABASE="db_example"

DATE=`date +%Y%m%d`

psql -a -d $DATABASE &>$TMPF <<!

COPY (SELECT * FROM tbl) 
TO '$WORKDIR/result_sql_$DATE.csv' 
WITH CSV HEADER;

!

echo "Export finished"