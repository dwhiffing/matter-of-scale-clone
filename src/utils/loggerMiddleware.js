import _ from 'lodash'

// this middleware logs all dispatches for debugging purposes
// REQUEST dispatches are logged blue with no group
// (since there are no relevant data changes to display)
// SUCCESS dispatches are logged green and grouped to show any relevant store changes
// FAILED dispatches are logged RED with their relevant error displayed

export default ({getState}) => next => action => {
  const pad = num => ('0' + num).slice(-2);
  const transformer = (state) => {
    return _.mapValues(state, v => v)
  }

  const prevState = transformer(getState());
  const returnValue = next(action);
  const nextState = transformer(getState());

  const changes = _.transform(nextState, function(result, n, key) {
    if (!_.isEqual(n, prevState[key])) {
      result[key] = n;
    }
  });

  const changesTo = Object.keys(changes)[0]

  const type = () => {
    if (/_REQUEST/.test(action.type)) return 'REQUEST'
    if (/_FAILURE/.test(action.type)) return 'FAILURE'
    return 'SUCCESS'
  }()

  let dispatchColor
  switch (type) {
    case 'SUCCESS':
      dispatchColor = '#4CAF50'; break
    case 'REQUEST':
      dispatchColor = '#03A9F4'; break
    case 'FAILURE':
      dispatchColor = '#EC2645'; break
  }

  const time = new Date();

  const formattedTime = `${time.getHours()}:${pad(time.getMinutes())}:${pad(time.getSeconds())}`;

  const message = `${action.type}:${JSON.stringify(action.payload)}`;

  const payload = action.payload ? action.payload : action.meta
  const shouldLog = action.type && !/DO_TICK|DO_AUTOBUY|REHYDRATE/.test(action.type)

  if (!shouldLog) return returnValue

  if (type === 'SUCCESS') {
    const changedMessage = changesTo ? changesTo : 'NO CHANGE'
    console.groupCollapsed(`%c ${message} > ${changedMessage}`, `color: ${dispatchColor};`);
    console.log(`%c payload:`, `color: #000; font-weight: bold`, payload);
    if (changesTo) {
      console.log(`%c prev ${changesTo}:`, `color: #000; font-weight: bold`, prevState[changesTo]);
      console.log(`%c next ${changesTo}:`, `color: #000; font-weight: bold`, nextState[changesTo]);
    }
    console.groupEnd();
  } else {
    console.log(`%c ${message}`, `color: ${dispatchColor}; font-weight: bold`);
  }

  return returnValue;
}
