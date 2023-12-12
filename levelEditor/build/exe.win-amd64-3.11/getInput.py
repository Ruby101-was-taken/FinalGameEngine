
import tkinter as tk
from tkinter import simpledialog,colorchooser

def getNumberInput(askText, minValue=-float('inf'), maxValue=float('inf')):
    while True:
        root = tk.Tk()
        root.withdraw()
        
        userInput = simpledialog.askstring("Input", askText)
        
        try:
            # Try converting the input to a number
            numInput = float(userInput)
            
            # Check if the number is within the specified range
            if minValue <= numInput <= maxValue:
                return numInput
            else:
                print(f"Please enter a number between {minValue} and {maxValue}.")
        except ValueError:
            print("Please enter a valid number.")
        except TypeError:
            return None
        
def getStringInput(askText):
    while True:
        root = tk.Tk()
        root.withdraw()
        
        userInput = simpledialog.askstring("Input", askText)
        
        return userInput
    
def getColourInput(askText):
 
    return colorchooser.askcolor(title = askText) 