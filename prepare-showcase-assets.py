from pathlib import Path
import subprocess
from PIL import Image
root=Path(__file__).resolve().parent
source=root.parent/'imagesandvideosforthewebsite'
out=root/'dist/assets'
images={'ISHER SKD-I 48_5 illustration.png':'isher-drive.webp','OASIS SKM-D22 Illustration.png':'oasis-motor.webp','Motor + Drive.png':'motor-drive.webp','Simulink Modelling.png':'simulink-model.webp'}
for original,name in images.items():
    im=Image.open(source/original).convert('RGB')
    im.thumbnail((1600,1100))
    im.save(out/name,quality=90,method=6)
    print(name, (out/name).stat().st_size)
clips=[('Prodigy S.1 Software Video.mp4','prodigy-software',None),('Control Algorithm Video (4Seconds only).mp4','control-demo',4),('Servo Motor.mp4','servo-motor',None)]
for original,name,duration in clips:
    args=['ffmpeg','-y','-hide_banner','-loglevel','error','-i',str(source/original)]
    if duration: args+=['-t',str(duration)]
    subprocess.run(args+['-an','-c:v','libx264','-preset','medium','-crf','23','-pix_fmt','yuv420p','-movflags','+faststart',str(out/(name+'.mp4'))],check=True)
    subprocess.run(['ffmpeg','-y','-hide_banner','-loglevel','error','-ss','1','-i',str(out/(name+'.mp4')),'-frames:v','1','-vf','scale=1280:-2',str(out/(name+'-poster.jpg'))],check=True)
    print(name, (out/(name+'.mp4')).stat().st_size)
print('Showcase assets prepared.')
