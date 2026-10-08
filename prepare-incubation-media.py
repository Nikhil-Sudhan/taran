from pathlib import Path
import subprocess,json
root=Path(__file__).resolve().parent
out=root/'dist/assets'
source=root.parent/'media-review/iitm-research-park-cut.mp4'
if not source.exists():
    raise SystemExit('Place the 0:42-0:56 source clip at ../media-review/iitm-research-park-cut.mp4.')
def run(args):
    subprocess.run(['ffmpeg','-y','-hide_banner','-loglevel','error']+args,check=True)
run(['-i',str(source),'-an','-vf','scale=1280:720,fps=25,setsar=1','-c:v','libx264','-preset','medium','-crf','23','-pix_fmt','yuv420p','-movflags','+faststart',str(out/'iitm-research-park.mp4')])
filters='[0:v]split=2[c1][c2];[c1]trim=start=0:end=7,setpts=PTS-STARTPTS,scale=1280:720,fps=25,setsar=1[a];[1:v]trim=start=0:end=4,setpts=PTS-STARTPTS,scale=1280:720,fps=25,setsar=1[b];[c2]trim=start=7:end=14,setpts=PTS-STARTPTS,scale=1280:720,fps=25,setsar=1[c];[2:v]trim=start=0:end=4,setpts=PTS-STARTPTS,scale=1280:720,fps=25,setsar=1[d];[a][b][c][d]concat=n=4:v=1:a=0[out]'
run(['-i',str(out/'iitm-research-park.mp4'),'-i',str(out/'prodigy-software.mp4'),'-i',str(out/'control-demo.mp4'),'-filter_complex',filters,'-map','[out]','-an','-c:v','libx264','-preset','medium','-crf','23','-pix_fmt','yuv420p','-movflags','+faststart',str(out/'incubation-montage.mp4')])
for name,t in [('incubation-montage-poster.jpg',0),('iitm-aerial.webp',0),('iitm-courtyard.webp',13.96)]:
    run(['-ss',str(t),'-i',str(source),'-frames:v','1','-vf','scale=1280:-2',str(out/name)])
for name in ['iitm-research-park.mp4','incubation-montage.mp4']:
    data=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration:stream=width,height,nb_frames','-of','json',str(out/name)]))
    print(name,json.dumps(data))
