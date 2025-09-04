// This is just blatantly stolen now lol. Still, it's useful.
function mergeIntoGlobal(object) {
  for (const key in object) {
    if (key === "default") {
      // Skip default exports
      continue;
    }
    const value = object[key];
    const existingValue = window[key];
    if (existingValue !== undefined) {
      throw `Property ${key} already exists in global context`;
    }

    window[key] = value;
  };
};

/*
import * as Data from './core/database'
mergeIntoGlobal(Data);

import * as State from './core/state'
mergeIntoGlobal(State)
*/