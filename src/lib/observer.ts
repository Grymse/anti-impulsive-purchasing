import { debounce } from 'lodash';

type F = (e: HTMLElement) => void;

let fs: F[] = [];

const BOUNCE_TIME = 100;

function createObserver(f: F) {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === "childList") {
                f(mutation.target as HTMLElement);
            }
        });
    });
    
    observer.observe(e.body, {
        childList: true,
        subtree: true
    });
    f(e.body);
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