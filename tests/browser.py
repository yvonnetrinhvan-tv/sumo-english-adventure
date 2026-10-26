import json
from pathlib import Path
from playwright.sync_api import sync_playwright
base='http://127.0.0.1:4173'
content=json.load(open(Path(__file__).resolve().parents[1]/'data/curriculum.json'))
with sync_playwright() as p:
 browser=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'])
 page=browser.new_page(viewport={'width':390,'height':844},reduced_motion='reduce');errors=[]
 page.on('pageerror',lambda e:errors.append(str(e)))
 page.goto(base);page.get_by_role('button',name='Tiếp tục khám phá').click()
 def answer():
  h=page.locator('.card h2').inner_text()
  if page.locator('#answer').count():
   meaning=h.split('“')[1].split('”')[0];e=next(e for e in content[0]['items'] if e['meaning']==meaning);page.locator('#answer').fill(e['english']);page.get_by_role('button',name='Kiểm tra',exact=True).click()
  else:
   if h.startswith('Nghe'):
    en=page.locator('details p').text_content();target=en
   elif h.startswith('Chọn') or h.startswith('Con muốn'):
    meaning=h.split('“')[1].split('”')[0];target=next(e['english'] for e in content[0]['items'] if e['meaning']==meaning)
   else:
    en=h.split('“')[-1].split('”')[0];target=next(e['meaning'] for e in content[0]['items'] if e['english']==en)
   page.get_by_role('button',name=target,exact=True).click()
  page.get_by_role('button',name='Tiếp tục →',exact=True).click()
 for i in range(20):
  page.get_by_role('button',name='Thử sức với mục này').click();answer()
  if (i+1)%5==0:page.get_by_role('button',name='Làm thử thách 10 câu' if i==19 else 'Học chặng tiếp theo').click()
 for i in range(10):answer()
 assert '10/10' in page.locator('#app').inner_text()
 s=page.evaluate("JSON.parse(localStorage.getItem('sumo-adventure-v1'))")
 assert s['coins']==100 and s['completed']==[1] and len(s['mastery'])==20
 page.reload();assert page.locator('#balances').inner_text().startswith('🪙 100')
 page.get_by_role('link',name='🛍️ Cửa hàng').click();page.locator('[data-buy="hat"]').click();assert page.locator('[data-buy="hat"]').inner_text()=='Tháo vật phẩm'
 page.get_by_role('link',name='🛡️ Góc của mẹ').click();page.locator('#pin').fill('2468');page.locator('#pin2').fill('2468');page.get_by_role('button',name='Tạo PIN và mở').click();page.get_by_role('button',name='Tải bản sao lưu đầy đủ').wait_for()
 with page.expect_download() as dl:page.get_by_role('button',name='Tải bản sao lưu đầy đủ').click()
 dl.value.save_as('/tmp/sumo-backup.json');assert json.load(open('/tmp/sumo-backup.json'))['coins']==20
 page.get_by_role('button',name='Khóa góc của mẹ').click();page.locator('#pin').fill('1111');page.get_by_role('button',name='Mở góc của mẹ').click();assert page.locator('#pinform').count()==1
 page.locator('#pin').fill('2468');page.get_by_role('button',name='Mở góc của mẹ').click();page.get_by_role('button',name='Tải bản sao lưu đầy đủ').wait_for()
 page.evaluate("""async()=>{let E=await import('./src/engine.js');let s=JSON.parse(localStorage.getItem(E.KEY));for(let id=2;id<=5;id++)E.complete(s,id,10);localStorage.setItem(E.KEY,JSON.stringify(s));}""")
 page.reload();page.get_by_role('link',name='🌟 Quà của mẹ').click();page.locator('[data-request="1"]').click();assert 'Đang chờ mẹ' in page.locator('#app').inner_text()
 page.get_by_role('link',name='🛡️ Góc của mẹ').click();page.locator('#pin').fill('2468');page.get_by_role('button',name='Mở góc của mẹ').click();page.locator('[data-decide="approve"]').click();page.locator('[data-decide="deliver"]').click();assert 'Đã nhận quà' in page.locator('#app').inner_text()
 page.goto(base+'/#map');page.locator('[data-level="2"]').click();assert 'Ôn trí nhớ' in page.locator('h1').inner_text()
 page.goto(base+'/#map');assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
 page.screenshot(path='/tmp/sumo-mobile.png',full_page=False)
 assert not errors,errors
 print('PASS: mobile full level (20 practice + 10 quiz), reload, purchase/equip, PIN, backup download, star request/approval/delivery, next-level review, responsive layout; no browser errors.')
 browser.close()
