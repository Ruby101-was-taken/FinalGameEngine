import pygame, os, csv
from getInput import getNumberInput

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
win = pygame.display.set_mode((w, h)) #sets up window
pygame.display.set_caption("TITLE") #Set title
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


class UICanvas:
    def __init__(self) -> None:
        self.UIComponents = []
    def addElement(self, element):
        self.UIComponents.append(element)
    def getElementByTag(self, tag:str):
        for element in self.UIComponents:
            if element.tag == tag:
                return element
    def draw(self):
        for element in self.UIComponents:
            element.draw()
    def update(self):
        for element in self.UIComponents:
            element.update()

class UIElement:
    def __init__(self, screenPos, tag:str) -> None:
        self.screenPos = screenPos
        self.tag = tag
        self.surface = pygame.Surface((0,0), pygame.SRCALPHA)
        self.show = True
    def toggleShow(self):
        self.show = not self.show
    def setShow(self, setTo:bool):
        self.show = setTo
    def moveTo(self, newPos):
        self.screenPos = newPos
    def draw(self):
        if self.show:
            win.blit(self.surface, self.screenPos)
    def update(self):
        pass

class UIText(UIElement):
    def __init__(self, screenPos, tag:str, text="", fontSize=10, colour=(0,0,0), padding=20) -> None:
        super().__init__(screenPos, tag)
        self.text = text
        self.fontSize = fontSize
        self.colour = colour
        self.font = pygame.font.SysFont("arial", self.fontSize)
        self.surface = self.font.render(text, True, self.colour)
        self.padding = padding

        self.surface = pygame.Surface((self.surface.get_width() + self.padding*2, self.surface.get_height() + self.padding*2), pygame.SRCALPHA)
        self.bg = UIRect((0,0), "textBGEmpty", self.surface.get_width(),self.surface.get_height(), colour)

        self.updateText(self.text)
    def updateText(self, newText:str, fontSize=None, colour=None):
        if fontSize!=None:
            self.fontSize = fontSize
        if colour!=None:
            self.colour = colour
        self.font = pygame.font.SysFont("arial", self.fontSize)
        textSurf = self.font.render(newText, True, self.colour)
        self.surface = textSurf.copy()
        self.surface = pygame.Surface((textSurf.get_width() + self.padding*2, textSurf.get_height() + self.padding*2), pygame.SRCALPHA)

        if self.bg.tag!="textBGEmpty":
            self.bg.updateSize(self.surface.get_width(),self.surface.get_height())
            self.bg.updateSurface()

            self.surface.blit(self.bg.surface, (0,0))
        self.surface.blit(textSurf, (self.padding,self.padding))
    def setBG(self, colour):
        self.bg = UIRect((0,0), "textBG", self.surface.get_width(),self.surface.get_height(), colour)
        self.updateText(self.text)
    def removeBG(self):
        self.bg.tag = "textBGEmpty"
        self.updateText(self.text)
    def updatePadding(self, newPadding):
        self.padding = newPadding
        self.updateText(self.text)

class UIRect(UIElement):
    def __init__(self, screenPos, tag:str, w:int, h:int, colour=(0,0,0)) -> None:
        super().__init__(screenPos, tag)
        self.updateRect(w, h, colour)
    def updateRect(self, w:int, h:int, colour=None):
        self.w, self.h = w, h
        self.rect = pygame.Rect(self.screenPos[0], self.screenPos[1], self.w, self.h)
        self.surface = pygame.Surface((w, h))
        if colour != None:
            self.colour = colour
        pygame.draw.rect(self.surface, self.colour, self.rect)
    def updateSurface(self):
        pygame.draw.rect(self.surface, self.colour, self.rect)
    def updateSize(self, w, h):
        self.w, self.h = w, h
        self.rect = pygame.Rect(self.screenPos[0], self.screenPos[1], self.w, self.h)
        self.surface = pygame.Surface((w, h))
        
class UIButton(UIText):
    def __init__(self, screenPos, tag:str, onClick, text="", fontSize=10, padding=20, textColour=(0, 0, 0), buttonColours=((255,255,255), (127,127,127), (0,0,0)), canHold=False) -> None:
        super().__init__(screenPos, tag, text, fontSize, textColour, padding)
        self.setBG(buttonColours[0])
        self.onClick = onClick
        self.held = False
        self.canHold = canHold
        self.buttonColours = buttonColours
    def update(self):
        tempRect = self.surface.get_rect()
        tempRect.x, tempRect.y = self.screenPos[0], self.screenPos[1]
        if tempRect.collidepoint(posx, posy):
            self.setBG(self.buttonColours[1])
            if clicked[0]:
                self.setBG(self.buttonColours[2])
                if not self.held:
                    self.held = not self.canHold
                    self.onClick()
        if not tempRect.collidepoint(posx, posy):
            self.setBG(self.buttonColours[0])

        self.held = clicked[0] or self.canHold

class UIImage(UIElement):
    def __init__(self, screenPos, tag: str, image:pygame.Surface) -> None:
        super().__init__(screenPos, tag)
        self.surface = image

pygame.time.delay(100)

editInt = pygame.image.load("editInt.png")

class LevelBlock:
    def __init__(self, x, y, w, h) -> None:
        self.rect = pygame.Rect(x, y, w, h)
        self.x, self.y, self.w, self.h = x, y, w, h
        self.ogPos = [self.x, self.y]
        self.drawEditInt = False
    def save(self):
        return f"new Platform({self.x}, {self.y}, {self.w}, {self.h}),"
    def update(self) -> None:
        global leftMouseHeld, delHeld, contextMenu
        self.drawEditInt = False
        self.rect = pygame.Rect(self.x+screenPos[0]*scale, self.y+screenPos[1]*scale, self.w*scale, self.h*scale)
        if self.rect.collidepoint(posx, posy) and clicked[0] and not leftMouseHeld and not levelBlocks[-1]==self:
            levelBlocks.remove(self)
            levelBlocks.append(self)
            leftMouseHeld = True
        
        if levelBlocks[-1]==self:
            if keys[pygame.K_LSHIFT]:
                multiply = 10 if keys[pygame.K_LCTRL] else 1
                if keys[pygame.K_w]:
                    self.y-=1*multiply
                if keys[pygame.K_s]:
                    self.y+=1*multiply
                if keys[pygame.K_a]:
                    self.x-=1*multiply
                if keys[pygame.K_d]:
                    self.x+=1*multiply
            
            if keys[pygame.K_LCTRL] and keys[pygame.K_z]:
                self.x, self.y = self.ogPos[0], self.ogPos[1]
            
            if clicked[0]:
                if keys[pygame.K_LCTRL]:
                    self.h = posy-(self.y+screenPos[1])*scale if posy-(self.y+screenPos[1])*scale>0 else 1
                    self.w = posx-(self.x+screenPos[0])*scale if posx-(self.x+screenPos[0])*scale>0 else 1

            
            if self.rect.collidepoint(posx, posy) and clicked[2]:
                contextMenu = True
                self.drawEditInt = True
                if keys[pygame.K_w]:
                    newValue = getNumberInput(f"Enter the new width.\nCurrently {self.w}.")
                    self.w = newValue if newValue!=None else self.w
                if keys[pygame.K_s]:
                    newValue = getNumberInput(f"Enter the new height.\nCurrently {self.h}.")
                    self.h = newValue if newValue!=None else self.h
                if keys[pygame.K_a]:
                    newValue = getNumberInput(f"Enter the new X position.\nCurrently {self.x}.")
                    self.x = newValue if newValue!=None else self.x
                if keys[pygame.K_d]:
                    newValue = getNumberInput(f"Enter the new Y position.\nCurrently {self.y}.")
                    self.y = newValue if newValue!=None else self.y
            
            if keys[pygame.K_DELETE] and not delHeld:
                delHeld = True
                levelBlocks.remove(self)
                del self

        else:
            self.ogPos = [self.x, self.y]
            
        
    def draw(self) -> None:
        pygame.draw.rect(win, RED if levelBlocks[-1]==self else GREY, self.rect)
        if self.drawEditInt:
            win.blit(editInt, (posx-249, posy-249))

ui = UICanvas()
# ui.addElement(UIText((20, 504), "Sample", "Hello World", 40, BLACK))

def redrawScreen():
    win.fill(WHITE)
    
    ui.draw()
    for block in levelBlocks:
        block.draw()
    #updates screen
    pygame.display.flip()


levelBlocks = []

for block in levelBlockStr:
    line = "".join(block)
    line = line.split("(")[1]
    line = line.split(")")[0]
    line = line.split(" ")
    levelBlocks.append(LevelBlock(int(line[0]), int(line[1]), int(line[2]), int(line[3])))

keys = pygame.key.get_pressed()
screenPos = (0,0)
leftMouseHeld = False
delHeld = False
run = True
scale = 1
# Main game loop
while run:
    contextMenu = False
    scrolly = 0
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            run = False
            quit()
        elif event.type == pygame.MOUSEWHEEL:
            scrolly = event.y*5
            if keys[pygame.K_LCTRL]:
                scale+=scrolly/5
                print(scale)

    
    #mouse getters
    clicked = pygame.mouse.get_pressed(num_buttons=3)

    if leftMouseHeld:
        leftMouseHeld = clicked[0]

    posx, posy = pygame.mouse.get_pos()
    #get pressed keys
    keys = pygame.key.get_pressed()

    if delHeld:
        delHeld = keys[pygame.K_DELETE]

    if not keys[pygame.K_LSHIFT]:
        if keys[pygame.K_d]:
            screenPos = (screenPos[0]-10, screenPos[1])
        if keys[pygame.K_a]:
            screenPos = (screenPos[0]+10, screenPos[1])
        if keys[pygame.K_s]:
            screenPos = (screenPos[0], screenPos[1]-10)
        if keys[pygame.K_w]:
            screenPos = (screenPos[0], screenPos[1]+10)

    ui.update()

    for block in levelBlocks:
        block.update()

    if clicked[2] and not contextMenu:
        levelBlocks.append(LevelBlock(posx-(screenPos[0])*scale, posy-(screenPos[1])*scale, 100*scale, 100*scale)) 

    if keys[pygame.K_LCTRL] and keys[pygame.K_s] and keys[pygame.K_SPACE]:
        levelBlockStr = []
        for block in levelBlocks:
            levelBlockStr.append(block.save())
        with open("level.csv", 'w', newline='') as csvfile:
            for item in levelBlockStr:
                csvfile.write(item + '\n')

    #redraw win
    redrawScreen()
    
    #for web version
    #await asyncio.sleep(0)
    
    # Set the framerate
    clock.tick(60)

