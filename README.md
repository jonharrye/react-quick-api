# `react-quick-api` 


Generate a deployed API response quickly by pasting a sample JSON response 

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
Using env variables with now.sh
`now secrets add db_pass "fooPassword!"`
`now -e NODE_ENV=production -e DB_USER=@db_user -e DB_PASS=@db_pass -e DB_URL=@db_url`

build client
`cd client && npm run build`
deploy client
`cd build && surge` _or..._ `cd build && ns`

push client build to github pages
`git push origin `git subtree split --prefix client/build master`:gh-pages --force`