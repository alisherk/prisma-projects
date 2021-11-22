import { makeVar, ReactiveVar } from '@apollo/client';

// when we call this function const makeCar = makePersistedVar([])
// this returns a new function it does not invoke anything in the object.assign block

//when we call const value = makeCar() it invokes the finction return by Object.assign
//because we are not passing a new value to this function it enters if(!newValue) block and simply returns value "Volvo" that has already been called above


//when we call makeCar and pass value into it as in makeCar('BMW') it passes if block
//an return variable with a new value

export function makePersistedVar<T>(initialValue: any): ReactiveVar<T> {
  
  const variable = makeVar<any>(initialValue);

  const persistemItem = 'Volvo';

  variable([persistemItem]);

  console.log('invoked 1');

  return Object.assign((newValue?: T) => {

    console.log('invoked 2');

    if (!newValue) {

      console.log('invoked 3');

      return variable();
    }
    console.log('invoked 4');
    return variable(newValue);

  }, variable);
}


