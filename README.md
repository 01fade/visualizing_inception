# Visualizing Inception

##Data sources

###Shots, shot length, dream levels/reality

[Inception Cinemtrics submitted by David Boterbergh](http://www.cinemetrics.lv/movie.php?movie_ID=7742)

I took the table from their there, converted it into a csv. I also added the time from the first frame of my file (Syncopy logo etc.) to the actual beginning of the movie, which is 405 deciseconds [newend column].

An unnecessary step for now, but maybe useful in the future if I wanted to extract one frame for each shot. I can use the column [withpadding] where I added a little bit to [newend], in order to have a frame that is actually meaningful to the shot. Again this is for the future, as I have to then figure out how to display 2500+ images.

Other stats from that link:

Reality:
- 664 shots, 39.49 min

Limbo:
- 211 shots, 13.05 min

Cobb:
- 273 shots, 12.39 min

Dream Level 1:
- 691 shots, 34.71 min

Dream Level 2:
- 529 shots, 25.32 min

Dream Level 3:
- 389 shots, 15.54 min


###Movie frames

#####Every Minute
-ss half of frame rate because it always tries to find the frame from the middle this way we get frame exactly at 60 seconds instead of 30 seconds

`ffmpeg -ss 00:30 -i inception.mp4 -vcodec mjpeg -qscale:v 1 -start_number 1 -vf fps=1/60 "%02d.png"`

#####Every 10 seconds
index number * 10 = time in movie, since we start at 1
This is what I ended up using. The result: 889 frames for Inception.

`ffmpeg -ss 00:05 -i inception.mp4 -vcodec mjpeg -qscale:v 1 -start_number 1 -vf fps=1/10 "1920/%d.jpg"`

#####Get frames at specific time
For future use case, loop through the list of shots

`ffmpeg -ss 00:01:00.5 -i inception.mp4 -vf 1 %d.jpg`

#####Resize image
see "batch.sh", how I converted all frames into a smaller size to display online

`ffmpeg -i inception.jpg -vf scale=1080:-1 inception_1080.jpg`

###Average colors
[Color Thief](https://github.com/fengsp/color-thief-py)
For 889 images this took about an hour. I applied to functions on the full size 1920x800px frames that I extracted before.