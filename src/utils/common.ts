export function decimalToHexString(number) {
    if (number < 0) {
      number = 0xffffffff + number + 1;
    }
  
    return number.toString(16).toUpperCase();
  }
  
  export function splitArray(array: any[], size: number): any[][] {
    let chunkSize = size;
    let chunks = [];
  
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }
  
  // splitArray([1,2,3,4,5,6,7,8,9,10], 5)
  // [
  //   [1,2,3,4,5],
  //   [6,7,8,9,10]
  // ]
  
  export function findMap(array, by, id) {
    console.log(by, id);
  
    let Target = 0;
    array.forEach((item, index) => {
      if (item[by] == id) return (Target = index);
      else return;
    });
    return Target;
  }
  
  export function removeFromArray(Arr: any[], Str: any): any[] {
    let WorkFlow;
    WorkFlow = Arr.join(",");
    WorkFlow = WorkFlow.replace("," + Str, "");
    WorkFlow = WorkFlow.split(",");
    return WorkFlow;
  }
  export function getFromArray(Arr: any[], ID: number): any {
    let temp_1;
  
    Arr.forEach((item, index) => {
      item.index = index;
      if (item.ID == ID) return (temp_1 = item);
      else return;
    });
  
    return temp_1;
  }
  
  export const ArrayManipulation = {
    splitArray,
    findMap,
    removeFromArray,
    getFromArray,
  };
  