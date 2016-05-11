# https://www.safaribooksonline.com/library/view/python-cookbook-3rd/9781449357337/ch06s02.html
import json
from colorthief import ColorThief

def jdefault(o):
    if isinstance(o, set):
        return list(o)
    return o.__dict__

colors = []

for x in range(1, 890):
    print "We're on time %d" % (x)

    file = 'full/' + str(x) + '.jpg'
    color_thief = ColorThief(file)
    dominant_color = color_thief.get_color(quality=1)
    print(dominant_color)

    colors.insert(x, dominant_color)
    # print(json.dumps(colors, default=jdefault))

print(json.dumps(colors, default=jdefault))
with open('colors.json', 'w') as f:
     json.dump(colors, f, default=jdefault)
