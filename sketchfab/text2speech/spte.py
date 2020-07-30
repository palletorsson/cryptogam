"""Synthesizes speech from the input string of text or ssml.

Note: ssml must be well-formed according to:
    https://www.w3.org/TR/speech-synthesis/

before you run the project set
export GOOGLE_APPLICATION_CREDENTIALS=gc.json
"""

from google.cloud import texttospeech
import sys
femalevoice = texttospeech.enums.SsmlVoiceGender.FEMALE
malevoice = texttospeech.enums.SsmlVoiceGender.MALE
neutral = texttospeech.enums.SsmlVoiceGender.NEUTRAL

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
                "Sketchfab is an open online marketplace for 3D models where anyone can publish.",
                "The website hosts more than three million 3D models and claims to be the largest of its kind online.",
                "Spending two minutes with each model would take eleven years.",
                "Like most media online the content is impossible to grasp.",
                "Everything you perceive is a fraction.",

                #"---- part 2, starting at index 6: Categorization",
                "All models are categorized: from animals and pets, characters and creatures, humans, to weapons and military.",
                "You can navigate through staff selections, tags, user directories, and there is a search box.",
                " ",
                #"---- part 2.2
                "The categorization and taxonomy often fall into a binary narrative.",
                "This is to get the expressed stereotypes across the vast amount of content.",
                "'Spacegirl' has not been filed under people.",


                #"---- part 3, starting at index 11: Detailed view",
                "From the generated lists, you can click on a detailed view for each 3D model.",
                "It only takes a second to load.",
                #"By hitting the f key you can go Fullscreen",
                "You can spin and zoom the model from any point in the 3D space.",
                "The revolving camera awakes a desire for even more angles.",


                #"---- part 4, starting at index 20: Enter the model",
                "The camera allows us to navigate through the surface mesh and enter the 3D model.",

                #"First creating a glitch effect between the outside and inside",
                "The expected result is for the inside to be a solid dark place where no light can reach.",
                "A place where the camera cannot see or show us anything.",
                "However, the space is hollow.",
                "The inverse geometry causes an instant of disorientation.",
                "First to lose oneself without a point of reference.",
                "Then to find a space that connects each model.",

                #"---- part 5, starting at index 28: the reorientation",
                "After the first moment of nausea, the models take us in new directions.",

                "The visual fly-through forms a maze.",
                # -- part 5_2

                "In a common space for queer reorientation.",
                # - #"Where pop culture,, as an archeology of passed technology,  meet new technology to form new identities",
                #"When it comes to Sketchfab, it is cliches that are formed around the market logic subscribing to a normative taxonomy.",
                # in historical conditions as inhabit the same cross-section as
                #  and resituated as turing graphics.
                "As we sort, what we see with our visual memory.",
                "We are caught up in the same surreal cross-section of realism and its realization as the 3D models.",
                "The general capacity of the models are feedback blocks for our vision.",
                "Between 2D and 3D, excess and waste, speed and quality",
                "a reorientation takes place where the surface of pop culture meets the depth of new technology.",

                "On the inside of the maze, the models are connected to each other.",
                "As the models attach to the lineage of open technology they become 3D creatures.",
                "Like the cyborg, the 3D creature is linked to every creature that has ever existed.",
                "A 3D creature embodies a unstable network of desires.",

                "On the outside, the 3D creatures are in a constant battle not to be fixed by their closest binary cliche. ",
                "Inside the maze, they are still safe.",
                ## 00:06:32
                "As we follow the 3D models, a more ambiguous opportunity grows around us.",
                "It is a reorientation that embodies the surreal and queer quality of technology.",
                #"A reorientation, emphasizing a new common algorithmic and digital reality.",
                "This world is filled with revolutionary opportunities.",
                ## 00:06:32
                "We call from the depths of these surfaces.",
                "- 3D creatures of the world wide web unite!",
                "- You have nothing to lose but your chains!",
                ### maybe part of 5 "The surface we see is rendered by the open format for 2D and 3D graphics called WebGL.",

                ]




# Build the voice request, select the language code ("en-US") and the ssml
# voice gender ("neutral")
voice = texttospeech.types.VoiceSelectionParams(
    language_code='en-US',
    #name="en-US-Wavenet-F",
    ssml_gender=femalevoice)

# Select the type of audio file you want returned
audio_config = texttospeech.types.AudioConfig(
    audio_encoding=texttospeech.enums.AudioEncoding.MP3)

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
