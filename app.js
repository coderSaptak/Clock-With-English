var hoursContainer = document.querySelector('.hours')
var minutesContainer = document.querySelector('.minutes')
var secondsContainer = document.querySelector('.seconds')
var ampmContainer = document.querySelector('.ampm') // Select the AM/PM container
var englishTimeElement = document.querySelector('.english-time') // Select the English time element
var tickElements = Array.from(document.querySelectorAll('.tick'))

var last = new Date(0)
last.setUTCHours(-1)

var tickState = true

function updateTime() {
    var now = new Date()

    var hours = now.getHours()
    var isAm = hours < 12
    var displayHours = hours % 12 || 12 // Convert 24-hour format to 12-hour format
    var nowHours = displayHours.toString()
    var lastHours = last.getHours() % 12 || 12

    if (lastHours.toString() !== nowHours) {
        updateContainer(hoursContainer, nowHours)
    }

    var lastMinutes = last.getMinutes().toString()
    var nowMinutes = now.getMinutes().toString()
    if (lastMinutes !== nowMinutes) {
        updateContainer(minutesContainer, nowMinutes)
    }

    var lastSeconds = last.getSeconds().toString()
    var nowSeconds = now.getSeconds().toString()
    if (lastSeconds !== nowSeconds) {
        updateContainer(secondsContainer, nowSeconds)
    }

    // Update AM/PM
    var currentAmPm = isAm ? "AM" : "PM"
    if (ampmContainer.textContent !== currentAmPm) {
        ampmContainer.textContent = currentAmPm
    }

    // Update English time format (e.g., "It's 11 O'clock.")
    updateEnglish(now, displayHours, isAm)
}

function tick() {
    tickElements.forEach(t => t.classList.toggle('tick-hidden'))
}

function updateContainer(container, newTime) {
    var time = newTime.split('')

    if (time.length === 1) {
        time.unshift('0')
    }

    var first = container.firstElementChild
    if (first.lastElementChild.textContent !== time[0]) {
        updateNumber(first, time[0])
    }

    var last = container.lastElementChild
    if (last.lastElementChild.textContent !== time[1]) {
        updateNumber(last, time[1])
    }
}

function updateNumber(element, number) {
    var second = element.lastElementChild.cloneNode(true)
    second.textContent = number

    element.appendChild(second)
    element.classList.add('move')

    setTimeout(function () {
        element.classList.remove('move')
    }, 990)
    setTimeout(function () {
        element.removeChild(element.firstElementChild)
    }, 990)
}

// Function to update the English time format
function updateEnglish(now, hours, isAm) {
    const englishWords = [
        'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 
        'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 
        'Eighteen', 'Nineteen', 'Twenty', 'Twenty-One', 'Twenty-Two', 'Twenty-Three', 
        'Twenty-Four', 'Twenty-Five', 'Twenty-Six', 'Twenty-Seven', 'Twenty-Eight', 
        'Twenty-Nine', 'Thirty', 'Thirty-One', 'Thirty-Two', 'Thirty-Three', 'Thirty-Four', 
        'Thirty-Five', 'Thirty-Six', 'Thirty-Seven', 'Thirty-Eight', 'Thirty-Nine', 'Forty', 
        'Forty-One', 'Forty-Two', 'Forty-Three', 'Forty-Four', 'Forty-Five', 'Forty-Six', 
        'Forty-Seven', 'Forty-Eight', 'Forty-Nine', 'Fifty', 'Fifty-One', 'Fifty-Two', 
        'Fifty-Three', 'Fifty-Four', 'Fifty-Five', 'Fifty-Six', 'Fifty-Seven', 'Fifty-Eight', 
        'Fifty-Nine'
    ];
    var minutes = now.getMinutes()
    var period = isAm ? 'AM' : 'PM'

    // Handle special cases for English time phrases
    var timeString = `It's <u>${englishWords[hours - 1]}</u> O'clock.` // Default: "It's X O'clock"
    if (minutes==15 || minutes==30 || minutes==45){
        if(minutes==15){
            timeString=`It's <u> quarter past <u>${englishWords[hours - 1]}</u> O'clock.`
        }
        else if(minutes==30){
            timeString=`It's <u> half past ${englishWords[hours - 1]}</u> O'clock.`            
        }
        else{
            timeString=`It's <u> quarter to <u>${englishWords[hours - 1]}</u> O'clock.`
        }
    }
    else if (minutes > 0 && minutes <= 30) {
        timeString = `It's <u>${englishWords[minutes - 1]} past ${englishWords[hours - 1]}</u> O'clock.`
    } else if (minutes > 30) {
        var nextHour = hours === 12 ? 1 : hours + 1
        timeString = `It's <u>${englishWords[60 - minutes - 1]} to ${englishWords[nextHour - 1]}</u> O'clock.`
    }

    // Update the English time display
    englishTimeElement.innerHTML = timeString
}

setInterval(updateTime, 1000) // Update every second
