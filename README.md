## 1. URL Shortener

* database
	* Firebase - Clound Firestore
    * I use atomic counter for create hash id to short url

* back-end
	* Firebase - Cloud Functions + Node Express Build Routes and API
    * **/:encodedid** - GET: Redirects to the Long URL
	* **/api/shorten** - POST: Returns Short URL

* front-end
	* Single HTML PAGE + Bootstrap

* deployment
	* Firebase CLI

* local test -- google cloud function they need upgrade billing plan to use it, so I run local.
```
const config = {
    webhost: 'http://localhost:5001/url-shortener-3d8fa/us-central1/shortener/'
}
```
firebase serve --only functions,hosting


## 2. Up To You
exam2.js
