import { get } from 'http';
import { debounce } from 'lodash';

type F = (e: HTMLElement) => void;

let fs: F[] = [];

const BOUNCE_TIME = 100;

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
        f(document.body);
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    f(document.body);
    
}

createObserver(debounce((e) => {
    for(const f of fs) f(e);
},BOUNCE_TIME, {trailing: true}));

/**
 * Effect type
 */
type SignalEffect = ((signal: {signal: AbortSignal}) => ((() => void) | void));
export type Effect = SignalEffect | (() => (void | (() => void)));
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
    clear: (e: HTMLElement) =>{fs = []},
}