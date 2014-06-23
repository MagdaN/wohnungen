import sys,json
import numpy as np


def flip_geojson_coordinates(geo):
    if isinstance(geo, dict):
        for k, v in geo.iteritems():
            if k == "coordinates":
                z = np.asarray(geo[k])
                f = z.flatten()
                geo[k] = np.dstack((f[1::2], f[::2])).reshape(z.shape).tolist()
            else:
                flip_geojson_coordinates(v)
    elif isinstance(geo, list):
        for k in geo:
            flip_geojson_coordinates(k)


try:
    filename = sys.argv[1]
except IndexError:
    sys.exit('Usage: change_coordinates.py FILE')

data = json.loads(open(filename).read())

#print data
flip_geojson_coordinates(data)
print data



        


                        