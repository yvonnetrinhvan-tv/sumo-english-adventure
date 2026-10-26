from playwright.sync_api import sync_playwright
BASE='http://127.0.0.1:4173/'
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 source=b.new_context();page=source.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)));page.goto(BASE)
 page.evaluate("""async()=>{let E=await import('./src/engine.js');let s=E.fresh();for(let i=1;i<=5;i++)E.complete(s,i,10);E.buy(s,'hat');E.equip(s,'hat');s.checkpoints[5]=10;localStorage.setItem(E.KEY,JSON.stringify(s));}""")
 page.reload();page.get_by_role('link',name='🛡️ Góc của mẹ').click();page.locator('#pin').fill('2468');page.locator('#pin2').fill('2468');page.get_by_role('button',name='Tạo PIN và mở').click();page.locator('#transfer').click();link=page.locator('#transferLink');link.wait_for();url=link.input_value();assert '#nhan=' in url
 phone=b.new_context(viewport={'width':390,'height':844});mobile=phone.new_page();mobile.on('pageerror',lambda e:errors.append(str(e)));mobile.goto(url);mobile.locator('#acceptTransfer').click();mobile.locator('.hero').wait_for()
 s=mobile.evaluate("JSON.parse(localStorage.getItem('sumo-adventure-v1'))");assert s['coins']==420 and s['stars']==1 and s['checkpoints']['5']==10 and s['equipped']['hat']=='hat' and s['pin'] is None
 assert '#nhan=' not in mobile.url
 mobile.evaluate('navigator.serviceWorker.ready.then(()=>true)');mobile.reload();mobile.wait_for_function('navigator.serviceWorker.controller !== null')
 # Gate replacement on a device with an existing PIN.
 mobile.get_by_role('link',name='🛡️ Góc của mẹ').click();mobile.locator('#pin').fill('1357');mobile.locator('#pin2').fill('1357');mobile.get_by_role('button',name='Tạo PIN và mở').click();mobile.get_by_role('button',name='Khóa góc của mẹ').click();mobile.goto(url);mobile.locator('#pinform').wait_for();assert mobile.locator('#acceptTransfer').count()==0
 mobile.locator('#pin').fill('1357');mobile.get_by_role('button',name='Mở góc của mẹ').click();mobile.locator('#acceptTransfer').click();mobile.locator('.hero').wait_for();assert mobile.evaluate("JSON.parse(localStorage.getItem('sumo-adventure-v1')).pin !== null")
 # Precached manifest/icons and learning content remain available offline.
 phone.set_offline(True);mobile.reload();mobile.locator('.hero').wait_for();mobile.locator('[data-level="1"]').click();mobile.locator('#practice').wait_for();assert mobile.locator('.word').inner_text()=='hello'
 assert mobile.evaluate("fetch('./icons/sumo-192.png').then(r=>r.ok)")
 assert not errors,errors
 print('PASS: two isolated devices, full progress transfer, PIN excluded/preserved, receive PIN gate, no double rewards, installed app cache/offline lesson and icon.')
 b.close()
