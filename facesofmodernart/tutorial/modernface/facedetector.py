import cv2
import sys
import json
from keras.preprocessing.image import img_to_array
import imutils
import cv2
from keras.models import load_model
import numpy as np
import os
from os.path import isfile, join
import time
# Get user supplied values
imagePath = "./img/img2.jpg"
cascPath = "./FaceDetect-master/haarcascade_frontalface_default.xml"
emotion_model_path = './models/_mini_XCEPTION.102-0.66.hdf5'

# hyper-parameters for bounding boxes shape
# loading models
emotion_classifier = load_model(emotion_model_path, compile=False)
EMOTIONS = ["angry" ,"disgust","scared", "happy", "sad", "surprised",
 "neutral", "happy-sad"]

with open('data.json') as json_file:
    data = json.load(json_file)

for img in data:
    imagePath = "./img/"+img['imgname']+".jpg"
    # Create the haar cascade
    faceCascade = cv2.CascadeClassifier(cascPath)

    # Read the image
    image = cv2.imread(imagePath)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Detect faces in the image
    faces = faceCascade.detectMultiScale(
        gray,
        scaleFactor=1.1,
        minNeighbors=5,
        minSize=(30, 30)
    )

    print("Found {0} faces!".format(len(faces)))
    img['emotion'] = {}
    # Draw a rectangle around the faces
    for (x, y, w, h) in faces:
        dimname = str(x)+"_"+str(y)+"_"+str(w)+"_"+str(h)
        print(dimname)
        roi = gray[y:y + h, x:x + w]
        roi = cv2.resize(roi, (64, 64))
        roi = roi.astype("float") / 255.0
        roi = img_to_array(roi)
        roi = np.expand_dims(roi, axis=0)
        preds = emotion_classifier.predict(roi)[0].tolist()
        img['emotion'][dimname] = preds
        crop_img = image[y-10:y+h+10, x-10:x+w+10]
        cv2.imwrite("./faces/"+img['imgname']+"_"+str(x+y)+".jpg", crop_img)

print(data)
with open('data2.json', 'w') as outfile:
    json.dump(data, outfile)
    cv2.waitKey(0)
