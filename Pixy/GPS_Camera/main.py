#!/usr/bin/env pybricks-micropython
from pybricks.hubs import EV3Brick
from pybricks.ev3devices import (Motor, TouchSensor, ColorSensor,
                                 InfraredSensor, UltrasonicSensor, GyroSensor)
from pybricks.parameters import Port, Stop, Direction, Button, Color
from pybricks.tools import wait, StopWatch, DataLog
from pybricks.robotics import DriveBase
from pybricks.media.ev3dev import SoundFile, ImageFile
from pybricks.iodevices import DCMotor
from pixy2 import Pixy2
import json
import urequests
import utime

# This program requires LEGO EV3 MicroPython v2.0 or higher.
# Click "Open user guide" on the EV3 extension tab for more information.

# API definition
url = 'http://10.12.1.108:8888/api/location'  # Make sure to include the protocol (http:// or https://)

# Create your objects here.
ev3 = EV3Brick()
# motorA = DCMotor(Port.A)
# button = TouchSensor(Port.S2)
pixy2 = Pixy2(port=1, i2c_address=0x54)
frame = pixy2.get_resolution()
# Write your program here.

print("W:", frame.width)
print("H:", frame.height)

def sendData(x, y):
    dataObj = {'X': x, 'Y': y}
    json_data = json.dumps(dataObj).encode('utf-8')
    response = urequests.post(url, data=json_data, headers={'Content-Type': 'application/json'})
    response_data = response.text
    print(response_data)

while True:
    numBlocks = 8
    nr_blocks, blocks = pixy2.get_blocks(1, numBlocks)

    for i in range(nr_blocks):
        sig = blocks[i].sig
        x = blocks[i].x_center
        y = blocks[i].y_center
        w = blocks[i].width
        h = blocks[i].height
        print("cords{}: {}, {}".format(i+1, x, y))
        sendData(x, y)

    # Delay for 5 seconds
    utime.sleep(2)