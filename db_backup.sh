#!/bin/sh
DIR=`date +%m%d%y`
DEST=/tmp/db_backups/$DIR
mkdir $DEST
mongodump -h localhost -d yuda01 -u yuda01 -p yuda01 -o $DEST
