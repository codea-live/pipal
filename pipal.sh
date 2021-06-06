#!/bin/bash

while IFS=, read -r name code; do
  echo "$name"
done < $DATESTAMP.csv