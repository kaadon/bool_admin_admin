#!/bin/env bash
ROOT_PATH=/www/webhook/dev_bool_admin/bool_admin_admin/
WEB_PATH=/web

cd $ROOT_PATH

git checkout master

git fetch --all 

git reset --hard origin/master 

git pull 

git branch

yarn 

yarn build:prod

if [ ! -e $ROOT_PATH/$WEB_PATH ] ; then
    mkdir $ROOT_PATH/$WEB_PATH
fi

rm -rf $ROOT_PATH/$WEB_PATH/* 

cp -rf $ROOT_PATH/dist/* $ROOT_PATH/$WEB_PATH

echo "执行完毕!"