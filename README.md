```
npm install
export REACT_APP_CLIENT_ID="<YOUR_CLIENT_ID>"
export TINK_CLIENT_SECRET="<YOUR_CLIENT_SECRET>"
npm run dev
```

I worked straight from the example here https://github.com/tink-ab/tink-link-web-example/
and removed everything I didn't need.

This was a super interesting project to work on for me and admittedly quite challenging.
I ran into a lot of issues trying to navigate the api before I found the example code which solved essentially all my issues.

My initial approach was correct but I lacked the api knowledge to implement and ended up running into a lot of issues which I found challenging to debug.

I'm quite curious about one aspect of the test in particular: presenting the logo.

I went on the assumption that you found your favourite merchant by summing all transaction data and seeing where you spent the most, but I have no idea how you could dynamically present a logo based on the information within the tink link. Maybe I'm missing something.. or it's part of the problem, but I'd love to know what the solution there is.

Thanks!

:)
