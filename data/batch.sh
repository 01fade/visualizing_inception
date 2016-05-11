#!/bin/bash
echo hello world
for file in full/*.jpg
do
    ffmpeg -i "$file" -vf scale=1280:-1 medium1280/$(basename "${file/.jpg}").jpg
done

# for another time to extract one frame every shot!
# for i in "${array[@]}"
# do
#     echo $i
# done
# declare -a array=();