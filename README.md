# NS Status Card for Home Assistant (HACS)
Custom Lovelace Card for showing status of Nederlandse Spoorwegen with ticket-like UI.

It is working however there is not an indication yet when the train is cancelled. It only shows delay and platform.

### Nederlandse Spoorwegen Sensor
You first have to install the desired sensor(s) from this integration:
https://www.home-assistant.io/integrations/nederlandse_spoorwegen/

### Install NS Card
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
