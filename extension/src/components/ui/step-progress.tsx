import React from 'react'

type Props = {
    length: number,
    current: number
}

export default function StepProgress({current, length}: Props) {
    const isOverLimit = current > length;
    
    let bars = Array.from({length: length}, (_, i) => {
        const isCurrent = i + 1 === current;
        const isActive = i < current;
        const isOverLimitBar = isOverLimit && isActive;
        
        return (
            <div 
                key={i} 
                className={`relative w-full transition-all duration-300 h-3 rounded-full mx-0.5 ${
                    isActive 
                        ? isOverLimitBar 
                            ? 'bg-lessdestructive' 
                            : 'bg-lessprimary' 
                        : 'bg-gray-200'
                } ${
                    isCurrent 
                        ? 'scale-y-125 shadow-md' 
                        : ''
                }`}
            >
                {isCurrent && (
                    <div className={`absolute -inset-0.5 rounded-full animate-pulse ${
                        isOverLimit ? 'bg-lessdestructive/20' : 'bg-lessprimary/20'
                    }`}></div>
                )}
            </div>
        );
    });

    // If we're over the limit, add extra red dots to visualize the excess
    if (isOverLimit) {
        const extraBars = Array.from({length: current - length}, (_, i) => {
            const isLastExtra = i === current - length - 1; // Is this the last extra item?
            
            return (
                <div 
                    key={`extra-${i}`}
                    className={`relative w-full transition-all duration-300 h-3 rounded-full mx-0.5 bg-lessdestructive ${
                        isLastExtra ? 'scale-y-125 shadow-md' : ''
                    }`}
                >
                    {isLastExtra && (
                        <div className="absolute -inset-0.5 bg-lessdestructive/20 rounded-full animate-pulse"></div>
                    )}
                </div>
            );
        });
        
        bars = [...bars, ...extraBars];
    }

    return (
        <div className="w-full flex h-3">
            {bars}
        </div>
    );
}