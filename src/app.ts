const names: Array<string> = ['Ju', 'Bel', 'Gabi'];

const promise: Promise<string> = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('This is done!')
    }, 200)
});

promise.then(data => {
    data.split(' ');
})