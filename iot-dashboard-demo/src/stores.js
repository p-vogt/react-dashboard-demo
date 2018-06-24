import { observable, decorate, action, computed } from 'mobx';

class DataStore {

    eventDataRoom1 = [];
    eventDataRoom2 = [];

    temp1Data = [];
    temp2Data = [];
    getAvg = (data) => data.reduce((sum, newVal) => sum + newVal.value, 0) / data.length;

    get meanTemperature1() {
        if(this.temp1Data.length < 1) return 0;
        return this.getAvg(this.temp1Data);
    }
    get meanTemperature2() {
        if(this.temp2Data.length < 1) return 0;
        return this.getAvg(this.temp2Data);
    }
    get meanLastTemperature1() {
        if(this.temp1Data.length < 1) return 0;
        if(this.temp1Data.length < 30) return this.getAvg(this.temp1Data);
        return this.getAvg(this.temp1Data.slice(this.temp1Data.length - 30, this.temp1Data.length - 1));
    }
    get meanLastTemperature2() {
        if(this.temp2Data.length < 1) return 0;
        return this.getAvg(this.temp2Data.slice(this.temp2Data.length - 30, this.temp2Data.length - 1));
    }
    get lastTemperatureData() {
        let { temp1Data, temp2Data } = this;
        let tempData1 = [];
        let tempData2 = [];
        if (temp1Data.length >= 30) {
            tempData1 = temp1Data.slice(temp1Data.length - 30, temp1Data.length - 1);
        } else {
            tempData1 = temp1Data.slice(0, temp1Data.length);
        }
        if (temp2Data.length >= 30) {
            tempData2 = temp2Data.slice(temp2Data.length - 30, temp2Data.length - 1);
        } else {
            tempData2 = temp2Data.slice(0, temp2Data.length);
        }
        let i = 0;
        tempData1.forEach((sample) => sample.value2 = tempData2[i] ? tempData2[i++].value : undefined) 
        return tempData1;
    }

    ///////////////////////////////////////////////////////////////////////////////

    led1Status = false;
    led2Status = false;

    setLed1Status(value) {
        this.led1Status = value;
        console.log("Setting light 1 to", value)
    }
    setLed2Status(value) {
        this.led2Status = value;
        console.log("Setting light 2 to", value)
    }

    eventId = 0;
    handleEvent(type, event) {
        event.id = this.eventId++;
        switch (type) {
            case "led1-changed":
                event.stringValue = event.value ? "On" : "Off";
                this.eventDataRoom1.push(event);
                this.led1Status = event.value;
                break;
            case "led2-changed":
                event.stringValue = event.value ? "On" : "Off";
                this.eventDataRoom2.push(event);
                this.led2Status = event.value;
                break;
            case "temp1-data":
                event.stringValue = event.value
                this.eventDataRoom1.push(event);
                this.temp1Data.push(event)
                if (this.temp1Data.length >= 500) {
                    this.temp1Data = this.temp1Data.slice(this.temp1Data.length - 200, this.temp1Data.length - 1);
                }
                break;
            case "temp2-data":
                event.stringValue = event.value
                this.eventDataRoom2.push(event);
                this.temp2Data.push(event)
                if (this.temp2Data.length >= 500) {
                    this.temp2Data = this.temp2Data.slice(this.temp2Data.length - 200, this.temp2Data.length - 1);
                }
                break;

            default:
                throw new Error("Invalid event type: ", type);
        }
    }
}
decorate(DataStore, {
    temp1Data: observable,
    temp2Data: observable,
    lastTemperatureData: computed,
    meanTemperature1: computed,
    meanTemperature2: computed,
    meanLastTemperature1: computed,
    meanLastTemperature2: computed,
    ////////////////////
    led1Status: observable,
    led2Status: observable,
    eventDataRoom1: observable,
    eventDataRoom2: observable,
    handleEvent: action,
    setLed1Status: action,
    setLed2Status: action,
})

export const dataStore = new DataStore();