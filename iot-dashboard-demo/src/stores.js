import { observable, decorate, action, computed } from 'mobx';

class DataStore {
    data = [];
    addData(newData) {
        this.data.push(newData);
    }
    get temp1() {
        let id = 0;
        return this.data.map(sample => {
            return {
                id: id++,
                name: sample.name,
                timestamp: sample.timestamp,
                temp: sample.temp1
            }
        });
    }
    get chartData() {
        let data = this.data;
        if (data.length >= 30) {
            data = data.slice(data.length - 30, data.length - 1);
        } else {
            data = data.slice(0, data.length)
        }
        return data;
    }
}
decorate(DataStore, {
    data: observable,
    addData: action,
    temp1: computed,
    chartData: computed
})

export const dataStore = new DataStore();