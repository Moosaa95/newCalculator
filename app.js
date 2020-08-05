const qs = (prop) => document.querySelector(prop)
const qsAll = (prop) => document.querySelectorAll(prop)


//getting the doms
const [numberBtn, currentTextDisplay, previousTextDisplay, deleteBtn, operateBtn, equalBtn, allClrBtn, percentBtn] = [qsAll('[data-number]'), qs('[data-currentDisplay]'),
    qs('[data-previousDisplay]'),
    qs('[data-del]'), qsAll('[data-operands]'), qs('[data-equal]'), qs('[ data-clearAll]'), qs('[data-percent]')
]


class Cal {
    constructor(currentTextDisplay, previousTextDisplay) {
        this.currentTextDisplay = currentTextDisplay
        this.previousTextDisplay = previousTextDisplay
        this.clear()

    }
    clear() {
        this.currentDisplay = ''
        this.previousDisplay = ''
        this.operation = undefined
    }

    delete() {
        this.currentDisplay = this.currentDisplay.toString().slice(0, -1)

    }
    appendNum(Num, text) {
        if (this.currentDisplay.length % 10 == 0) {
            this.currentDisplay = this.currentDisplay + '\n'
        }
        /* else if (this.currentDisplay.length == 20 && Num.length == 20) {
                   this.currentDisplay = text
               } */

        this.currentDisplay = this.currentDisplay.toString() + Num.toString()

    }

    chooseOperation(opp) {

        this.operation = opp
        if (isNaN(this.previousDisplay)) return
        if (this.previousDisplay !== '') {
            this.compute()
        }
        if (this.operation == '%') {
            this.currentDisplay = parseFloat(this.currentDisplay) / 100
        }
        this.previousDisplay = this.currentDisplay
        this.previousTextDisplay.style.transform = 'translateX(30%)'
        this.currentDisplay = ''

    }
    compute() {
            let computation
            const current = parseFloat(this.currentDisplay)
            const prev = parseFloat(this.previousDisplay)
            if (isNaN(current) && isNaN(prev)) return


            switch (this.operation) {
                case "+":
                    computation = prev + current
                    break

                case "-":
                    computation = prev - current
                    break
                case "*":
                    computation = prev * current
                    break
                case "/":
                    computation = prev / current
                    break

                default:
                    return

            }
            this.currentDisplay = computation
            this.previousDisplay = ''
            this.operation = undefined
        }
        /* percent(per) {
            this.currentDisplay = parseFloat(per) / 100


        } */
    updateDisplay() {
        this.currentTextDisplay.innerText = this.currentDisplay
        this.previousTextDisplay.innerText = this.previousDisplay

    }
}




const cal = new Cal(currentTextDisplay, previousTextDisplay)
numberBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        cal.appendNum(btn.innerText)
        cal.updateDisplay()


    })
})
operateBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        cal.chooseOperation(btn.innerText)
        cal.updateDisplay()


    })
})
equalBtn.addEventListener('click', () => {
    cal.compute()
    cal.updateDisplay()
})
deleteBtn.addEventListener('click', () => {
    cal.delete()
    cal.updateDisplay()
})

allClrBtn.addEventListener('click', () => {
    cal.clear()
    cal.updateDisplay()
})

/* percentBtn.addEventListener('click', () => {
    cal.percent()
    cal.updateDisplay()
}) */