// Cấp 51–100 là cấp ôn tập: 1000 từ cốt lõi của cấp 1–50 được trộn lại, mỗi từ xuất hiện đúng một lần.
// Mục dùng chung ID với mục gốc nên tiến độ từng từ (mastery) được ghi lại ở cùng một chỗ.
export const CORE_LEVELS=50,LEVEL_SIZE=20;
export function buildReviewLevels(core){if(core.length!==CORE_LEVELS)throw Error('Cần đúng '+CORE_LEVELS+' cấp học để dựng cấp ôn tập.');return Array.from({length:CORE_LEVELS},(_,r)=>({id:CORE_LEVELS+r+1,title:`Ôn tập tổng hợp ${r+1}`,review:true,items:Array.from({length:LEVEL_SIZE},(_,j)=>core[(r+7*j)%CORE_LEVELS].items[j])}));}
export const withReviewLevels=base=>base.length===CORE_LEVELS&&!base.some(l=>l.review)?base.concat(buildReviewLevels(base)):base;
