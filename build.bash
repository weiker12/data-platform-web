#!/bin/bash
echo $1
if [ "$1" = "pro" ];then
env=master
else
env=dev
fi
umi build
mkdir pro
cd pro
git clone ssh://git@gitlab.pnlyy.com:5994/web/aiArtsSystem-static.git -b $env
cd aiArtsSystem-static
rm -r -f ./dist
cp -av ../../dist ./
git add .
git commit -m 'build'
git push origin $env
cd ../../
rm -r -f ./pro