# Travel Warning browser extension

Alerts you when booking travel to locations with dangerously descriminatory LGBTQ+ laws like Uzbekistan, Uganda, Russia, and Florida.

You can then decide not to travel to, or spend money in, these regions. Instead: choose something fabulous.

[LGBTQTravelAlert.org](https://lgbtqtravelalert.org/)

<img width="1395" alt="Screenshot 2023-08-08 at 11 01 12 PM" src="https://github.com/thec4aa/lgbtq-travel-warning/assets/67271/7f0abd7a-1c34-40d8-97e6-84c687188432">


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
