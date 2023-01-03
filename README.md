<h1 align="center">
  <br>
  Web Mapping Project
</h1>
<h3 align="center">
  Spatial data processing analysis and apps
</h3>
<div align="center">
  <h4>
    <a href="#Context">Context</a> |
    <a href="#Live-Demo">Live Demo</a> |
    <a href="#Installation-Guide">Installation Guide</a> |
    <a href="#Technologies">Technologies</a> |
    <a href="#Deployment-Server">Deployment Server</a> |
    <a href="#Certification-and-Grading">Certification and Grading</a> |
   <a href="#Screenshots">Screenshots</a> |
    <a href="#Further-Readings">Further Readings</a> |
    <a href="#Contribution">Contribution</a>
  </h4>
</div>
<br>

## Context
This project consists of building a web application that displays the geographic information of the Ivory Coast and Tunisia with the ability to draw and insert geometric shapes on maps.
## Live Demo
As for now, you can test the application by downloading the `.apk` file from the releases.
Also, you can test the application directly from your browser at https://homeautomationcot.me/ or https://api.homeautomationcot.me/. (note that some features are mobile-specific, and not all can be tested via the web version.)
## Installation Guide
We made sure that the architecture of the repository was well organized for users to test the project locally or build on it.
If you want to run the application locally, please follow the following steps: 
- Clone the repo: `git clone https://github.com/GhaziXX/home-automation-using-cot.git`
- Install node RED on your Raspberry pi and then load the content of [flows.json](./iot/flows.JSON) into a new flow. Feel free to change the sensors and actuators pins, the MQTT broker, and the API link for getting a list of installed sensors.
- Move into the [api](./api/) directory and run `npm install` to install the required dependencies. (Please ensure that you have **node.js** installed in your machine).
- Open [env.config.js](./api/main/env.config.js) and set your settings (certificate path, MQTT broker settings, and you Mongodb link). 
- Run `npm start` to start the server locally.
- Move into the [frontend](./frontend/) directory - make sure that you have flutter installed on your machine - run `flutter pub get` Then select whether you want to run on your mobile, emulator, or web and run `flutter pub run`.
## Technologies
Multiple technologies and packages were used while developing this project, the technologies are diverse and used for backend and frontend development.
- Backend:
  - Node.js: v16.13.1
  - Express: v4.18.2
  - Cors: v2.8.5
  - Pg: v8.8.0
- Frontend
  - Vanilla js
  - Open Street Map API
  - OpenLayer
-DataBase:
  -Postgresql: v15
- Server
  - Geoserver: v2.18.2

<a href="https://github.com/GhaziXX/Home-Automation-using-CoT/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=GhaziXX/Home-Automation-using-CoT" width=100/>
</a>

