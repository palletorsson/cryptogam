"""Synthesizes speech from the input string of text or ssml.

Note: ssml must be well-formed according to:
    https://www.w3.org/TR/speech-synthesis/

before you run the project set
export GOOGLE_APPLICATION_CREDENTIALS=gc.json
"""

from google.cloud import texttospeech
import sys
c = texttospeech.enums.SsmlVoiceGender.FEMALE
malevoice = texttospeech.enums.SsmlVoiceGender.MALE
neutral = texttospeech.enums.SsmlVoiceGender.NEUTRAL

unspecific = texttospeech.enums.SsmlVoiceGender.SSML_VOICE_GENDER_UNSPECIFIED

# Instantiates a client
client = texttospeech.TextToSpeechClient()
multi = False
textlistemo = [
            "angry" ,
            "disgust",
            "scared",
            "happy",
            "sad",
            "surprised",
            "neutral"]
textlist = [    #"---- part 1, starting at index 0 : Sketchfab",

                "This video uses 3D models from Sketchfab.com.",
                "SketchFab is an open online marketplace for 3D models, and anyone can publish there.",
                "The site hosts more than three million 3D models and claims to be the largest of its kind in the online realm.",
                "Spending two minutes with each model would take eleven years.",
                "Like most online media, the content is incalculable. ",
                "Everything you have time to perceive is a mere fraction.",


                #"---- part 2, starting at index 6: Categorization",
                "All of the models are categorized: Animals and Pets, Characters and Creatures, People, Weapons and Military.",
                "A search box helps users orient themselves among a massive number of 3D models, and also lists with staff picks and user collections. ",

                #"---- part 2.2
                "The taxonomy gravitates towards a heteronormative gaze and falls into a binary narrative. ",
                "By highlighting the expressed stereotype, the models have a better chance of getting across in the vast amount of content. ", # changed
                "'Spacegirl' is not filed under people.",


                #"---- part 3, starting at index 11: Detailed view",
                "When a 3D model has been selected, it takes a short time to load. ",
                #"By hitting the f key you can go Fullscreen",
                "You can spin the model in the 3D space and look at it from any angle.",
                "The revolving camera awakes a desire for more.",


                #"---- part 4, starting at index 20: Enter the model",
                "Our camera is allowed to pass through the surface and view the inside of the 3D model.", # changed

                #"First creating a glitch effect between the outside and inside",
                "Maybe one could expect darkness because no light reflects in a solid mass?",
                # "A place where the camera cannot see or show us anything.", # remove?
            
                "However, the models are mostly hollow spaces.",
                "The inverse geometry causes an instant of disorientation.",
                "First, to lose oneself without a point of reference.", #changed
                "Then to find a space that connects each 3D model.", #changed

                #"---- part 5, starting at index 28: the reorientation",
                "When the initial nausea has subsided, the models take us in new directions.",

                "The visual fly-through forms a maze and the 3D models weave into each other. ", #changed !
                # -- part 5_2


                "In here, we can break away from outside stereotypes.",  # new !

                "In a common space for queer reorientation.",
                # - #"Where pop culture,, as an archeology of passed technology,  meet new technology to form new identities",
                #"When it comes to Sketchfab, it is cliches that are formed around the market logic subscribing to a normative taxonomy.",
                # in historical conditions as inhabit the same cross-section as
                # and resituated as turing graphics.
                "As we sort, what we see with our visual memory.",
                "We are caught up in the same surreal cross-section of realism and its realization as the 3D models.",

                "Between 2D and 3D, excess and waste, speed and quality.",
                "The general capacity of the models is feedback blocks for our vision.", # changed

                "A reorientation takes place where the surface of pop culture meets the depth of new technology.", # change

                "On the inside of the maze, the models connect.", # changed
                "On the outside, they are in a constant battle not to be fixed by their closest binary cliche. ",

                "Inside the maze, they are still safe.",

                "The models attach to the lineage of open technology and become 3D creatures.",  # changed

                "Like the cyborg, the 3D creature links to every creature that has ever existed.",  # changed
                "A 3D creature embodies a unstable network of desires.", #?

                ## 00:06:32
                "As we follow the 3D models, anthropomorphic opportunity grows around us.",
                "It is a reorientation that embodies the surreal and queer quality of technology.",
                #"A reorientation, emphasizing a new common algorithmic and digital reality.",
                "It is a world filled with revolutionary opportunities.",
                ## 00:06:32
                "We call from the depths of these surfaces.",
                #"- We are queer; we are technology.",  

                "- 3D creatures of the world wide web unite!",
                "- You have nothing to lose but your chains!",
                ### maybe part of 5 "The surface we see is rendered by the open format for 2D and 3D graphics called WebGL.",

                ]

# Build the voice request, select the language code ("en-US") and the ssml
# voice gender ("neutral")
voice = texttospeech.types.VoiceSelectionParams(
    language_code='en-US',
    name="en-US-Wavenet-F",
        ssml_gender=unspecific)

# Select the type of audio file you want returned
audio_config = texttospeech.types.AudioConfig(
    audio_encoding=texttospeech.enums.AudioEncoding.MP3, speaking_rate=0.9)

# Perform the text-to-speech request on the text input with the selected
# voice parameters and audio file type
if (multi == False):
    index = int(sys.argv[1])
    print (index, " : ", textlist[index])
    text = textlist[index]
    synthesis_input = texttospeech.types.SynthesisInput(text=text)
    response = client.synthesize_speech(synthesis_input, voice, audio_config)
    text = text.replace(" ", "_")
    filename = text[:20]
    # The response's audio_content is binary.
    with open(filename+'.mp3', 'wb') as out:
        # Write the response to the output file.
        out.write(response.audio_content)
        print('Audio content written to file '+ filename)
else:
    for text in textlist:
        # Set the text input to be synthesized
        synthesis_input = texttospeech.types.SynthesisInput(text=text)
        response = client.synthesize_speech(synthesis_input, voice, audio_config)
        text = text.replace(" ", "_")
        filename = text[:20]
        # The response's audio_content is binary.
        with open(filename+'.mp3', 'wb') as out:
            # Write the response to the output file.
            out.write(response.audio_content)
            print('Audio content written to file '+ filename)
