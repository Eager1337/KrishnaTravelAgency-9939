import asyncio, json, re
from pathlib import Path
from playwright.async_api import async_playwright

async def main():
  async with async_playwright() as p:
    browser=await p.chromium.launch(headless=True, executable_path='/usr/bin/google-chrome', args=['--no-sandbox'])
    page=await browser.new_page(viewport={'width':1440,'height':1000})
    errors=[]
    page.on('pageerror',lambda e: errors.append(str(e)))
    await page.goto('http://localhost:4200/')
    await page.evaluate('document.fonts.ready')
    await page.screenshot(path='/home/user/krishna-home-desktop.png',full_page=True)
    assert await page.locator('.destination-card').count()==4
    await page.get_by_role('button',name='Africa',exact=True).click()
    assert await page.locator('.destination-card').count()==1
    await page.get_by_role('button',name='All destinations',exact=True).click()
    await page.get_by_label('Destination',exact=True).fill('Dubai')
    await page.get_by_label('Departure date',exact=True).fill('2027-03-15')
    await page.get_by_label('Number of travellers',exact=True).select_option('2')
    await page.get_by_role('button',name='Find my journey').click()
    await page.wait_for_url('**/quote?**')
    assert await page.get_by_label('Your destination',exact=True).input_value()=='Dubai'
    assert await page.get_by_label('Number of travellers',exact=True).input_value()=='2'
    await page.get_by_role('button',name='Continue',exact=True).click()
    await page.get_by_label('Your full name',exact=True).fill('Website QA Test')
    await page.get_by_label('Email address',exact=True).fill('website-qa@example.com')
    await page.get_by_label('Phone number, including country code',exact=True).fill('+232 70000000')
    assert await page.get_by_label('Phone number, including country code',exact=True).evaluate('(el)=>el.checkValidity()')
    await page.get_by_role('button',name='Continue',exact=True).click()
    await page.get_by_label('I consent to storing this enquiry and accept the privacy notice').check()
    await page.get_by_role('button',name='Save my enquiry').click()
    await page.get_by_role('heading',name='Your enquiry is saved.').wait_for(timeout=30000)
    ref=await page.locator('.reference-block strong').inner_text()
    assert re.fullmatch(r'KT-[A-F0-9]{20}',ref)
    await page.screenshot(path='/home/user/krishna-receipt.png',full_page=True)
    async with page.expect_download() as dl:
      await page.get_by_role('button',name='Download enquiry').click()
    d=await dl.value
    assert d.suggested_filename==ref+'.txt'
    await page.get_by_role('link',name='Track saved enquiry').click()
    await page.get_by_label('Email used for the enquiry',exact=True).fill('wrong@example.com')
    await page.get_by_role('button',name='Find my enquiry').click()
    await page.get_by_role('alert').wait_for()
    assert await page.locator('.track-result').count()==0
    await page.get_by_label('Email used for the enquiry',exact=True).fill('website-qa@example.com')
    await page.get_by_role('button',name='Find my enquiry').click()
    await page.get_by_role('heading',name='Saved in the website.').wait_for(timeout=15000)
    assert not await page.locator('.track-result').get_by_text('Website QA Test').count()
    await page.reload()
    await page.get_by_label('Email used for the enquiry',exact=True).fill('website-qa@example.com')
    await page.get_by_role('button',name='Find my enquiry').click()
    await page.get_by_role('heading',name='Saved in the website.').wait_for()
    routes=['/destinations','/destinations/dubai','/destinations/maldives','/destinations/london','/destinations/accra','/services','/services/flights','/services/holidays','/services/visa','/services/hotels','/services/cars','/services/insurance','/about','/contact','/privacy','/terms','/no-such-page']
    for route in routes:
      await page.goto('http://localhost:4200'+route)
      await page.locator('h1').wait_for()
      assert await page.locator('h1').count()==1,route
      assert await page.evaluate('document.documentElement.scrollWidth<=innerWidth'),route
    mobile=await browser.new_page(viewport={'width':390,'height':844},is_mobile=True,device_scale_factor=1)
    await mobile.goto('http://localhost:4200/')
    await mobile.evaluate('document.fonts.ready')
    await mobile.screenshot(path='/home/user/krishna-home-mobile.png',full_page=True)
    assert await mobile.evaluate('document.documentElement.scrollWidth<=innerWidth')
    await mobile.get_by_role('button',name='Open menu').click()
    await mobile.locator('#mobile-nav').get_by_role('link',name='Contact',exact=True).click()
    await mobile.wait_for_url('**/contact')
    assert not await mobile.locator('#mobile-nav').count()
    for route in routes+['/quote','/track']:
      await mobile.goto('http://localhost:4200'+route)
      await mobile.locator('h1').wait_for()
      assert await mobile.evaluate('document.documentElement.scrollWidth<=innerWidth'),route
    await mobile.goto('http://localhost:4200/quote')
    await mobile.get_by_role('button',name='Continue',exact=True).click()
    assert await mobile.get_by_role('heading',name='Where are you heading?').count()==1
    await mobile.screenshot(path='/home/user/krishna-quote-mobile.png',full_page=True)
    assert not errors,errors
    results={'desktop':'passed','mobile':'passed','quote_persistence':'passed','email_reference_lookup':'passed','wrong_email_blocked':'passed','download':'passed','routes_checked':len(routes),'console_errors':errors,'test_reference':ref}
    Path('/home/user/krishna-travels/test-results.json').write_text(json.dumps(results,indent=2))
    print(json.dumps(results,indent=2))
    await browser.close()

asyncio.run(main())