with open('temp.pdf', 'wb') as theFile:
  theFile.write(base64.b64decode(base64String))