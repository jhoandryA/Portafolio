"""Build Jhoandry's original stylized, fully volumetric portfolio character.
Run: blender --background --python scripts/build-character.py
No reference-site models or image planes are used. Facial proportions and hair
are modeled from public/Jhoandry.png; all geometry is generated in this file.
"""
import bpy, math, os, bmesh, tempfile, subprocess
from mathutils import Vector
from math import sin, cos, pi, exp, sqrt

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'public', 'models')
VALIDATION = os.environ.get('CHARACTER_PREVIEW_DIR', os.path.join(tempfile.gettempdir(), 'jhoandry-character'))
os.makedirs(OUT, exist_ok=True)
os.makedirs(VALIDATION, exist_ok=True)
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)

# Named local groups are the animation pivots used by Three.js.
def group(name, parent=None, location=(0,0,0)):
    o=bpy.data.objects.new(name,None);bpy.context.collection.objects.link(o)
    o.parent=parent;o.location=location;return o
root=group('JhoandryCharacter')
body=group('Body',root)
head=group('HeadPivot',root,(0,0,3.32))
left_eye=group('EyeLeft',head,(-.305,-.497,.035))
right_eye=group('EyeRight',head,(.305,-.497,.035))
left_brow=group('BrowLeft',head,(-.305,-.53,.30))
right_brow=group('BrowRight',head,(.305,-.53,.30))
left_hand=group('HandLeft',root,(-.40,-.75,1.65))
right_hand=group('HandRight',root,(.40,-.75,1.65))
desk=group('Workstation',root)

# Values are converted from sRGB to linear, so the GLB preserves the palette.
def linear(v): return v/12.92 if v<.04045 else ((v+.055)/1.055)**2.4
def material(name, color, rough=.5, metal=0, coat=0):
    values=[int(color[i:i+2],16)/255 for i in (1,3,5)]
    m=bpy.data.materials.new(name);m.diffuse_color=(*[linear(v) for v in values],1)
    m.use_nodes=True;p=m.node_tree.nodes.get('Principled BSDF')
    p.inputs['Base Color'].default_value=m.diffuse_color
    p.inputs['Roughness'].default_value=rough;p.inputs['Metallic'].default_value=metal
    p.inputs['Coat Weight'].default_value=coat
    return m
skin=material('Warm tan skin','#d6cbc5',.58,coat=.03)
skin_inner=material('Inner ear and eyelids','#bfb2b0',.65)
lip=material('Natural warm lips','#c3b7b5',.62)
brow_mat=material('Natural dark eyebrows','#201d22',.54)
crease=material('Soft facial creases','#91838c',.7)
hair=material('Swept black hair','#161419',.32,coat=.08)
hair_ridge=material('Hair sculpt highlights','#201d23',.38,coat=.06)
white=material('Eye whites','#ede8e9',.36,coat=.12)
iris=material('Brown iris','#55443d',.3,coat=.18)
iris_rim=material('Iris limbal ring','#2c252e',.32)
pupil=material('Pupils','#090e13',.15,coat=.5)
catchlight=material('Eye catchlights','#ffffff',.12)
navy=material('Navy jacket','#d8d4d6',.68)
navy_dark=material('Jacket lapels and trousers','#bcb6bd',.66)
shirt=material('Ivory shirt','#e8e1dc',.8)
tie=material('Navy tie','#28415b',.52)
sole=material('Shoe soles','#afa8b0',.7)
leather=material('Graphite shoes','#d0c8ce',.48,coat=.08)
metal=material('Brushed slate metal','#c4bac2',.5,.18)
desk_top=material('Ice desk top','#e7dfd9',.6,.04)
keys=material('Keyboard keys','#a79ca9',.64)
screen=material('Monitor glass','#282329',.4,.08,coat=.08)
cyan=material('Cyan details','#e7b69e',.46,.1)

# Geometry helpers; curved surfaces are real geometry rather than textures.
def mesh(name, verts, faces, mat, parent):
    data=bpy.data.meshes.new(name);data.from_pydata(verts,[],faces);data.update()
    o=bpy.data.objects.new(name,data);bpy.context.collection.objects.link(o)
    o.parent=parent;o.data.materials.append(mat)
    for p in data.polygons:p.use_smooth=True
    return o

def uv(name, loc, scale, mat, parent, seg=40, rings=24):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=seg,ring_count=rings,location=(0,0,0))
    o=bpy.context.object;o.name=name;o.parent=parent;o.location=loc;o.scale=scale
    o.data.materials.append(mat)
    for p in o.data.polygons:p.use_smooth=True
    return o

def box(name,loc,size,radius,mat,parent):
    bpy.ops.mesh.primitive_cube_add(size=1,location=(0,0,0))
    o=bpy.context.object;o.name=name;o.parent=parent;o.location=loc;o.scale=size
    bpy.ops.object.transform_apply(location=False,rotation=False,scale=True)
    o.data.materials.append(mat)
    if radius:
        b=o.modifiers.new('Soft manufactured edges','BEVEL');b.width=radius;b.segments=3
        bpy.context.view_layer.objects.active=o;bpy.ops.object.modifier_apply(modifier=b.name)
    for p in o.data.polygons:p.use_smooth=True
    n=o.modifiers.new('Weighted surface normals','WEIGHTED_NORMAL');n.keep_sharp=True
    bpy.ops.object.modifier_apply(modifier=n.name)
    return o

def tube(name,points,radii,mat,parent,sides=12):
    verts=[];faces=[];previous_a=None
    for i,point in enumerate(points):
        p=Vector(point)
        tangent=Vector(points[min(i+1,len(points)-1)])-Vector(points[max(0,i-1)])
        tangent.normalize();ref=Vector((0,0,1))
        if abs(tangent.dot(ref))>.92:ref=Vector((0,1,0))
        a=tangent.cross(ref).normalized() if previous_a is None else (previous_a-tangent*previous_a.dot(tangent)).normalized()
        b=tangent.cross(a).normalized();previous_a=a
        radius=radii[i] if isinstance(radii,list) else radii
        if isinstance(radius,tuple):ra,rb=radius
        else:ra=rb=radius
        for j in range(sides):
            q=p+a*(ra*cos(2*pi*j/sides))+b*(rb*sin(2*pi*j/sides));verts.append(q)
    for i in range(len(points)-1):
        for j in range(sides):
            k=i*sides+j;n=i*sides+(j+1)%sides
            faces.append((k,n,n+sides,k+sides))
    faces.append(tuple(reversed(range(sides))))
    faces.append(tuple((len(points)-1)*sides+j for j in range(sides)))
    return mesh(name,verts,faces,mat,parent)

def bezier(a,b,c,d,n=24):
    a,b,c,d=map(Vector,(a,b,c,d))
    return [a*(1-t)**3+b*3*t*(1-t)**2+c*3*t*t*(1-t)+d*t**3 for t in [i/(n-1) for i in range(n)]]

def interp(keys,x):
    for i in range(len(keys)-1):
        a,b=keys[i:i+2]
        if x<=b[0]:
            t=max(0,min(1,(x-a[0])/(b[0]-a[0])))
            prev=keys[max(0,i-1)];nxt=keys[min(len(keys)-1,i+2)]
            m0=(b[1]-prev[1])/(b[0]-prev[0]);m1=(nxt[1]-a[1])/(nxt[0]-a[0])
            return max(.015,(2*t**3-3*t*t+1)*a[1]+(t**3-2*t*t+t)*m0*(b[0]-a[0])+(-2*t**3+3*t*t)*b[1]+(t**3-t*t)*m1*(b[0]-a[0]))
    return keys[-1][1]

def gauss(x,z,cx,cz,sx,sz):return exp(-((x-cx)/sx)**2-((z-cz)/sz)**2)

# An oval face, tapered jaw, straight bridge and broad swept hair follow the photo.
width_profile=[(-1,.12),(-.94,.33),(-.78,.51),(-.56,.64),(-.25,.70),(.1,.72),(.42,.72),(.7,.69),(.9,.49),(1,.02)]
depth_profile=[(-1,.12),(-.88,.33),(-.55,.48),(-.1,.535),(.45,.54),(.8,.43),(1,.03)]
verts=[];faces=[];rows=88;segments=112
for i in range(rows+1):
    t=-1+2*i/rows;z=t*.86
    for j in range(segments):
        angle=2*pi*j/segments;c=cos(angle);x=interp(width_profile,t)*sin(angle)
        y=-interp(depth_profile,t)*(abs(c)**.44)*(1 if c>=0 else -1)
        if c>0:
            front=max(0,c)**5
            sculpt=-.085*gauss(x,z,0,.01,.11,.30)
            sculpt-=.25*gauss(x,z,0,-.20,.13,.15)
            sculpt-=.075*(gauss(x,z,-.11,-.18,.08,.07)+gauss(x,z,.11,-.18,.08,.07))
            sculpt+=.055*(gauss(x,z,-.30,.11,.22,.145)+gauss(x,z,.30,.11,.22,.145))
            sculpt-=.033*(gauss(x,z,-.41,-.18,.22,.23)+gauss(x,z,.41,-.18,.22,.23))
            sculpt-=.040*gauss(x,z,0,-.43,.25,.10)
            sculpt-=.035*gauss(x,z,0,-.69,.27,.13)
            y+=sculpt*front
        verts.append((x,y,z))
for i in range(rows):
    for j in range(segments):
        a=i*segments+j;b=i*segments+(j+1)%segments
        faces.append((a,b,b+segments,a+segments))
faces.append(tuple(reversed(range(segments))))
faces.append(tuple(rows*segments+j for j in range(segments)))
face=mesh('Sculpted oval face',verts,faces,skin,head)
# Painted vertex color gives extremely subtle warmth around nose and cheeks.
colors=face.data.color_attributes.new(name='SkinTone',type='FLOAT_COLOR',domain='CORNER')
base=skin.diffuse_color
for poly in face.data.polygons:
    for index in poly.loop_indices:
        v=face.data.vertices[face.data.loops[index].vertex_index].co
        warmth=(gauss(v.x,v.z,-.44,-.22,.19,.16)+gauss(v.x,v.z,.44,-.22,.19,.16))*.07 if v.y<0 else 0
        colors.data[index].color=(base[0]*(1+warmth*.35),base[1]*(1-warmth),base[2]*(1-warmth),1)
vc=skin.node_tree.nodes.new('ShaderNodeVertexColor');vc.layer_name='SkinTone'
skin.node_tree.links.new(vc.outputs['Color'],skin.node_tree.nodes.get('Principled BSDF').inputs['Base Color'])
# Only the face uses vertex color; the other skin meshes keep the same base color.
plain_skin=skin.copy();plain_skin.name='Tan hands and neck'
plain_skin.node_tree.links.clear()
plain_skin.node_tree.links.new(plain_skin.node_tree.nodes.get('Principled BSDF').outputs['BSDF'],plain_skin.node_tree.nodes.get('Material Output').inputs['Surface'])

for side in [-1,1]:
    ear=uv('Ear', (side*.725,.015,.015),(.14,.12,.235),plain_skin,head)
    uv('Ear concha',(side*.778,-.074,.01),(.078,.036,.15),skin_inner,head,32,20)
    points=[(side*(.77+.048*cos(a)),-.105,.015+.13*sin(a)) for a in [i*pi*1.7/30-.65*pi for i in range(31)]]
    tube('Ear helix',points,.023,plain_skin,head,8)
    uv('Nostril',(side*.075,-.725,-.29),(.018,.008,.009),crease,head,20,12)

uv('Sculpted nose tip',(0,-.73,-.20),(.11,.125,.16),plain_skin,head,48,28)

# Almond eye openings, convex corneas, brown irises and sculpted eyelids.
for eye in [left_eye,right_eye]:
    uv('Eyeball',(0,.045,-.015),(.218,.125,.143),white,eye,48,28)
    uv('Limbal ring',(0,-.084,-.022),(.110,.016,.110),iris_rim,eye,40,24)
    uv('Brown iris',(0,-.095,-.022),(.096,.010,.098),iris,eye,40,24)
    uv('Pupil',(0,-.104,-.022),(.049,.007,.052),pupil,eye,32,20)
    uv('Softbox catchlight',(-.026,-.113,.031),(.020,.004,.018),catchlight,eye,20,12)
    uv('Small catchlight',(.023,-.112,-.035),(.008,.003,.008),catchlight,eye,16,10)
    for upper in [True,False]:
        points=[]
        for i in range(33):
            t=i*pi/32;x=-.203*cos(t)
            z=(.025 if upper else -.128)*sin(t)
            y=-.031-.045*sin(t)
            points.append((x,y,z))
        tube('Upper sculpted lid' if upper else 'Lower sculpted lid',points,[.009+.010*sin(i*pi/32) for i in range(33)],plain_skin,eye,10)
    # Extra upper skin shell narrows the white sphere into a relaxed almond.
    verts=[];faces=[]
    for i in range(33):
        t=i*pi/32;x=-.204*cos(t)
        for k in range(5):
            r=k/4;z=(.024+.195*r)*sin(t)
            y=-.027-.10*sin(t)+.16*r**3
            verts.append((x,y,z))
    for i in range(32):
        for k in range(4):
            a=i*5+k;faces.append((a,a+1,a+6,a+5))
    mesh('Upper orbital skin',verts,faces,plain_skin,eye)
    lower=[(x,y+.018,-(.125+(.215-.024)*k/4)*sin(i*pi/32)) for i in range(33) for k in range(5) for x,y,z in [verts[i*5+k]]]


for side,brow in [(-1,left_brow),(1,right_brow)]:
    points=[]
    for i in range(25):
        t=i/24;x=-.205+.41*t
        z=.018*sin(t*pi)-side*.022*x/.205
        points.append((x,-.004-.016*sin(t*pi),z))
    tube('Defined eyebrow',points,[(.014+.005*sin(i*pi/24),.022+.006*sin(i*pi/24)) for i in range(25)],brow_mat,brow,10)

# Closed natural lips; no pasted texture or separate smile sphere.
for upper in [True,False]:
    verts=[];faces=[]
    for i in range(49):
        t=-1+2*i/48;x=t*.275;seam=-.437+.055*t*t
        for j in range(7):
            v=j/6
            thickness=(.016 if upper else .025)*(max(0,1-t*t)**.7)
            if upper:thickness*=.86+.24*exp(-((abs(t)-.28)/.18)**2)
            z=seam+(1 if upper else -1)*thickness*v
            y=-.548-.034*(1-t*t)*sin(v*pi*.78)
            verts.append((x,y,z))
    for i in range(48):
        for j in range(6):
            a=i*7+j;faces.append((a,a+1,a+8,a+7))
    mesh('Upper lip' if upper else 'Lower lip',verts,faces,lip,head)
points=[(t*.276,-.555,-.437+.055*t*t) for t in [-1+2*i/48 for i in range(49)]]
tube('Mouth seam',points,[.004+.003*sin(i*pi/48) for i in range(49)],crease,head,8)

# Broad, smooth quiff with a subtle side sweep: the reference clay silhouette,
# with the photograph informing only the part and the softened face proportions.
def hair_point(u,theta):
    c=cos(theta)
    boundary=.08+.57*max(0,c)**1.1-.31*max(0,-c)
    boundary+=.025*sin(theta*2)*max(0,c)
    polar=math.acos(max(-1,min(1,boundary)))*(1-u)
    t=cos(polar)
    x=(interp(width_profile,t)+.055)*sin(theta)*(1-u**8)-.06*sin(u*pi)
    y=-(interp(depth_profile,t)+.08)*(abs(c)**.44)*(1 if c>=0 else -1)*(1-u**8)+.018
    z=.86*t+.18*sin(u*pi/2)+.13*exp(-((x+.25)/.55)**2)*sin(u*pi)**.8
    return (x,y,z)
verts=[];faces=[];hair_rows=38;hair_segs=112
for i in range(hair_rows+1):
    for j in range(hair_segs):verts.append(hair_point(i/hair_rows,j*2*pi/hair_segs))
for i in range(hair_rows):
    for j in range(hair_segs):
        a=i*hair_segs+j;b=i*hair_segs+(j+1)%hair_segs
        faces.append((a,b,b+hair_segs,a+hair_segs))
mesh('Smooth sculpted quiff',verts,faces,hair,head)
# Two large flowing sculpted locks; fine metallic strands are deliberately absent.
for i in range(2):
    q=i/2
    points=bezier((.46,-.49+q*.10,.66+q*.10),(.06,-.66+q*.12,1.17+q*.02),(-.56,-.34+q*.12,1.13),(-.69,.12+q*.16,.60+q*.10),34)
    tube('Broad swept quiff',points,[(.005+.085*max(0,sin(j*pi/33))**.65,.005+.050*max(0,sin(j*pi/33))**.65) for j in range(34)],hair,head,16)
for side in [-1,1]:
    points=bezier((side*.69,-.06,.55),(side*.76,-.04,.35),(side*.74,.01,.05),(side*.70,.015,-.14),22)
    tube('Tapered sideburn',points,[.012+.048*(1-i/21) for i in range(22)],hair,head,10)

# Seated body: curved jacket, shirt, collar and a restrained navy tie.
uv('Neck',(0,.025,2.38),(.235,.235,.25),plain_skin,body)
verts=[];faces=[];levels=[(1.25,.54,.30),(1.5,.62,.33),(1.9,.69,.355),(2.20,.80,.34),(2.35,.65,.30),(2.43,.28,.225)]
for z,rx,ry in levels:
    for i in range(64):
        a=2*pi*i/64;verts.append((rx*sin(a),ry*cos(a)+.035,z))
for j in range(len(levels)-1):
    for i in range(64):
        a=j*64+i;b=j*64+(i+1)%64;faces.append((a,b,b+64,a+64))
faces += [tuple(reversed(range(64))),tuple((len(levels)-1)*64+i for i in range(64))]
torso=mesh('Tailored rounded jacket',verts,faces,navy,body)
sub=torso.modifiers.new('Soft cloth silhouette','SUBSURF');sub.levels=2
bpy.context.view_layer.objects.active=torso;bpy.ops.object.modifier_apply(modifier=sub.name)
# A soft crew neck follows the simple clothing of the reference character.
points=[(.253*sin(i*2*pi/64),.025+.235*cos(i*2*pi/64),2.425) for i in range(65)]
tube('Crew neck trim',points,.027,navy_dark,body,10)
for side in [-1,1]:
    upper=bezier((side*.52,.035,2.10),(side*.91,.06,2.12),(side*1.01,-.05,1.76),(side*.89,-.26,1.57),25)
    lower=bezier((side*.89,-.26,1.57),(side*.80,-.45,1.52),(side*.64,-.67,1.59),(side*.44,-.74,1.63),25)
    points=upper+lower[1:]
    tube('Continuous rounded sleeve',points,[.235-.107*i/(len(points)-1) for i in range(len(points))],navy,body,24)
    uv('Visible shirt cuff',(side*.43,-.74,1.635),(.14,.085,.095),shirt,body,28,16)
    # Thighs reach forward from the chair, lower legs drop under the desk.
    upper=bezier((side*.32,.02,1.20),(side*.34,-.19,1.16),(side*.37,-.53,1.16),(side*.39,-.73,1.08),25)
    lower=bezier((side*.39,-.73,1.08),(side*.40,-.83,.89),(side*.40,-.80,.41),(side*.40,-.85,.22),25)
    points=upper+lower[1:]
    tube('Continuous seated trouser leg',points,[.255-.095*i/(len(points)-1) for i in range(len(points))],navy_dark,body,24)
    box('Shoe sole',(side*.40,-1.00,.085),(.48,.77,.13),.085,sole,body)
    uv('Leather shoe',(side*.40,-1.02,.18),(.235,.38,.17),leather,body)

for hand,side in [(left_hand,-1),(right_hand,1)]:
    uv('Palm',(0,-.015,.015),(.135,.155,.07),plain_skin,hand,32,20)
    for finger in range(4):
        x=-.09+.060*finger;length=[.17,.215,.225,.19][finger]
        points=bezier((x,-.11,.025),(x,-.18,.09),(x,-.11-length,.07),(x,-.12-length,-.015),14)
        tube('Finger',points,[.026-.008*i/13 for i in range(14)],plain_skin,hand,10)
    points=bezier((side*.105,.015,.025),(side*.16,-.03,.05),(side*.17,-.14,.035),(side*.13,-.19,.005),14)
    tube('Thumb',points,[.037-.014*i/13 for i in range(14)],plain_skin,hand,12)

# Desk, keyboard, monitor and chair use rounded, economical solid geometry.
box('Desk top',(0,-.92,1.51),(3.55,1.63,.12),.04,desk_top,desk)
for side in [-1,1]:
    box('Desk upright',(side*1.47,-.92,.73),(.075,.10,1.42),.025,metal,desk)
    box('Desk foot',(side*1.47,-.92,.07),(.20,1.45,.09),.025,metal,desk)
box('Keyboard base',(0,-.90,1.602),(1.35,.47,.055),.035,metal,desk)
for row in range(4):
    for col in range(13):box('Key',(-.58+col*.096,-.74-row*.092,1.64),(.078,.068,.02),.009,keys,desk)
box('Space key',(0,-1.08,1.642),(.45,.067,.022),.01,keys,desk)
box('Monitor foot',(.30,-1.39,1.61),(.57,.35,.055),.025,metal,desk)
box('Monitor stem',(.30,-1.43,1.85),(.09,.075,.50),.025,metal,desk)
box('Monitor casing',(.30,-1.41,2.24),(1.61,.11,1.03),.06,metal,desk)
box('Monitor display',(.30,-1.347,2.24),(1.49,.01,.90),.035,screen,desk)
box('Monitor back accent',(.30,-1.477,2.24),(.16,.009,.055),.018,cyan,desk)
# Small volumetric code bars, visible when the camera reveals the screen side.
for i in range(7):
    w=[.68,.94,.50,.76,.58,.82,.41][i]
    box('Code line',(-.20+w/2,-1.335,2.53-i*.08),(w,.005,.014),.006,cyan if i%3 else shirt,desk)
box('Chair seat',(0,.08,1.15),(1.30,.87,.15),.13,navy_dark,desk)
back=box('Chair back',(0,.51,1.88),(1.22,.17,1.35),.16,navy_dark,desk);back.rotation_euler.x=-.08
for side in [-1,1]:
    for y in [-.16,.43]:
        points=[(side*.48,y,1.12),(side*.60,y+.10,.08)]
        tube('Chair leg',points,.04,metal,desk,10)

# Fuse the sleeves into the torso so the silhouette has no toy-like joints.
cloth=[o for o in body.children if o.type=='MESH' and o.data.materials[0]==navy]
bpy.ops.object.select_all(action='DESELECT')
for o in cloth:o.select_set(True)
bpy.context.view_layer.objects.active=cloth[0];bpy.ops.object.join()
coat=cloth[0];coat.name='Continuous soft sweater'
remesh=coat.modifiers.new('Continuous clothing surface','REMESH');remesh.mode='VOXEL';remesh.voxel_size=.025;remesh.use_smooth_shade=True
bpy.ops.object.modifier_apply(modifier=remesh.name)
smooth=coat.modifiers.new('Smooth cloth','SMOOTH');smooth.factor=.75;smooth.iterations=5
bpy.ops.object.modifier_apply(modifier=smooth.name)
decimate=coat.modifiers.new('Efficient clothing mesh','DECIMATE');decimate.ratio=.55
bpy.ops.object.modifier_apply(modifier=decimate.name)
for polygon in coat.data.polygons:polygon.use_smooth=True

# Recalculate closed-mesh normals and merge static objects by local animation
# group and material, reducing the number of WebGL draw calls.
for o in list(bpy.context.scene.objects):
    if o.type!='MESH':continue
    bm=bmesh.new();bm.from_mesh(o.data);bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces));bm.to_mesh(o.data);bm.free()
for parent in [head,left_eye,right_eye,left_brow,right_brow,body,left_hand,right_hand,desk]:
    buckets={}
    for o in list(parent.children):
        if o.type=='MESH':buckets.setdefault(o.data.materials[0].name,[]).append(o)
    for material_name,objects in buckets.items():
        if len(objects)<2:continue
        bpy.ops.object.select_all(action='DESELECT')
        for o in objects:o.select_set(True)
        bpy.context.view_layer.objects.active=objects[0];bpy.ops.object.join()
        objects[0].name=parent.name+' '+material_name
root['design']='Original stylized character modeled from the owner photograph'
root['animation']='HeadPivot, EyeLeft, EyeRight, BrowLeft, BrowRight, HandLeft, HandRight'
root['version']=2
bpy.ops.object.select_all(action='DESELECT')
for o in [root,*root.children_recursive]:o.select_set(True)
bpy.context.view_layer.objects.active=root
bpy.ops.export_scene.gltf(filepath=os.path.join(OUT,'jhoandry-clay.glb'),export_format='GLB',use_selection=True,export_yup=True,export_extras=True,export_cameras=False,export_lights=False)
print('MODEL EXPORTED',sum(len(o.data.polygons) for o in bpy.context.scene.objects if o.type=='MESH'),'polygons')

# A true render of the same model provides the mobile/no-WebGL fallback.
scene=bpy.context.scene
scene.render.engine='CYCLES';scene.cycles.samples=96
scene.cycles.use_denoising=False
scene.render.resolution_x=760;scene.render.resolution_y=920;scene.render.resolution_percentage=100
scene.render.film_transparent=True
scene.world.color=(.15,.15,.15)
scene.view_settings.view_transform='AgX'
def area(name,location,power,color,size):
    data=bpy.data.lights.new(name,'AREA');data.energy=power;data.color=color;data.shape='DISK';data.size=size
    o=bpy.data.objects.new(name,data);bpy.context.collection.objects.link(o);o.location=location
    o.rotation_euler=(Vector((0,0,3))-o.location).to_track_quat('-Z','Y').to_euler()
area('Large soft key',(-3,-4,6),650,(1,.91,.82),4)
area('Soft fill',(3,-2,3.8),230,(.89,.85,.91),3)
area('Copper rim',(2,2,5),750,(1,.66,.49),3)
camdata=bpy.data.cameras.new('PortraitCamera');camera=bpy.data.objects.new('PortraitCamera',camdata);bpy.context.collection.objects.link(camera)
camera.location=(.17,-7.1,3.36);camera.rotation_euler=(Vector((0,0,3.25))-camera.location).to_track_quat('-Z','Y').to_euler()
camdata.type='ORTHO';camdata.ortho_scale=2.90;scene.camera=camera
# Only the portrait appears in the poster; the full workstation remains in GLB.
desk.hide_render=True
for o in desk.children_recursive:o.hide_render=True
for o in body.children_recursive:
    if any(k in o.name.lower() for k in ['trouser','shoe','sole']):o.hide_render=True
for hand in [left_hand,right_hand]:
    for o in hand.children_recursive:o.hide_render=True
scene.render.image_settings.file_format='PNG';scene.render.filepath=os.path.join(VALIDATION,'character-poster.png')
bpy.ops.wm.save_as_mainfile(filepath=os.path.join(VALIDATION,'jhoandry-character.blend'))
bpy.ops.render.render(write_still=True)

subprocess.run(['node', '-e', "const sharp=require('sharp');sharp(process.argv[1]).webp({quality:91,effort:6}).toFile(process.argv[2]);", scene.render.filepath, os.path.join(ROOT, 'public', 'images', 'jhoandry-clay.webp')], cwd=ROOT, check=True)
print('Character GLB and matching WebP poster generated successfully.')
