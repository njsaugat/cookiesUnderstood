Officially start learning cookies:

Cookies are small pieces of infos that can be saved in browser.
Also they are automatically sent to the server after every request.
So no need to like extract data and send data like we do in local storage
So kinda cookies automated the stuff that we had to do manually

Mainly cookies are used for authorization/ session management, user preference,
Cookies are the stuff that keeps logged in while i visit github.com
Most cookies are used for ad tracking as well.

So for auth I could take 2 approach
Cookie
JWT

Since cookie’s concept is widespread I preferred to use cookie approach
(downside: is when i have to scale, statefulness might be an issue)
But not of any concern at present

So basically cookie can be created in the browser as well as server.
If cookies are used and created in browser/frontend, then they become similar to localStorage.

But the thing here is we want the cookie to be set by the server.
So we have to create the cookie from the backend.

Initially from server if we want to send the cookie, then that will be sent as the response.
Setting cookie by the server is done as the part of the response

Way to set the cookie is as above

This cookie will be set inside the cookie section

So when we enter the site, when we click that “ACCEPT all COOKIES” we are performing a event.
Prolly after that event our info gets stored within the browser and prolly gets sent to the server.

So what did hussein do?
First he showed the above approach

document.cookie=”saugat=711”

Doing this would set the cookie in browser after hitting enter.

Then he created a index.html
There he added the button “create a cookie”

On clicking that button, a cookie would be set like
document.cookie=”saugat=327”

So this cookie would be set once the user clicked on the create a cookie button

So then what he did was like instead of using live server, he created a simple node js server.

From port 8080 he served the index file.

Then also while serving from the server, he automatically served the cookie by the following code:

This would help set the cookie. “setfromserver=1”

Automatically it was sent from the server.

So we could like set the cookie from the server as well.

Localstorage use garda data flow:
User logins
Email & password sent for Validation
Then db is queried for the user’s id
That id is sent back a response

Then using the Axios.post().then(res),
From res we would extract the response.
From that response we extract the data
Then using useEffect we set that data to localstorage.
Also to get item from localstorage we have to do the same hassle

So the cookie idea really helped in this approach

The cookie approach:
User logins
Email & password sent for Validation
Then after they are validated a session id is created
Then that session id is sent in a cookie easily to browser.
From here on every request to server will be sent with the cookie.

TLDR:
Cookie can be set from browser as well as server
Browser cookie can be set following an event or sth
Server cookie sent after login or sth
No matter where the cookie is created from either frontend or backend, once we make any request the entire cookie gets sent to the server.
Cookies are sent via the response header.

The response header had the set-cookie field that instructed the browser to set the cookie

One thing i hadn’t thought recently
All domains have their own cookies, and localstorage and session storage
For eg:
Github’s cookie and localstorage is different from Docs’ cookie and localStorage

Cookies created for specific domain can’t be share like

Cookies in https://www.example.com and https://www.auth.example.com are not same

This is because the domain is different

But to like make it available on subdomains of example.com we can do the following:

Whatever cookie present there send it under it all to the server here(Bisheswor Yadav)

So the thing with cookie is interesting
In the above hussein’s app:

If we clear the cookies and make a request then
Back from the server in the response header set-cookie is sent to us
(since initially there was no cookie, request wont contain any cookie)
So that sets the cookie in the browser.
If we refresh the page again then,
Since the cookie is already set, then in the request header automatically the cookie is included
TLDR:
1st request no cookie
Get response-> set cookie
From this point cookie sent with every request

Cookies can also be set within the paths
So every path’s cookie will be different

So setting cookies on differen path will allow the cookies to be different.
So like /login ma create gareko cookies can be different from /user

expires/max-age attribute on cookie help make cookie permanent instead of them being temporary

Cookies are sent everytime with the request
So once I login to prabhu bank
All the login info and sessionId will be stored within the cookie
That cookie will be sent everytime i make a request
This is the reason like just visiting ‘prabhubank.com’ will log us in
Because with our request is sent the cookie that has our login info

CSRF

Now imagine I am in piratebay
And there it asks me to click certain link like
CLICK LINK
Behind the scenes the link redirects to suppose:
https://prabhubank.com/transfer?toAccountId=888888&money=1000000
So now since we have already logged into prabhu bank before
Cookie has all the required sessionId
Immediately with this request, our cookie gets sent
The cookie is valid
As a result we will get validated
Once validated then that request of money transfer can be easily fulfilled

This is the CSRF attack
TLDR:
Click on suspicious link
That link’s domain site was previously logged in
Since login details in cookies, so we are easily validated
From there whatever the link directs that request will be fulfilled
Cross site Resource Forgery

If we are logged into a certain site, then if we make another request to that site from anywhere the cookie will be sent in the request

Doing this could avoid csrf to certain extent
Ie the cookie won’t be sent from other external site

Since HTTP is stateless, cookies help make http stateful by storing the relevant infos.

SO cookies are also called HTTP State Management Mechanism

In other words, ‘session’ means a context, which involves an interaction between the server and client. It can maintain and exchange a user’s state information.

In short, session allows server and client exchange state information within a particular period of time. It can also be terminated by the client or server.

When using express-session

We have declared the session object and passed it as a middleware

So what this does is that it initilaizes stuff for us.
The sessionId that will be created will be automatically be sent as cookie with the limitation of 1 day as set in the cookie.
Under the hood this session stuff uses

res.setHeader(‘set-cookie’,[connectSid=1rwfeiouu933432%3’])

So yes under the hood it uses this

Ways to create cookies in node js.

Without using express and directly modifying using vanilla node/ moidifying in header itself.
NOTE: all the other approaches at their core do this thing only:

Using res.cookies
Although this approach looks a bit different it is under the hood using the same approach as above ie res.setHeader.
But here we have to write less code ie the ‘set-cookie’ and stuff
The key value pair is separated which makes it easier to write
app.get('/setcookie', (req, res) => {
res.cookie(`Cookie token name`,`encrypted cookie`);
res.send('Cookie have been saved successfully');
});
