import{normalize,validateCurriculum}from './engine.js';
export const ALPHABET='23456789ABCDEFGHJKLMNPQRSTUVWXYZ',CODE_LENGTH=24,MAX_PAYLOAD=900000;
export function newCode(rand=crypto){const bytes=new Uint8Array(CODE_LENGTH);rand.getRandomValues(bytes);return[...bytes].map(b=>ALPHABET[b%32]).join('');}
export function cleanCode(text){return String(text).toUpperCase().replace(/[^A-Z0-9]/g,'');}
export function validCode(code){return code.length===CODE_LENGTH&&[...code].every(c=>ALPHABET.includes(c));}
export function formatCode(code){return code.match(/.{1,4}/g).join('-');}
export function configured(cfg){return !!cfg&&/^[a-z0-9-]{4,}$/.test(cfg.projectId||'')&&/^[\w-]{10,}$/.test(cfg.apiKey||'');}
function endpoint(cfg,code){if(!configured(cfg))throw Error('Chưa cấu hình máy chủ đồng bộ.');if(!validCode(code))throw Error('Mã ghép nối không hợp lệ.');return `https://firestore.googleapis.com/v1/projects/${cfg.projectId}/databases/(default)/documents/sync/${code}?key=${cfg.apiKey}`;}
export async function pull(cfg,code,fetchFn=fetch){let res;try{res=await fetchFn(endpoint(cfg,code));}catch{throw Error('Không có mạng hoặc không kết nối được máy chủ đồng bộ.');}
if(res.status===404)return null;if(!res.ok)throw Error('Máy chủ đồng bộ từ chối yêu cầu ('+res.status+').');
const doc=await res.json(),payload=doc.fields?.payload?.stringValue,at=Number(doc.fields?.updatedAt?.integerValue);if(typeof payload!=='string'||!Number.isFinite(at))throw Error('Dữ liệu trên máy chủ không đúng định dạng.');
const state=JSON.parse(payload);normalize(state);if(state.custom)validateCurriculum(state.custom);state.pin=null;state.updatedAt=at;return{at,state};}
export async function push(cfg,code,state,at,fetchFn=fetch){const copy=structuredClone(state);copy.pin=null;copy.updatedAt=at;normalize(copy);const payload=JSON.stringify(copy);if(payload.length>MAX_PAYLOAD)throw Error('Dữ liệu quá lớn để đồng bộ; hãy dùng bản sao lưu JSON.');
let res;try{res=await fetchFn(endpoint(cfg,code),{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({fields:{payload:{stringValue:payload},updatedAt:{integerValue:String(at)}}})});}catch{throw Error('Không có mạng hoặc không kết nối được máy chủ đồng bộ.');}
if(!res.ok)throw Error('Không đẩy được tiến độ lên máy chủ ('+res.status+').');}
// Bản ghi sau cùng thắng. remote=null nghĩa là chưa có gì trên máy chủ.
export function decide(localAt,remote){if(!remote)return'push';const l=localAt||0;return remote.at>l?'pull':remote.at<l?'push':'none';}
