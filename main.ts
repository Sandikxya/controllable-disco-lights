input.onButtonPressed(Button.A, function () {
    basic.showIcon(IconNames.Asleep)
})
input.onButtonPressed(Button.AB, function () {
    basic.showIcon(IconNames.Happy)
})
input.onButtonPressed(Button.B, function () {
    basic.showIcon(IconNames.Sad)
})
input.onLogoEvent(TouchButtonEvent.Touched, function () {
    start = input.runningTime()
    basic.showLeds(`
        # . # . #
        # . # . .
        # # # . #
        # . # . #
        # . # . #
        `)
})
serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    serialLineReceived = serial.readUntil(serial.delimiters(Delimiters.NewLine))
    commandParts = serialLineReceived.split(" ")
    command = commandParts[0]
    if (command == "heart") {
        basic.showIcon(IconNames.Heart)
    } else if (command == "diamond") {
        basic.showIcon(IconNames.Diamond)
    } else if (command == "square") {
        basic.showLeds(`
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            `)
    } else if (command == "sensitivity") {
        if (commandParts.length > 1) {
            sensitivity = parseFloat(commandParts[1])
        }
    } else if (command == "heartbeat") {
        for (let index = 0; index < 2; index++) {
            basic.showIcon(IconNames.Heart)
            basic.pause(500)
            basic.showIcon(IconNames.SmallHeart)
            basic.pause(500)
        }
    } else {
        basic.showString(command)
    }
})
let command = ""
let commandParts: string[] = []
let serialLineReceived = ""
let start = 0
let sensitivity = 0
serial.setBaudRate(BaudRate.BaudRate115200)
sensitivity = 255
basic.showLeds(`
    # # # # #
    # # # # #
    # # # # #
    # # # # #
    # # # # #
    `)
basic.forever(function () {
    led.setBrightness(input.soundLevel() * (sensitivity / 255))
})
