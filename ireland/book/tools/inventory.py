#!/usr/bin/env python3
"""Inventory the raw Ireland photos: timestamps, GPS, nearest known place."""
import json, os, math, sys
from datetime import datetime, timedelta
from PIL import Image
from PIL.ExifTags import TAGS, GPSTAGS
import pillow_heif
pillow_heif.register_heif_opener()

RAW = os.path.join(os.path.dirname(__file__), 'raw')

PLACES = {
    'Dulles (IAD)': (38.951, -77.448),
    'Dublin Airport': (53.428, -6.244),
    'Loughrea / Cahertinna area': (53.197, -8.567),
    'Ballybrit Racecourse': (53.299, -8.996),
    'Birr': (53.097, -7.913),
    'Wildlands Moycullen': (53.336, -9.179),
    'Shannon Airport': (52.702, -8.925),
    'Aillwee / Burren': (53.089, -9.143),
    'Flaggy Shore / New Quay': (53.155, -9.113),
    'Galway City': (53.272, -9.049),
    'Kinvara': (53.139, -8.937),
    'Traught Beach': (53.155, -8.978),
}

def haversine(a, b):
    R = 6371.0
    la1, lo1, la2, lo2 = map(math.radians, [a[0], a[1], b[0], b[1]])
    h = math.sin((la2-la1)/2)**2 + math.cos(la1)*math.cos(la2)*math.sin((lo2-lo1)/2)**2
    return 2*R*math.asin(math.sqrt(h))

def to_deg(v, ref):
    d = float(v[0]) + float(v[1])/60 + float(v[2])/3600
    return -d if ref in ('S','W') else d

items = []
for name in sorted(os.listdir(RAW)):
    path = os.path.join(RAW, name)
    ext = name.rsplit('.',1)[-1].upper()
    rec = {'file': name, 'ext': ext, 'bytes': os.path.getsize(path)}
    if ext in ('JPG','JPEG','HEIC','PNG'):
        try:
            im = Image.open(path)
            rec['w'], rec['h'] = im.size
            exif = im.getexif()
            dto = exif.get(306)
            ifd = exif.get_ifd(0x8769) if exif else {}
            dto = (ifd.get(36867) or dto) if ifd else dto
            if dto: rec['taken'] = str(dto)
            gps = exif.get_ifd(0x8825) if exif else {}
            if gps and 2 in gps and 4 in gps:
                lat = to_deg(gps[2], gps.get(1,'N'))
                lon = to_deg(gps[4], gps.get(3,'E'))
                rec['lat'], rec['lon'] = round(lat,5), round(lon,5)
                best = min(PLACES.items(), key=lambda kv: haversine((lat,lon), kv[1]))
                rec['near'] = best[0]
                rec['km'] = round(haversine((lat,lon), best[1]), 2)
            model = exif.get(272)
            if model: rec['camera'] = str(model)
        except Exception as e:
            rec['error'] = str(e)[:80]
    items.append(rec)

json.dump(items, open(os.path.join(os.path.dirname(__file__),'inventory.json'),'w'), indent=0)

# summary
imgs = [i for i in items if i['ext'] in ('JPG','JPEG','HEIC','PNG')]
with_ts = [i for i in imgs if 'taken' in i]
with_gps = [i for i in imgs if 'lat' in i]
print(f"images {len(imgs)} | with timestamp {len(with_ts)} | with GPS {len(with_gps)} | videos {len(items)-len(imgs)}")
bydate = {}
for i in with_ts:
    d = i['taken'][:10]
    bydate.setdefault(d, []).append(i)
for d in sorted(bydate):
    rows = bydate[d]
    places = {}
    for r in rows:
        places[r.get('near','no-gps')] = places.get(r.get('near','no-gps'),0)+1
    print(d, len(rows), 'photos —', dict(sorted(places.items(), key=lambda x:-x[1])))
