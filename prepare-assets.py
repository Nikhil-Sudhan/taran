from pathlib import Path
import shutil, subprocess
from PIL import Image
root=Path(__file__).resolve().parent
src=root.parent
out=root/'dist/assets'
files={'ISA Animation.mp4':'isa-animation.mp4','Helvetica LT Pro/Helvetica LT Pro Roman.ttf':'helvetica-roman.ttf','Helvetica LT Pro/Helvetica LT Pro Bold.ttf':'helvetica-bold.ttf','Space Kaur (Solid Rocket) Logo.png':'spacekaur-logo.png','Taran Professional Photo.png':'taran.webp','Rohan’s Passport Size Photo.jpg':'rohan.webp','Dr. HSN Murthy.png':'murthy.webp','Dr. David.png':'david.webp'}
for a,b in files.items():
    if b.endswith('.webp'):
        im=Image.open(src/a).convert('RGB'); im.thumbnail((1200,1400)); im.save(out/b,quality=90)
    else: shutil.copyfile(src/a,out/b)
for i,p in enumerate(sorted((src/'WhatsApp Unknown 2026-10-06 at 8.17.31 PM').glob('*.mp4'))):
    shutil.copyfile(p,out/f'lab-{i+1}.mp4')
    subprocess.run(['ffmpeg','-y','-hide_banner','-loglevel','error','-ss','1','-i',str(p),'-frames:v','1','-vf','scale=1200:-2',str(out/f'lab-{i+1}.png')],check=True)
print('Assets prepared.')
