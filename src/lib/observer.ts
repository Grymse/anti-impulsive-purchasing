import { debounce } from 'lodash';

type F = (e: HTMLElement) => void;

let fs: F[] = [];

const BOUNCE_TIME = 200;

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

export const observer = {
    add: (f: F)  => {
        fs.push(f);
    },
    remove: (f: F) => {
        const index = fs.indexOf(f);
        if(index !== -1) fs.splice(index,1);
    },
    clear: (e: HTMLElement) =>{fs = []}
}