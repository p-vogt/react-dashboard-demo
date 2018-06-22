import { observable, decorate, action } from 'mobx';

class DataStore {
    data = tempInitData
    setData(newData) {
        this.data = newData;
    }
}
decorate(DataStore, {
    data: observable,
    setData: action,
})


const tempInitData = [
            { name: 'xxx', Room1: 30, Room2: 25 },
            { name: 'xxx', Room1: 31, Room2: 26 },
            { name: 'xxx', Room1: 32, Room2: 28 },
            { name: 'xxx', Room1: 33, Room2: 25 },
            { name: 'xxx', Room1: 29, Room2: 27 },
            { name: 'xxx', Room1: 28, Room2: 29 },
            { name: 'xxx', Room1: 31, Room2: 30 },
            { name: 'xxx', Room1: 33, Room2: 31 },
            { name: 'xxx', Room1: 30, Room2: 32 },
            { name: 'xxx', Room1: 35, Room2: 30 },
            { name: 'xxx', Room1: 30, Room2: 33 },
            { name: 'xxx', Room1: 34, Room2: 35 },
            { name: 'xxx', Room1: 35, Room2: 30 },
            { name: 'xxx', Room1: 32, Room2: 32 },
            { name: 'xxx', Room1: 28, Room2: 29 },
            { name: 'xxx', Room1: 27, Room2: 30 },
            { name: 'xxx', Room1: 26, Room2: 31 },
            { name: 'xxx', Room1: 25, Room2: 32 },
            { name: 'xxx', Room1: 29, Room2: 33 },
            { name: 'xxx', Room1: 30, Room2: 32 },
            { name: 'xxx', Room1: 29, Room2: 31 },
            { name: 'xxx', Room1: 35, Room2: 30 },
            { name: 'xxx', Room1: 34, Room2: 29 },
            { name: 'xxx', Room1: 31, Room2: 25 },
            { name: 'xxx', Room1: 32, Room2: 24 },
            { name: 'xxx', Room1: 33, Room2: 29 },
            { name: 'xxx', Room1: 30, Room2: 30 },
            { name: 'xxx', Room1: 28, Room2: 32 },
        ];

export const dataStore = new DataStore();