# Low-cost Home Automation with Voice Control

## Demo Video

[![IMAGE ALT TEXT HERE](http://img.youtube.com/vi/RfKZgTmy8q4/0.jpg)](http://www.youtube.com/watch?v=RfKZgTmy8q4)

## Software Setup

1. Make sure you have node.js installed on the computer you wish to run this on.
2. Create a `config.json` file in the root directory of this project following `config.json.example` as a guide.
3. You only need to get API keys for the functionality you wish to add. Note that all voice recognition requires a wit.ai server access token.
4. Fork my [wit.ai home automation project](https://wit.ai/michael-gillett/Dorm%20Automation) to get all of the intents used in this project.
5. Open up command line and navigate to this projects directory.
6. Run `npm install`.
7. Start up the server by running `npm start`.
8. Navigate to `http://<ip of your device>:3000` in your browser and enjoy!

## Hardware Setup
More information about the hardware setup including schematics for the various circuits can be found on this projects [hackster.io page](https://www.hackster.io/michael-gillett/dorm-automation)

## Example Commands
- Shut off the lights
- What will the weather be like tomorrow?
- What is the temperature?
- What is 50 pounds in kilograms?
- Lock the door
- Make the lights green

## How to add more functionality

All you need to do is create a new intent in the wit.ai web interface. Then you need to create a new javascript file with the same name as the intent you just created and put it inside `/lib/intents`. This file will supply that code that should be executed for your new intent. You can look at any of the other files in there for guidance.