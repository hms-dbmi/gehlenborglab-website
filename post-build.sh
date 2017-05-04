#!/usr/bin/env bash
set -e

DIR=_site/assets/img/publications
mkdir $DIR/thumbnail || echo "Couldn't mkdir: may already exist. Continuing."
for F in $(ls $DIR/fullsize); do
    convert $DIR/fullsize/$F \
        -thumbnail 120x90 \
        $DIR/thumbnail/$F
done
