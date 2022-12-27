import * as _ from 'lodash'


function isArrayEqual(array1:any[],array2:any[]):boolean{
    const isequal1 = _.differenceWith(array1, array2);
    const isequal2 = _.differenceWith(array2, array1);
    if(isequal1.length == isequal2.length){
        return true
    }else{
        return false
    }
}


export {isArrayEqual}