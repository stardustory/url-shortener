## 1. ระบบ URL Shortener

* database
Firebase - Clound Firestore
    * ใช้วิธีนับ atomic counter แล้ว hash id เพื่อสร้าง short url ให้กับ long url

* back-end
Firebase - Cloud Functions + Node Express Build Routes and API
    * **/:encodedid** - GET: Redirects to the Long URL
	* **/api/shorten** - POST: Returns Short URL

* front-end
Single HTML PAGE

* deployment
Firebase CLI

* local test
```
const config = {
    webhost: 'http://localhost:5001/url-shortener-3d8fa/us-central1/shortener/'
}
```
firebase serve --only functions,hosting


## 2. Up To You
exam2.js