import { debounce } from 'lodash';

type F = () => void;

let fs: F[] = [];

const BOUNCE_TIME = 200;

function createObserver(f: () => void) {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === "childList") {
                f();
            }
        });
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

export const observer = {
    add: (f: F)  => {
        fs.push(f);
    },
    remove: (f: F) => {
        const index = fs.indexOf(f);
        if(index !== -1) fs.splice(index,1);
    },
    clear: () => {fs = []}
}