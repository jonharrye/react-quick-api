# `react-quick-api` 


Generate and deploy an API quickly by pasting a sample JSON response 

## [DEMO](http://craven-taste.surge.sh/)



## Running

```
git clone https://github.com/jforaker/react-quick-api.git
cd react-quick-api
npm i

cd client
npm i

cd ..
npm run dev

(another tab) cd client
npm start
```



Notes:

_Using env variables with now.sh_

`now secrets add db_pass "fooPassword!"`

`now -e NODE_ENV=production -e DB_USER=@db_user -e DB_PASS=@db_pass -e DB_URL=@db_url`

_build client_

`cd client && npm run build`

_deploy client_

`cd build && surge` _or..._ `cd build && ns`

_push client build to github pages_

`git push origin `git subtree split --prefix client/build master`:gh-pages --force`