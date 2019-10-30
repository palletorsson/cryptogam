

from bs4 import BeautifulSoup

import re

import requests

import urllib
import json
url = "https://en.wikipedia.org/wiki/Modern_art"
index = 0
req = requests.get(url)

print(req)

data = req.text

soup = BeautifulSoup(data)

all_images = soup.find_all('img')

for thumb in all_images:
   if thumb.parent.name == 'a':
       imglink = thumb.get('src')
       imglink = "https:"+imglink
       imglink = re.sub(r'/thumb', '', imglink)
       parts = imglink.rsplit('/',1)
       imglink = parts[0]

       if imglink.lower().endswith(".jpg"):
           filename = "img" + str(index) + ".jpg"
           filepath = "img/"+filename
           urllib.urlretrieve(imglink, filepath)
           index = index + 1

all_texts = soup.find_all(class_="thumbcaption")
data = []
count = 0

for text in all_texts:
    data.append({'imgname': "img"+str(count), "text": text.text})
    count = count + 1

with open('data.json', 'w') as outfile:
    json.dump(data, outfile)
