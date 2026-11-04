// Linh thú: trứng chỉ nở nhờ học; đồ ăn và học đều giúp lớn. Điểm lưu trong state.pets.
export const EGG_NEED=60,TEEN_AT=160,ADULT_AT=320,DAY_CAP=30,LEVEL_BONUS=20,MAX_PETS=24;
export const STAGES={egg:'Trứng',baby:'Sơ sinh',teen:'Thiếu niên',adult:'Trưởng thành'};
export const SPECIES=[
{id:'wolf',name:'Sói Bạc',emoji:'🐺',price:100,element:'Phong',c1:'#bcd2f2',c2:'#4a6fa5',filter:''},
{id:'lion',name:'Sư Tử Vàng',emoji:'🦁',price:150,element:'Kim',c1:'#ffd36b',c2:'#b86b12',filter:''},
{id:'whitetiger',name:'Hổ Trắng',emoji:'🐯',price:200,element:'Thủy',c1:'#ffffff',c2:'#7fa6d9',filter:'grayscale(1) brightness(1.45)'},
{id:'bear',name:'Gấu Núi',emoji:'🐻',price:200,element:'Thổ',c1:'#d9a273',c2:'#6b3f22',filter:''},
{id:'panther',name:'Báo Đêm',emoji:'🐆',price:250,element:'Ám',c1:'#9b7cff',c2:'#2a1f4d',filter:'brightness(.5) saturate(.8)'},
{id:'eagle',name:'Đại Bàng',emoji:'🦅',price:250,element:'Lôi',c1:'#ffe39a',c2:'#b5791f',filter:''},
{id:'unicorn',name:'Kỳ Lân',emoji:'🦄',price:350,element:'Quang',c1:'#ffc9f2',c2:'#a24be0',filter:''},
{id:'dragon',name:'Rồng Lửa',emoji:'🐉',price:400,element:'Hỏa',c1:'#ffb347',c2:'#d4260f',filter:'hue-rotate(-125deg) saturate(1.5)'},
{id:'icedragon',name:'Rồng Băng',emoji:'🐲',price:400,element:'Băng',c1:'#d4f3ff',c2:'#2a8fd6',filter:'hue-rotate(80deg) saturate(1.3)'}];
export const FOODS=[
{id:'meat',name:'Thịt khô',emoji:'🍖',price:20,points:8},
{id:'fruit',name:'Linh quả',emoji:'🍑',price:60,points:30},
{id:'elixir',name:'Đan dược',emoji:'🧪',price:150,points:90}];
export const SKINS=[
{id:'jade',name:'Ngọc Bích',price:60,c1:'#37d1a5',c2:'#0d6b5a',deco:'🍃'},
{id:'lantern',name:'Hoa Đăng',price:70,c1:'#ff9a4d',c2:'#9b2a14',deco:'🏮'},
{id:'ink',name:'Thủy Mặc',price:80,c1:'#f4f4f4',c2:'#2b2b2b',deco:'🖌️'},
{id:'blood',name:'Huyết Kiếm',price:90,c1:'#ff4d5e',c2:'#6d0f1e',deco:'🗡️'},
{id:'cloud',name:'Tường Vân',price:100,c1:'#9fd8ff',c2:'#3a6fd0',deco:'☁️'},
{id:'gold',name:'Kim Quang',price:120,c1:'#ffd96b',c2:'#a86a10',deco:'✨'},
{id:'sword',name:'Kiếm Thần',price:200,c1:'#c9d6ff',c2:'#5a3fd6',deco:'⚔️'}];
const find=(list,id,msg)=>list.find(x=>x.id===id)||(()=>{throw Error(msg);})();
export const species=id=>find(SPECIES,id,'Không có loài này.');
export function freshPets(){return {list:[],active:null,skins:[],day:'',dayPoints:0,nextId:1};}
export function stage(p){return p.points<EGG_NEED?'egg':p.points<TEEN_AT?'baby':p.points<ADULT_AT?'teen':'adult';}
// Mốc kế tiếp để hiện thanh tiến độ; trưởng thành thì đầy thanh.
export function progress(p){const st=stage(p),[from,to]={egg:[0,EGG_NEED],baby:[EGG_NEED,TEEN_AT],teen:[TEEN_AT,ADULT_AT],adult:[ADULT_AT,ADULT_AT]}[st];return {stage:st,need:to,ratio:to===from?1:(p.points-from)/(to-from)};}
export const dayKey=now=>new Date(now-new Date(now).getTimezoneOffset()*6e4).toISOString().slice(0,10);
export function pet(s,id){return find(s.pets.list,id,'Không tìm thấy linh thú.');}
function spend(s,id,price,what){if(s.coins<price)throw Error('Chưa đủ xu. Hãy học thêm một cấp nhé!');s.coins-=price;s.purchases.push({id:what,price,at:Date.now()});}
export function buyEgg(s,speciesId){const sp=species(speciesId);if(s.pets.list.length>=MAX_PETS)throw Error('Linh Thú Viên đã đầy.');spend(s,sp.id,sp.price,'egg-'+sp.id);const p={id:'p'+s.pets.nextId++,species:sp.id,points:0,skin:null};s.pets.list.push(p);if(!s.pets.active)s.pets.active=p.id;return p;}
export function setActive(s,id){pet(s,id);s.pets.active=id;}
function add(s,p,n){const before=stage(p);p.points=Math.min(ADULT_AT,p.points+n);const after=stage(p);return {gained:n,before,after,changed:before!==after};}
// Mỗi câu đúng +1 điểm cho linh thú đang chăm; trần mỗi ngày để học thật chứ không bấm lặp.
export function study(s,now=Date.now(),n=1){const p=s.pets.active&&s.pets.list.find(x=>x.id===s.pets.active);if(!p||p.points>=ADULT_AT)return null;const day=dayKey(now);if(s.pets.day!==day){s.pets.day=day;s.pets.dayPoints=0;}const gain=Math.min(n,DAY_CAP-s.pets.dayPoints,ADULT_AT-p.points);if(gain<=0)return null;s.pets.dayPoints+=gain;return add(s,p,gain);}
export function bonus(s,n=LEVEL_BONUS){const p=s.pets.active&&s.pets.list.find(x=>x.id===s.pets.active);if(!p||p.points>=ADULT_AT)return null;return add(s,p,Math.min(n,ADULT_AT-p.points));}
export function feed(s,id,foodId){const p=pet(s,id),food=find(FOODS,foodId,'Không có món ăn này.');if(stage(p)==='egg')throw Error('Trứng chưa nở nên chưa ăn được. Hãy học để ấp trứng!');if(p.points>=ADULT_AT)throw Error('Linh thú đã trưởng thành.');spend(s,food.id,food.price,'food-'+food.id);return add(s,p,food.points);}
export function buySkin(s,id){const sk=find(SKINS,id,'Không có y phục này.');if(s.pets.skins.includes(id))return false;spend(s,id,sk.price,'skin-'+id);s.pets.skins.push(id);return true;}
export function equipSkin(s,petId,skinId){const p=pet(s,petId);if(skinId!==null){find(SKINS,skinId,'Không có y phục này.');if(!s.pets.skins.includes(skinId))throw Error('Con chưa có y phục này.');}p.skin=skinId;}
export function purchaseName(id){const [kind,key]=id.split(/-(.+)/);const list={egg:SPECIES,food:FOODS,skin:SKINS}[kind];const item=list?.find(x=>x.id===key);return item?{egg:'Trứng ',food:'',skin:'Y phục '}[kind]+item.name:id;}
export function validatePets(p){if(!p||!Array.isArray(p.list)||!Array.isArray(p.skins)||p.list.length>MAX_PETS)throw Error('Dữ liệu linh thú không hợp lệ.');const ids=new Set();for(const x of p.list){if(typeof x.id!=='string'||!/^p[0-9]{1,6}$/.test(x.id)||ids.has(x.id)||!SPECIES.some(sp=>sp.id===x.species)||!Number.isInteger(x.points)||x.points<0||x.points>ADULT_AT||x.skin!==null&&!p.skins.includes(x.skin))throw Error('Linh thú không hợp lệ.');ids.add(x.id);}if(new Set(p.skins).size!==p.skins.length||p.skins.some(id=>!SKINS.some(k=>k.id===id)))throw Error('Y phục không hợp lệ.');if(p.active!==null&&!ids.has(p.active))throw Error('Linh thú đang chăm không hợp lệ.');if(typeof p.day!=='string'||p.day.length>10||!Number.isInteger(p.dayPoints)||p.dayPoints<0||p.dayPoints>DAY_CAP||!Number.isInteger(p.nextId)||p.nextId<1)throw Error('Nhật ký ấp trứng không hợp lệ.');}
