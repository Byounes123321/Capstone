from pybricks.hubs import EV3Brick
from pybricks.ev3devices import (Motor, TouchSensor, ColorSensor,
                                 InfraredSensor, UltrasonicSensor, GyroSensor)
from pybricks.parameters import Port, Stop, Direction, Button, Color
from pybricks.tools import wait, StopWatch, DataLog
from pybricks.robotics import DriveBase
from pybricks.media.ev3dev import SoundFile, ImageFile
from pybricks.iodevices import DCMotor
from pixy2 import Pixy2

# This program requires LEGO EV3 MicroPython v2.0 or higher.
# Click "Open user guide" on the EV3 extension tab for more information.


# Create your objects here.
ev3 = EV3Brick()
# motorA = DCMotor(Port.A)
# button = TouchSensor(Port.S2)
pixy2 = Pixy2(port=1, i2c_address=0x54)
frame = pixy2.get_resolution()
# Write your program here.

print("W:", frame.width)
print("H:", frame.height)

# cords = x, y
while True:
    numBlocks = 7
    nr_blocks, blocks = pixy2.get_blocks(1, numBlocks)

    for i in range(nr_blocks):
        sig = blocks[i].sig
        x = blocks[i].x_center
        y = blocks[i].y_center
        w = blocks[i].width
        h = blocks[i].height
        print("cords{}: {}, {}".format(i+1, x, y))



class pixyData():
    json = {"hello world"}

# print(pixy.get_version())
# pixy.get_blocks()

# while True:
#     if button.pressed():
#         motorA.dc(100)
#     else:
#         motorA.dc(0)
# ev3.speaker.say("Hello, World!")
