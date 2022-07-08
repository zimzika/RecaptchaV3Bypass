# Bypass Recaptcha v3

### Project to solve reCaptcha v3 only using request.

## ⚠️ Warning
- Only works for recaptcha v3 may not work on some sites.

## How to use:

- Install package using npm:
`npm install recaptchav3bypass`
- Get website anchor url example:
`https://www.google.com/recaptcha/api2/anchor?ar=1&k=6LezO6kUAAAAAGAYpazfxwlPpBVljyiMIhj0kLA7&co=aHR0cHM6Ly93d3cuY2FzYWRhYmViaWRhLmNvbS5icjo0NDM.&hl=pt-BR&v=4rwLQsl5N_ccppoTAwwwMrEN&size=invisible&cb=vvcfcwwb7aum`
- Using package:
```js
const reCaptchaV3 = require('recaptchav3bypass');

const anchor_url = "https://www.google.com/recaptcha/api2/anchor?ar=1&k=6LezO6kUAAAAAGAYpazfxwlPpBVljyiMIhj0kLA7&co=aHR0cHM6Ly93d3cuY2FzYWRhYmViaWRhLmNvbS5icjo0NDM.&hl=pt-BR&v=4rwLQsl5N_ccppoTAwwwMrEN&size=invisible&cb=vvcfcwwb7aum";

new reCaptchaV3(anchor_url).get_recaptcha_token().then(response => {
	console.log(`Captcha response: ${response}`);
});
```

## Credits:
- https://github.com/xHossein/PyPasser - Python version