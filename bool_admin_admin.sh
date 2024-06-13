#!/bin/env bash
ROOT_PATH=/www/webhook/crmchat/crmchat_admin
WEB_PATH=$ROOT_PATH/web

cd $ROOT_PATH

git checkout master

git fetch --all

git reset --hard origin/master

git pull

git branch

yarn

yarn build

if [ ! -e $WEB_PATH ] ; then
    mkdir $WEB_PATH
fi

rm -rf $WEB_PATH/*

cp -rf $ROOT_PATH/dist/* $WEB_PATH

echo "执行完毕!"
