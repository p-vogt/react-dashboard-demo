import { observable, decorate, action, computed } from 'mobx';
import { MICROSERVICE_URL } from './constants'

const NUMBER_OF_LAST_VALUES = 30;

class AppDataStore {
    pageTitle = "";
    setPageTitle(name) {
        this.pageTitle = name;
    }
}
decorate(AppDataStore, {
    pageTitle: observable,
    setPageTitle: action
})

class DataStore {
    // All events of room 1/2
    eventsRoom1 = [];
    eventsRoom2 = [];

    humidity = "0";
    brightness = "0";
    // temperature data of room 1/2
    temp1Data = [];
    temp2Data = [];
    getAvg = (data) => data.reduce((sum, newVal) => sum + newVal.value, 0) / data.length;

    get meanTemperature1() {
        if (this.temp1Data.length < 1) return 0;
        return this.getAvg(this.temp1Data);
    }
    get meanTemperature2() {
        if (this.temp2Data.length < 1) return 0;
        return this.getAvg(this.temp2Data);
    }
    get meanLastTemperature1() {
        if (this.temp1Data.length < 1) return 0;
        if (this.temp1Data.length < NUMBER_OF_LAST_VALUES) return this.getAvg(this.temp1Data);
        return this.getAvg(this.temp1Data.slice(this.temp1Data.length - NUMBER_OF_LAST_VALUES, this.temp1Data.length - 1));
    }
    get meanLastTemperature2() {
        if (this.temp2Data.length < 1) return 0;
        return this.getAvg(this.temp2Data.slice(this.temp2Data.length - NUMBER_OF_LAST_VALUES, this.temp2Data.length - 1));
    }
    get lastTemperatureData() {
        let { temp1Data, temp2Data } = this;
        let tempData1 = [];
        let tempData2 = [];
        if (temp1Data.length >= NUMBER_OF_LAST_VALUES) {
            tempData1 = temp1Data.slice(temp1Data.length - NUMBER_OF_LAST_VALUES, temp1Data.length - 1);
        } else {
            tempData1 = temp1Data.slice(0, temp1Data.length);
        }
        if (temp2Data.length >= NUMBER_OF_LAST_VALUES) {
            tempData2 = temp2Data.slice(temp2Data.length - NUMBER_OF_LAST_VALUES, temp2Data.length - 1);
        } else {
            tempData2 = temp2Data.slice(0, temp2Data.length);
        }
        let i = 0;
        tempData1.forEach((sample) => sample.value2 = tempData2[i] ? tempData2[i++].value : undefined)
        return tempData1;
    }

    led1Status = false;
    led2Status = false;

    setLed1Status(value) {
        this.led1Status = value;
        fetch(MICROSERVICE_URL + "/led1",
            {
                method: 'post',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ value })
            })
            .then(response => response.json())
            .then(json => {
                console.log(json);
            })
            .catch(error => {
                console.error(error);
            })

    }
    setLed2Status(value) {
        console.log(this.led2Status)
        this.led2Status = value;
        fetch(MICROSERVICE_URL + "/led2",
            {
                method: 'post',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ value })
            })
            .then(response => response.json())
            .then(json => {
                console.log(json);
            })
            .catch(error => {
                console.log(error);
            })
    }
    setBrightness(value) {
        this.brightness = value;
    }
    setHumidity(value) {
        this.humidity = value;
    }
    eventId = 0;
    handleEvent(type, event) {
        if (!event) {
            console.error("handleEvent: received null as event!");
            return;
        }
        event.id = this.eventId++;
        switch (type) {
            case "led1-changed":
                event.stringValue = event.value ? "On" : "Off";
                this.eventsRoom1.push(event);
                this.led1Status = event.value;
                break;
            case "led2-changed":
                event.stringValue = event.value ? "On" : "Off";
                this.eventsRoom2.push(event);
                this.led2Status = event.value;
                break;
            case "temp1-data":
                event.stringValue = event.value
                this.temp1Data.push(event)
                if (this.temp1Data.length >= 500) {
                    this.temp1Data = this.temp1Data.slice(this.temp1Data.length - 200, this.temp1Data.length - 1);
                }
                break;
            case "temp2-data":
                event.stringValue = event.value
                this.temp2Data.push(event)
                if (this.temp2Data.length >= 500) {
                    this.temp2Data = this.temp2Data.slice(this.temp2Data.length - 200, this.temp2Data.length - 1);
                }
                break;
            case "humidity-data":
                this.setHumidity(event.value);
                break;
            case "brightness-data":
                this.setBrightness(event.value);
                break;
            case "alarm":
                console.log("ALARM", event)
                break;
            case "led1-debug":
                console.log(event)
                break;
            default:
                throw new Error("Invalid event type: ", type);
        }
    }
}
decorate(DataStore, {
    // observables
    temp1Data: observable,
    temp2Data: observable,
    led1Status: observable,
    led2Status: observable,
    eventsRoom1: observable,
    eventsRoom2: observable,
    humidity: observable,
    brightness: observable,
    // computed
    lastTemperatureData: computed,
    meanTemperature1: computed,
    meanTemperature2: computed,
    meanLastTemperature1: computed,
    meanLastTemperature2: computed,
    // action
    handleEvent: action,
    setLed1Status: action,
    setLed2Status: action,
    setHumidity: action,
    setBrightness: action,
})

export const appDataStore = new AppDataStore();
export const dataStore = new DataStore();