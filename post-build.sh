#!/usr/bin/env bash
set -e

DIR=_site/assets/img/publications
mkdir $DIR/thumbnail || echo "Couldn't mkdir: may already exist. Continuing."
for F in $(ls $DIR/fullsize); do
    # Match CSS width:
    convert $DIR/fullsize/$F \
        -gravity center \
        -thumbnail 220x165 \
        -extent 220x165 \
        $DIR/thumbnail/$F
done

DIR=_site/assets/img/members
mkdir $DIR/thumbnail || echo "Couldn't mkdir: may already exist. Continuing."
for F in $(ls $DIR/fullsize); do
    # Match CSS width:
    convert $DIR/fullsize/$F \
        -geometry 250x \
        $DIR/thumbnail/$F
done
