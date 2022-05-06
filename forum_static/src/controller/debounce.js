const debounce = function(delay, callback){
    let timer
    return function(){
        if(timer) clearTimeout(timer)
        timer = setTimeout(() => {
            callback.call(this, ...arguments)
        }, delay);
    }
}

export { debounce }


