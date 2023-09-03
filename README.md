# NS Status Card for Home Assistant (HACS)
Custom Lovelace Card for showing status of Nederlandse Spoorwegen with ticket-like UI.

It is working however there is not an indication yet when the train is cancelled. It only shows delay and platform.

### Nederlandse Spoorwegen Sensor
You first have to install the desired sensor(s) from this integration:
https://www.home-assistant.io/integrations/nederlandse_spoorwegen/

### Install NS Card

#### Using HACS
0. Make sure you have HACS installed. If not, follow instructions: https://hacs.xyz/docs/setup/download/
1. Open HACS and click on Frontend
2. Click on the three dots in the right top corner, and click on Custom repositories
3. Use `https://github.com/stijnb1234/hacs-ns-card/` as the Repository and choose Lovelace as category.
4. Install the ns-card.

#### Manual
1. Place the ns-status-card folder with its contents in the WWW/COMMUNITY folder of your home assistant. 
2. Add the folder to the dashboards/resources list. Folder path should look like: /hacsfiles/ns-status-card/ns-status-card.js
3. Refresh the browser, now you should be able to use the card.

### YAML example:
```
type: custom:ns-status-card
entity: sensor.nijmegen_amsterdam
```

### YAML example slider card (returns)
```
type: custom:swipe-card
parameters:
  effect: coverflow
  spaceBetween: 2
  slidesPerView: 1.1
cards:
  - type: custom:ns-status-card
    entity: sensor.goffert_rosmalen
  - type: custom:ns-status-card
    entity: sensor.rosmalen_goffert
```

### Images:

Single card example:

<img width="495" alt="ns_card_image_1" src="https://user-images.githubusercontent.com/42770753/211256045-165b1747-db12-4968-b831-eb5d35b4caf7.png">

Slider example:

<img width="501" alt="ns_card_image_2" src="https://user-images.githubusercontent.com/42770753/211256097-f04475c7-77bb-47f3-b62a-cdac1e2826de.png">

