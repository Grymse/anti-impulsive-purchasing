import { debounce } from 'lodash';
import { consent } from './analytics';

const BOUNCE_TIME = 100;

type F = () => void;
type SignalEffect = ((signal: {signal: AbortSignal}) => ((() => void) | void));
export type Effect = SignalEffect | (() => (void | (() => void)));

let fs: F[] = [];
let prevMutations = [] as Node[];


function createObserver(f: F) {
    const observer = new MutationObserver((mutations) => {
        let hasChanged = false;
        for (const mutation of mutations) {
            if (!prevMutations.includes(mutation.target)) {
                hasChanged = true;
            }
        }
        if (!hasChanged) return;
        
        prevMutations = mutations.map(m => m.target);

        f();
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    f();
    
}

createObserver(debounce(() => {
    for(const f of fs) f();
},BOUNCE_TIME, {trailing: true}));

/**
 * Creates an effect that runs the given function and cleans up after itself.
 * Inspired by React's useEffect.
 * @param f The function to run
 * @returns The effect
 */
export function withCleanUp(f: Effect) {
  let abortController = null;
  let cleanUp = null;
    return () => {
        if (abortController) abortController.abort();
        if (cleanUp) cleanUp();
        if (!consent.value) return;
        abortController = new AbortController();
        cleanUp = f({signal: abortController.signal});
    };
}

/**
 * Observer object
 */

export const observer = {
    add: (f: F)  => {
        fs.push(f);
    },

    addEffect: (f: Effect) => {
        observer.add(withCleanUp(f));
    },

    remove: (f: F) => {
        const index = fs.indexOf(f);
        if(index !== -1) fs.splice(index,1);
    },
}