import sys
from selenium import webdriver
from site_crawlers.crawler_map import choose_crawler
from utils import get_festivals


entry_string = '\t{ band_name: "{band_name}", start_date:"{start_date}", end_date:"{end_date}" }'

def save_bands(festival_name, bands):
    file = open('./output/{}.json'.format(festival_name), 'w')
    file.write('[\n')
    band_lines = ',\n'.join(['\t' + str(band).replace('\'', '"') for band in bands])
    file.write(band_lines)
    file.write('\n]\n')
    file.close()

def main():
    festivals = get_festivals()
    if len(sys.argv) == 1 or sys.argv[1] not in festivals:
        print('please, select a viable festival:')
        print(festivals)
    else:
        festival_name = sys.argv[1]
        driver = webdriver.Firefox()
        try:
            bands = choose_crawler(festival_name)(driver)
            save_bands(festival_name, bands)
        finally:
            driver.quit()

if __name__ == "__main__":
    main()