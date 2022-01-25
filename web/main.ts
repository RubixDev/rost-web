import init, { run } from './pkg/rost_web.js'

const terminal = document.getElementById('terminal') as HTMLDivElement
const body = document.getElementById('body') as HTMLDivElement
const history = document.getElementById('body__history') as HTMLDivElement
const input = document.getElementById('body__input') as HTMLInputElement

async function setup() {
    await init()
    input.addEventListener('keyup', event => {
        if (event.key !== 'Enter') return

        const request = input.value
        input.value = ''

        history.innerHTML += '&gt ' + request + '<br>'
        const response = run(request)
        if (response !== '') {
            if (response.includes(': '))
                history.innerHTML += '<span class="error">' + run(request) + '</span>' + '<br>'
            else
                history.innerHTML += run(request) + '<br>'
        }

        body.scrollTo(0, body.scrollHeight)
    })
    terminal.addEventListener('mouseup', () => {
        if (window.getSelection()?.toString() !== "") return
        input.focus()
    })
}

setup()
