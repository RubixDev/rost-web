import init, { run } from './pkg/rost_web.js'

const terminal = document.getElementById('terminal') as HTMLDivElement
const body = document.getElementById('body') as HTMLDivElement
const history = document.getElementById('body__history') as HTMLDivElement
const input = document.getElementById('body__input') as HTMLInputElement

const minButton = document.getElementById('titlebar__buttons__minimize') as HTMLInputElement
const maxButton = document.getElementById('titlebar__buttons__maximize') as HTMLInputElement
const closeButton = document.getElementById('titlebar__buttons__close') as HTMLInputElement

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

    minButton.addEventListener('click', () => {
        terminal.className = 'minimized'
        setTimeout(() => {
            terminal.className = ''
        }, 3000)
    })
    maxButton.addEventListener('click', () => {
        if (terminal.className.includes('maximized'))
            terminal.className = ''
        else
            terminal.className = 'maximized'
    })
    closeButton.addEventListener('click', () => {
        history.innerHTML = ''
    })
}

setup()
