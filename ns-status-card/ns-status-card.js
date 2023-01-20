class NsStatusCard extends HTMLElement {
    // Whenever the state changes, a new `hass` object is set. Use this to
    // update your content.
    set hass(hass) {
        // Initialize the content if it's not there yet.
        if (!this.content) {
            this.innerHTML = `
          <ha-card class="ns_card">

            <div class="card-content"></div>
          </ha-card>
          <style>
          .ns_card {
            background-color: #FEC919;
            background-image: url('/local/community/ns-status-card/ns_card_bg.jpg');
            background-size: cover;
            color: #000;
          }
          .ns_card_departure_platform {
            position: absolute;
            right: 10px;
            top: 10px;
          }
          .ns_card_departure_platform span {
            width: 100%;
            font-size: 10px;
            display: block;
          }
          .ns_card_departure_platform b {
            font-size: 32px;
            font-weight: 800;
          }
          .ns_card_departure_time span {
            width: 100%;
            font-size: 10px;
            display: block;
            line-height: 1.2;
          }
          .ns_card_departure_time b {
            font-size: 18px;
            font-weight: 700;
          }
          .ns_card_departure_time b i {
            color: red;
            font-style: normal;
            font-weight: 800;
          }

          .ns_card_route {
            margin-top: 4px;
          }

          .ns_card_route span {
            width: 100%;
            font-size: 10px;
            display: block;
            line-height: 1.2;
          }
          .ns_card_route b {
            font-size: 18px;
            font-weight: 700;
            display:block;
          }

          .ns_card_updated {
            position: absolute;
            bottom: 12px;
            font-size: 12px;
          }
          </style>
        `;
            this.content = this.querySelector('div');
        }

        // debug
        // console.log(hass);

        const translations = {
            "en": {
                "depart": "Departs",
                "platform": "Platform",
                "route": "Route",
                "next": "Next",
                "updated": "ago",
                "minutes": "min",
                "seconds": "sec"
            },
            "nl": {
                "depart": "Geldig op",
                "platform": "Perron",
                "route": "Enkele Reis",
                "next": "Volgende",
                "updated": "geleden",
                "minutes": "minuten",
                "seconds": "seconden"
            },
            "ru": {
                "depart": "Отправляется",
                "platform": "Платформа",
                "route": "Маршрут",
                "next": "Следующий",
                "updated": "назад",
                "minutes": "минут",
                "seconds": "секунд"
            }
        }

        let translation = translations["en"]
        const lang = hass.language
        if (translations.hasOwnProperty(lang)) {
            translation = translations[lang]
        }

        const entityId = this.config.entity;
        const state = hass.states[entityId];
        const stateStr = state ? state.state : 'unavailable';
        const attributes = state.attributes;

        let delay = '';

        if (attributes.departure_delay == true) {
            var startTime = new Date('2013/10/09 ' + attributes.departure_time_planned);
            var startTime = new Date('2013/10/09 ' + attributes.departure_time_planned);
            var startTime = new Date('2013/10/09 ' + attributes.departure_time_planned);
            var endTime = new Date('2013/10/09 ' + attributes.departure_time_actual);
            var difference = endTime.getTime() - startTime.getTime(); // This will give difference in milliseconds
            var delayTime = Math.round(difference / 60000);
            delay = '+' + delayTime;
        }

        let arrivalLoc = attributes.route[1];
        if (attributes.route[2]) {
            arrivalLoc = attributes.route[2];
        }

        let timeAgo = timeSince(state.last_updated, translation);

        let platform = '';
        if (attributes.departure_platform_actual) {
            platform = attributes.departure_platform_actual;
        }

        let next = '';
        if (attributes.next) {
            next = attributes.next
        }

        this.content.innerHTML = `
        <div class="ns_card_departure_time">
          <span>${translation.depart}</span>
          <b>${attributes.departure_time_planned} <i>${delay}</i></b>
        </div>

        <div class="ns_card_departure_platform">
          <span>${translation.platform}</span>
          <b>${platform}</b>
        </div>

        <div class="ns_card_route">
          <span>${translation.route}</span>
          <b>${attributes.route[0]}</b>
          <b>${arrivalLoc}</b>
        </div>

        <div class="ns_card_route">
          <span>${translation.next} - ${next}</span>
        </div>

        <div class="ns_card_updated">
          <span>${timeAgo} ${translation.updated}</span>
        </div>
        <br><br>

      `;
    }

    // The user supplied configuration. Throw an exception and Home Assistant
    // will render an error card.
    setConfig(config) {
        if (!config.entity) {
            throw new Error('You need to define an entity');
        }
        this.config = config;
    }


    // The height of your card. Home Assistant uses this to automatically
    // distribute all cards over the available columns.
    getCardSize() {
        return 3;
    }
}

customElements.define('ns-status-card', NsStatusCard);


function diff_minutes(dt2, dt1) {

    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));

}

function timeSince(timeString, translation) {
    // Parse the timeString into a Date object
    const time = new Date(timeString);

    // Calculate the difference between the time and the current time
    const diff = new Date() - time;

    // Convert the difference to minutes
    const minutes = Math.floor(diff / 1000 / 60);

    // Return the number of minutes if it's at least 1 minute, otherwise return the number of seconds
    return minutes >= 1 ? `${minutes} ${translation.minutes}` : `${Math.floor(diff / 1000)} ${translation.seconds}`;
}
