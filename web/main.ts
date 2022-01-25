import init, { run } from './pkg/rost_web.js'

init().then(() => {
    console.log(run("1+1"))
})
