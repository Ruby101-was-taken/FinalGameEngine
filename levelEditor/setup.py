import cx_Freeze

executables = [cx_Freeze.Executable("levelEditor.py", icon="icon.ico", base = "Win32GUI")]

includedFiles=["help/", "icon.png", "level.csv", "getInput.py", "editInt.png", "icon.ico"]

packages=["pygame", "os", "csv", "copy", "webbrowser"]

cx_Freeze.setup(
    name="UNANIMATED WOMAN'S ENDING SIMULATOR",
    options={"build_exe": {"packages":packages,
                           "include_files":includedFiles}},
    executables = executables

    )

#python.exe setup.py build