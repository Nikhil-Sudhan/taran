from pathlib import Path
import subprocess,json,tempfile
root=Path(__file__).resolve().parent
out=root/'dist/assets'
source=root.parent/'media-review/iitm-research-park-cut.mp4'
if not source.exists():
    raise SystemExit('Place the 0:42-0:56 source clip at ../media-review/iitm-research-park-cut.mp4.')
def run(args):
    subprocess.run(['ffmpeg','-y','-hide_banner','-loglevel','error']+args,check=True)
run(['-i',str(source),'-t','10','-an','-vf','scale=1280:720,fps=25,setsar=1','-c:v','libx264','-preset','medium','-crf','23','-pix_fmt','yuv420p','-movflags','+faststart',str(out/'iitm-research-park.mp4')])
filters='[0:v]trim=start=0:end=5,setpts=PTS-STARTPTS,scale=1280:720,fps=25,setsar=1[a];[1:v]trim=start=0:end=3,setpts=PTS-STARTPTS,scale=1280:720,fps=25,setsar=1[b];[2:v]trim=start=0:end=2,setpts=PTS-STARTPTS,scale=1280:720,fps=25,setsar=1[c];[c][a][b]concat=n=3:v=1:a=0[out]'
run(['-i',str(out/'iitm-research-park.mp4'),'-i',str(root.parent/'imagesandvideosforthewebsite/Prodigy S.1 Software Video.mp4'),'-i',str(root.parent/'imagesandvideosforthewebsite/Control Algorithm Video (4Seconds only).mp4'),'-filter_complex',filters,'-map','[out]','-an','-c:v','libx264','-preset','medium','-crf','23','-pix_fmt','yuv420p','-movflags','+faststart',str(out/'incubation-montage.mp4')])
# Append a second aerial angle without re-encoding the first three shots.
with tempfile.TemporaryDirectory() as temp:
    temp=Path(temp)
    original=temp/'first-three.mp4'
    original.write_bytes((out/'incubation-montage.mp4').read_bytes())
    aerial=temp/'fourth-aerial.mp4'
    run(['-ss','8','-i',str(source),'-t','3','-an','-vf','scale=1280:720,fps=25,setsar=1','-c:v','libx264','-preset','medium','-crf','23','-pix_fmt','yuv420p','-movflags','+faststart',str(aerial)])
    playlist=temp/'concat.txt'
    playlist.write_text("file 'first-three.mp4'\nfile 'fourth-aerial.mp4'\n")
    run(['-f','concat','-safe','0','-i',str(playlist),'-c','copy','-movflags','+faststart',str(out/'incubation-montage.mp4')])
run(['-i',str(out/'incubation-montage.mp4'),'-frames:v','1',str(out/'incubation-montage-poster.jpg')])
for name,t in [('iitm-aerial.webp',0),('iitm-courtyard.webp',13.96)]:
    run(['-ss',str(t),'-i',str(source),'-frames:v','1','-vf','scale=1280:-2',str(out/name)])
for name in ['iitm-research-park.mp4','incubation-montage.mp4']:
    data=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration:stream=width,height,nb_frames','-of','json',str(out/name)]))
    print(name,json.dumps(data))
