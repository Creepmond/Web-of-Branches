export const userInterface = document.getElementById('ui-dynamic');

export function findWindowCoord(direction) {
   return Number(getComputedStyle(userInterface)[direction].replace(/[a-z]+/, ''))
}