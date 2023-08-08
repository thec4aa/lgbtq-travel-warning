# travel warning

Warns when you should not travel to particular places

TODO image here

## development

I'm using Brave but this should work fine in Chrome, and maybe even Edge

for automatic reloading during extension development (on a Mac):

- install [Extensions Reloader](https://chrome.google.com/webstore/detail/extensions-reloader/fimgfedafeadlieiabdeeaodndnlbhid) extension
- install nodejs if you don't have it
- run the following in a console:

```sh
npx watch -p \"**/*.js\" -c \"open -a '/Applications/Brave Browser.app' 'http://reload.extensions'\"
```

You may also need to turn on "automatically reload current tab" in Extensions Reloader settings


