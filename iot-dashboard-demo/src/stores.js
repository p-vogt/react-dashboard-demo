import { observable, decorate, action, computed } from 'mobx';

class DataStore {
    data = tempInitData
    addData(newData) {
        this.data.push(newData);
    }
    get temp1() {
        let id = 0;
        return this.data.map(sample => {
            return {
                id: id++,
                name: sample.name,
                temp: sample.temp1
            }
        });
    }
    get chartData() {
        let data = this.data;
        if (data.length >= 30) {
          data = data.slice(data.length - 30, data.length -1 );
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


const tempInitData = [
    { name: 'xxx', temp1: 30, temp2: 25 },
    { name: 'xxx', temp1: 31, temp2: 26 },
    { name: 'xxx', temp1: 32, temp2: 28 },
    { name: 'xxx', temp1: 33, temp2: 25 },
    { name: 'xxx', temp1: 29, temp2: 27 },
    { name: 'xxx', temp1: 28, temp2: 29 },
    { name: 'xxx', temp1: 31, temp2: 30 },
    { name: 'xxx', temp1: 33, temp2: 31 },
    { name: 'xxx', temp1: 30, temp2: 32 },
    { name: 'xxx', temp1: 35, temp2: 30 },
    { name: 'xxx', temp1: 30, temp2: 33 },
    { name: 'xxx', temp1: 34, temp2: 35 },
    { name: 'xxx', temp1: 35, temp2: 30 },
    { name: 'xxx', temp1: 32, temp2: 32 },
    { name: 'xxx', temp1: 28, temp2: 29 },
    { name: 'xxx', temp1: 27, temp2: 30 },
    { name: 'xxx', temp1: 26, temp2: 31 },
    { name: 'xxx', temp1: 25, temp2: 32 },
    { name: 'xxx', temp1: 29, temp2: 33 },
    { name: 'xxx', temp1: 30, temp2: 32 },
    { name: 'xxx', temp1: 29, temp2: 31 },
    { name: 'xxx', temp1: 35, temp2: 30 },
    { name: 'xxx', temp1: 34, temp2: 29 },
    { name: 'xxx', temp1: 31, temp2: 25 },
    { name: 'xxx', temp1: 32, temp2: 24 },
    { name: 'xxx', temp1: 33, temp2: 29 },
    { name: 'xxx', temp1: 30, temp2: 30 },
    { name: 'xxx', temp1: 28, temp2: 32 },
];

export const dataStore = new DataStore();