# Travel Warning browser extension

Alerts you when booking travel to locations with dangerously backwards LGBTQ+ laws like Uzbekistan, Uganda, Russia, and Florida.

<img width="1069" alt="CleanShot 2023-08-09 at 01 02 17@2x" src="https://github.com/thec4aa/lgbtq-travel-warning/assets/1903/e36d3f78-7e63-419c-8596-06fc73e01a75">


## Development

We welcome pull requests!

Developed against Brave but should work fine in Chrome and maybe even Edge or Arc.

**To install, checkout this code and load the unpacked extension** in `brave://extensions` or `chrome://extensions`

<img width="557" alt="CleanShot 2023-08-09 at 01 04 52@2x" src="https://github.com/thec4aa/lgbtq-travel-warning/assets/1903/a0d4115e-894e-4c74-9f48-03b641770ff0">

**To automatically reload the extension when you make code changes (on a Mac):**

(kind of buggy, ymmv)

- install [Extensions Reloader](https://chrome.google.com/webstore/detail/extensions-reloader/fimgfedafeadlieiabdeeaodndnlbhid) extension
- turn on "automatically reload current tab" in Extensions Reloader settings
- install nodejs if you don't have it
- run the following in a terminal:

```sh
npx watch -p \"**/*.js\" -c \"open -a '/Applications/Brave Browser.app' 'http://reload.extensions'\"
```

## License

Made freely available under an MIT license
