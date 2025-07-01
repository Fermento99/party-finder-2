from selenium import webdriver
from selenium.webdriver import ActionChains
from selenium.webdriver.common.by import By
from datetime import datetime, timedelta
import re


def main_woodstock(driver: webdriver.Firefox):
    driver.get('https://en.polandrockfestival.pl/line-up-schedule')

    close_cookies_btn = driver.find_element(By.ID, 'cookiesBarClose')
    main_stage_btn = driver.find_element(By.ID, 'places_107')
    second_stage_btn = driver.find_element(By.ID, 'places_109')

    ActionChains(driver)\
        .pause(1)\
        .click(close_cookies_btn)\
        .pause(1)\
        .click(main_stage_btn)\
        .click(second_stage_btn)\
        .pause(2)\
        .perform()
    
    band_entries = []

    data_rows = driver.find_elements(By.CSS_SELECTOR, 'tbody > tr')
    for row in data_rows:
        if row.get_attribute('class') == 'descriptionCell':
            continue

        cells = row.find_elements(By.TAG_NAME, 'td')

        date_parts = cells[1].text.split('\n')
        hours = date_parts[2].split(' - ')
        start_date = datetime.fromisoformat(date_parts[1] + ' ' + hours[0])
        end_date = datetime.fromisoformat(date_parts[1] + ' ' + hours[1])


        if start_date > end_date:
            end_date += timedelta(days=1)

        band_entries.append({
            'band_name': re.sub('( -)? - Winner.*', '', cells[2].text),
            'start_date': start_date.isoformat(),
            'end_date': end_date.isoformat(),
        })
    
    return band_entries
