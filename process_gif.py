from PIL import Image, ImageSequence
import json
import os

gif_path = 'public/coffee.gif'
static_path = 'public/coffee_static.png'
meta_path = 'public/gif_meta.json'

try:
    with Image.open(gif_path) as im:
        # Save first frame as static image
        im.seek(0)
        im.save(static_path)
        
        # Calculate duration
        duration = 0
        for frame in ImageSequence.Iterator(im):
            duration += frame.info.get('duration', 100) # Default to 100ms if not specified
        
        # Save metadata
        with open(meta_path, 'w') as f:
            json.dump({'duration': duration}, f)
            
        print(f"Success: Static image saved to {static_path}, Duration: {duration}ms")

except Exception as e:
    print(f"Error: {e}")
