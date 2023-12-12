import pygame, os, csv, copy, webbrowser
from getInput import getNumberInput, getStringInput, getColourInput

os.system("cls")

#python -m pygbag ENDINGSIM
#run in cmd in the folder above (in this case !JAMS)
#go into to !JAMS folder and type 'cmd' into address bar

# Define colors
BLACK = (0, 0, 0)
RED = (255, 0, 0)
BLUE = (0, 0, 255)
GREEN = (0, 255, 0)
YELLOW = (255, 255, 0)
PINK = (255, 192, 203)
PURPLE = (128, 0, 128)
ORANGE = (255, 165, 0)
BROWN = (165, 42, 42)
GREY = (128, 128, 128)
WHITE = (255,255,255)
LOGORED = (170, 32, 32)

# Set win dimensions
w = 840
h = 600

# Initialize Pygame
pygame.init()

# Set up the display
win = pygame.display.set_mode((w, h), pygame.RESIZABLE) #sets up window
pygame.display.set_caption("RUBY'S LEVEL EDITOR") #Set title
pygame.display.set_icon(pygame.image.load('icon.png')) #Set icon


loadingTexts = ["LOADING IMAGES", "LOADING UI", "LOADING SOUNDS"]


# Set up fonts
smallFont = pygame.font.SysFont("arial", 20)
smallerFont = pygame.font.SysFont("arial", 15)
bigFont = pygame.font.SysFont("arial", 45)

# Set up timer
clock = pygame.time.Clock()

#load image text
win.blit(smallFont.render(loadingTexts[0], True, (255, 255, 255)), (0,200+(0*20)))
pygame.display.flip()

#LOAD IMAGES 




win.blit(smallFont.render(loadingTexts[0] + " - COMPLETED", True, (255, 255, 255)), (0,200+(0*20)))
pygame.display.flip()

#load ui text
win.blit(smallFont.render(loadingTexts[1], True, (255, 255, 255)), (0,200+(1*20)))
pygame.display.flip()
ui = {
}

win.blit(smallFont.render(loadingTexts[1] + " - COMPLETED", True, (255, 255, 255)), (0,200+(1*20)))
pygame.display.flip()


#load sounds text
win.blit(smallFont.render(loadingTexts[2], True, (255, 255, 255)), (0,200+(2*20)))
pygame.display.flip()
sound = {
}

win.blit(smallFont.render(loadingTexts[1] + " - COMPLETED", True, (255, 255, 255)), (0,200+(2*20)))
pygame.display.flip()

levelBlockStr = []
with open("level.csv", newline='') as csvfile:
    csv_reader = csv.reader(csvfile)
    for row in csv_reader:
        levelBlockStr.append(row)



pygame.time.delay(100)

editInt = pygame.image.load("editInt.png")

class LevelBlock:
    def __init__(self, x, y, w, h, colour, tag) -> None:
        self.rect = pygame.Rect(x, y, w, h)
        self.x, self.y, self.w, self.h = x, y, w, h
        colourString = colour.split(",")
        self.colour = (int(colourString[0][4:]), int(colourString[1]), int(colourString[2][:-1]))
        self.tag = tag
        self.ogPos = [self.x, self.y]
        self.ogSize = [self.w, self.h]
        self.drawEditInt = False
        self.wasDragged = False
        self.dragOffset = (0,0)
        self.wasResized = False
        self.newColour = 0
        self.highLightColour = RED
        undos.append(copyList(levelBlocks))
    def save(self):
        return f"new Platform({self.x}, {self.y}, {self.w}, {self.h}, \"rgb{self.colour}\", \"{self.tag}\"),"
    def update(self) -> None:
        global leftMouseHeld, delHeld, contextMenu, undos, screenPos, middleMouseHeld
        self.drawEditInt = False
        self.rect = pygame.Rect(self.x+screenPos[0], self.y+screenPos[1], self.w*scale, self.h*scale)
        if self.rect.collidepoint(posx, posy) and ((clicked[0] and not leftMouseHeld) or (clicked[2] and not rightMouseHeld) or (clicked[1] and not middleMouseHeld)) and not levelBlocks[-1]==self and posy>23:
            levelBlocks.remove(self)
            levelBlocks.append(self)
            leftMouseHeld = True
        
        if levelBlocks[-1]==self:
            if keys[pygame.K_LSHIFT]:
                multiply = 10 if keys[pygame.K_LCTRL] else 1
                if keys[pygame.K_w]:
                    undos.append(copyList(levelBlocks))
                    self.y-=1*multiply
                if keys[pygame.K_s]:
                    undos.append(copyList(levelBlocks))
                    self.y+=1*multiply
                if keys[pygame.K_a]:
                    undos.append(copyList(levelBlocks))
                    self.x-=1*multiply
                if keys[pygame.K_d]:
                    undos.append(copyList(levelBlocks))
                    self.x+=1*multiply
            
            
            if clicked[0] and keys[pygame.K_LCTRL] and posy>23:
                    if not self.wasResized:
                        undos.append(copyList(levelBlocks))
                    self.h = posy-(self.y+screenPos[1])*scale if posy-(self.y+screenPos[1])*scale>0 else 1
                    self.w = posx-(self.x+screenPos[0])*scale if posx-(self.x+screenPos[0])*scale>0 else 1
                    if keys[pygame.K_LSHIFT]:
                        if self.w > self.h:
                            self.h = self.w
                        else:
                            self.w = self.h
                    leftMouseHeld = True
                    self.wasResized = True
            else:
                self.wasResized = False
            if clicked[0] and not keys[pygame.K_LCTRL] and posy>23:
                if not self.wasDragged:
                    undos.append(copyList(levelBlocks))
                    self.dragOffset = (posx-(self.x+screenPos[0])*scale, posy-(self.y+screenPos[1]))
                if self.wasDragged:
                    self.wasDragged = True
                    leftMouseHeld = True
                    self.y = posy-screenPos[1]-self.dragOffset[1]
                    self.x = posx-screenPos[0]-self.dragOffset[0]
                elif not self.wasDragged:
                    if self.rect.collidepoint(posx, posy):
                        self.wasDragged = True
                        leftMouseHeld = True
                        self.y = posy-screenPos[1]-self.dragOffset[1]
                        self.x = posx-screenPos[0]-self.dragOffset[0]
            else:
                self.wasDragged = False

            if clicked[1]:
                middleMouseHeld = True
                if keys[pygame.K_LSHIFT]:
                    self.h = posy-(self.y+screenPos[1])*scale if posy-(self.y+screenPos[1])*scale>0 else 1
                else:
                    self.w = posx-(self.x+screenPos[0])*scale if posx-(self.x+screenPos[0])*scale>0 else 1

            
            if self.rect.collidepoint(posx, posy) and clicked[2]:
                contextMenu = True
                self.drawEditInt = True
                if keys[pygame.K_w]:
                    newValue = getNumberInput(f"Enter the new width.\nCurrently {self.w}.")
                    undos.append(copyList(levelBlocks))
                    self.w = newValue if newValue!=None else self.w
                if keys[pygame.K_s]:
                    newValue = getNumberInput(f"Enter the new height.\nCurrently {self.h}.")
                    undos.append(copyList(levelBlocks))
                    self.h = newValue if newValue!=None else self.h
                if keys[pygame.K_a]:
                    newValue = getNumberInput(f"Enter the new X position.\nCurrently {self.x}.")
                    undos.append(copyList(levelBlocks))
                    self.x = newValue if newValue!=None else self.x
                if keys[pygame.K_d]:
                    newValue = getNumberInput(f"Enter the new Y position.\nCurrently {self.y}.")
                    undos.append(copyList(levelBlocks))
                    self.y = newValue if newValue!=None else self.y
                if keys[pygame.K_q]:
                    newValue = getStringInput(f"Enter the new tag.\nCurrently {self.tag}.")
                    undos.append(copyList(levelBlocks))
                    self.tag = newValue if newValue!=None else self.tag
                if keys[pygame.K_e]:
                    newValue = getColourInput(f"Choose the block colour.\nCurrently {self.colour}.")[0]
                    undos.append(copyList(levelBlocks))
                    self.colour = newValue if newValue!=None else self.colour
            
            if keys[pygame.K_DELETE] and not delHeld:
                delHeld = True
                levelBlocks.remove(self)
                levelDeletedBlocks.append(self)
                debugLog.append(DebugLogText("Deleted Block"))
                undos.append(copyList(levelBlocks))
                del self

        else:
            self.ogPos = [self.x, self.y]
            self.ogSize = [self.w, self.h]
            
        
    def draw(self) -> None:
        global screenPos,leftMouseHeld
        pygame.draw.rect(win, self.colour, self.rect)
        if self == levelBlocks[-1] and not self.wasDragged and not self.wasResized and not keys[pygame.K_LSHIFT]:
            pygame.draw.rect(win, self.highLightColour, pygame.Rect(self.x-10+screenPos[0], self.y-10+screenPos[1], self.w+20, self.h+20), 10)
            self.newColour+=1
            if self.newColour>30:
                self.newColour = 0
                self.highLightColour = RED if self.highLightColour!=RED else YELLOW
        textSurf = smallFont.render(f"x:{self.x}, y:{self.y}, w:{self.w}, h:{self.h}, tag:{self.tag}", True,  WHITE)
        bgSurf = pygame.Surface((textSurf.get_width(), textSurf.get_height()), pygame.SRCALPHA)
        bgSurf.fill((128,128,128, 128))
        win.blit(bgSurf, (self.x+screenPos[0], self.y+screenPos[1]))
        win.blit(textSurf, (self.x+screenPos[0], self.y+screenPos[1]))
        if self == levelBlocks[-1]:
            win.blit(bgSurf, (0, 0))
            win.blit(textSurf, (0,0))
            clickableSurfRect = bgSurf.get_rect()
            if clickableSurfRect.collidepoint(posx, posy) and clicked[0] and not leftMouseHeld:
                leftMouseHeld = True
                screenPos = ((-self.x)+win.get_width()/2,(-self.y)+win.get_height()/2)
        if self.drawEditInt:
            win.blit(editInt, (posx-249, posy-249))

# ui.addElement(UIText((20, 504), "Sample", "Hello World", 40, BLACK))

undos = []
redos = []

class UndoType:
    def __init__(self, ogState) -> None:
        self.ogState = ogState
class MoveUndo(UndoType):
    def __init__(self, ogState, movedObj) -> None:
        super().__init__(ogState)
        self.movedObj = movedObj
    def undo(self):
        levelBlocks[levelBlocks.index(self.movedObj)] = self.ogState
class Deleted(UndoType):
    def __init__(self, ogState) -> None:
        super().__init__(ogState)
    def undo(self):
        levelBlocks.append(self.ogState)
class DebugLogText:
    def __init__(self, text, showTime = 60):
        self.text = text
        self.showTime = showTime
        self.bg = pygame.Surface((960, 26), pygame.SRCALPHA)
        self.bg.fill((255,255,255,200))
    
    def draw(self, y):
        win.blit(self.bg, (0, (y*26)+23))
        win.blit(smallFont.render(self.text, True, BLACK), (0, ((y*26)+3)+23))
        self.showTime-=1
        if self.showTime<=0:
            debugLog.remove(self)

def redrawScreen():
    global leftMouseHeld
    win.fill(WHITE)

    
    for block in levelBlocks[:-1]:
        block.draw()
        
        
    pygame.draw.rect(win, BLACK, pygame.Rect(0,0,win.get_width(), 23))
    if len(levelBlocks)>0:
        levelBlocks[-1].draw()

    textSurf = smallFont.render(f"x:{-screenPos[0]+posx} y:{-screenPos[1]+posy}", True,  WHITE)
    bgSurf = pygame.Surface((textSurf.get_width(), textSurf.get_height()), pygame.SRCALPHA)
    bgSurf.fill((128,128,128, 128))
    win.blit(bgSurf, (win.get_width()-textSurf.get_width(), 0))
    win.blit(textSurf, (win.get_width()-textSurf.get_width(), 0))
    helpText = smallFont.render(f"Ruby's Level Edior - Click here for help", True,  WHITE)
    win.blit(helpText, (w-textSurf.get_width()-290, 0))
    helpRect = helpText.get_rect()
    helpRect.x, helpRect.y = (w-textSurf.get_width()-290, 0)
    if helpRect.collidepoint(posx, posy) and clicked[0]:
        leftMouseHeld = True
        webbrowser.open(os.path.join(os.path.dirname(os.path.realpath(__file__)), "help/help.html"))

    for y, log in enumerate(debugLog):
        log.draw(y)
    #updates screen
    pygame.display.flip()


debugLog = []
levelBlocks = []

def copyList(lst):
    output = []
    for obj in lst:
        output.append(copy.copy(obj))
    return output

for block in levelBlockStr:

    colour = f"{block[4][2:]}, {block[5]}, {block[6][:-1]}"
    
    line = "".join(block)
    levelBlocks.append(LevelBlock(float(block[0][13:]), float(block[1]), float(block[2]), float(block[3]), colour, block[-2][2:-2]))

levelDeletedBlocks = []

keys = pygame.key.get_pressed()
screenPos = (0,0)
leftMouseHeld = False
rightMouseHeld = False
middleMouseHeld = False
delHeld = False
zHeld = False
yHeld = False
sHeld = False
rHeld = False
run = True
scale = 1
# Main game loop
while run:
    contextMenu = False
    scrolly = 0
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            run = False

        elif event.type == pygame.MOUSEWHEEL:
            scrolly = event.y*90

            screenPos = (screenPos[0]+ ((scrolly if keys[pygame.K_LSHIFT] else 0)*(3 if keys[pygame.K_LCTRL] else ((1 / 90) if keys[pygame.K_RCTRL] else 1))), screenPos[1]+ ((scrolly if not keys[pygame.K_LSHIFT] else 0)*(3 if keys[pygame.K_LCTRL] else ((1 / 90) if keys[pygame.K_RCTRL] else 1))))

    
    #mouse getters
    clicked = pygame.mouse.get_pressed(num_buttons=3)

    if leftMouseHeld:
        leftMouseHeld = clicked[0]
    if rightMouseHeld:
        rightMouseHeld = clicked[2]
    if middleMouseHeld:
        middleMouseHeld = clicked[1]

    posx, posy = pygame.mouse.get_pos()
    #get pressed keys
    keys = pygame.key.get_pressed()

    if delHeld:
        delHeld = keys[pygame.K_DELETE]
    if zHeld:
        zHeld = keys[pygame.K_z]
    if sHeld:
        sHeld = keys[pygame.K_s]
    if yHeld:
        yHeld = keys[pygame.K_y]
    if rHeld:
        rHeld = keys[pygame.K_r]

    if not keys[pygame.K_LSHIFT] and not clicked[2]:
        if keys[pygame.K_d]:
            screenPos = (screenPos[0]-10, screenPos[1])
        if keys[pygame.K_a]:
            screenPos = (screenPos[0]+10, screenPos[1])
        if keys[pygame.K_s]:
            screenPos = (screenPos[0], screenPos[1]-10)
        if keys[pygame.K_w]:
            screenPos = (screenPos[0], screenPos[1]+10)


    for block in levelBlocks:
        block.update()
        
    if clicked[2] and not contextMenu and not rightMouseHeld:
        levelBlocks.append(LevelBlock(posx-(screenPos[0])*scale, posy-(screenPos[1])*scale, 100*scale, 100*scale, "rgb(128, 128, 128)", "platform")) 
        rightMouseHeld = True

    if keys[pygame.K_LCTRL] and keys[pygame.K_s] and not sHeld and not keys[pygame.K_LSHIFT]:
        levelBlockStr = []
        sHeld = True
        for block in levelBlocks:
            levelBlockStr.append(block.save())
        with open("level.csv", 'w', newline='') as csvfile:
            for item in levelBlockStr:
                debugLog.append(DebugLogText(f"Saving: {item}"))
                csvfile.write(item + '\n')
        debugLog.append(DebugLogText("Saved!"))

    if keys[pygame.K_LCTRL] and keys[pygame.K_z] and undos!=[] and not zHeld:
        levelBlocks = undos[-1]
        zHeld = True
        debugLog.append(DebugLogText("Undo"))
        undos = undos[:-1]
    elif  keys[pygame.K_LCTRL] and keys[pygame.K_z] and undos==[] and not zHeld:
        debugLog.append(DebugLogText("No Block Left To Undo"))
        
    if keys[pygame.K_LCTRL] and keys[pygame.K_r] and undos!=[] and not rHeld:
        levelBlocksTemp = copyList(levelBlocks)
        levelBlocksTemp.reverse()
        highLighBlock = levelBlocks[-1]
        levelBlocks = levelBlocksTemp[1:]
        levelBlocks.append(highLighBlock)
        rHeld = True
        debugLog.append(DebugLogText("Flipped Block List"))
        undos.append(copyList(levelBlocks))


    #redraw win
    
    redrawScreen()
    
    #for web version
    #await asyncio.sleep(0)
    
    # Set the framerate
    clock.tick(60)


pygame.quit()