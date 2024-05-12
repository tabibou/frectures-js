## Breached passwords

- `password` is a very commonly used password
- Its SHA-1 hash is `5BAA6` `1E4C9B93F3F0682250B6CF8331B7EE68FD8`
- https://api.pwnedpasswords.com/range/5BAA6 returns lots of lines, including:
  - `1E4C9B93F3F0682250B6CF8331B7EE68FD8:10382543`
  - meaning `10382543` breached accounts use `password`

### MVP

- Write a simple web application:
  - User enters password in a text field
  - User clicks button
  - Display how many breached accounts use that password
- The file `index.html` contains scaffolding to get you started
  - including example call of supplied `sha1hex` function
- Spoilers:
  - [input type](https://www.w3schools.com/tags/att_input_type.asp), [onclick](https://www.w3schools.com/jsref/event_onclick.asp)
  - [getElementById](https://www.w3schools.com/jsref/met_document_getelementbyid.asp), [value](https://www.w3schools.com/tags/att_input_value.asp)
  - [substr](https://www.w3schools.com/jsref/jsref_substr.asp) / [substring](https://www.w3schools.com/jsref/jsref_substring.asp)
  - [fetch](https://www.w3schools.com/js/js_api_fetch.asp)
    - Note: `fetch` returns a `Promise<Response>`
    - You must `await` that `Promise<Response>` to get the `Response`
    - `await` only works in `async function`s!
    - `Response` has `.text()` and `.json()` methods, which also return promises
  - [split](https://www.w3schools.com/jsref/jsref_split.asp)
  - [div](https://www.w3schools.com/tags/tag_div.asp), [innerText](https://www.w3schools.com/jsref/prop_node_innertext.asp)

### History

- Instead of showing only the result for the most recently entered password, can you show a complete history?
- Sort the history
- What happens (should happen) if the user enters the same passwort multiple times?

### Usability

- Instead of clicking the button, pressing Enter in the text field should also work
- Automatically fire a request 2 seconds after every change to the text field
  - [setTimeout](https://www.w3schools.com/jsref/met_win_settimeout.asp)
- If the user types another symbol within the 2 seconds, cancel the prior request
  - [clearTimeout](https://www.w3schools.com/jsref/met_win_cleartimeout.asp)

### Quality

- How would you measure the intrinsic quality of a password?
  - password length
  - used alphabet
  - entropy?
  - ...
- Measure and display the password quality every time the text field changes
