from selenium import webdriver
from selenium.webdriver.common.by import By


def main_pohoda(driver: webdriver.Firefox):
    driver.get('https://www.pohodafestival.sk/en/artists/music')

    artists = driver.find_elements(By.CLASS_NAME, 'title')

    band_entries = []

    for artist in artists:
        country_code = ' {}'.format(artist.find_element(By.TAG_NAME, 'sup').text)
        band_entries.append({
            'band_name': artist.text.replace(country_code, ''),
            'start_date': '',
            'end_date': ''
        })

    return band_entries