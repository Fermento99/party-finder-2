import re, sys
from utils import get_festivals

def prepare_request_body(festival_name: str):
    band_file = open('./output/{}.json'.format(festival_name), 'r')
    body_file = open('./output/{}_request_body.json'.format(festival_name), 'w')

    band_names = re.findall('"band_name": "(.*?)"', band_file.read())
    body_file.write('{\n')
    body_file.write('\t"festival_id": "%INSERT-FESTIVAL-ID%",\n')
    body_file.write('\t"band_names": ' + str(band_names).replace('\'', '"'))
    body_file.write('\n}')

    band_file.close()
    body_file.close()

def main():
    festivals = get_festivals()
    if len(sys.argv) == 1 or sys.argv[1] not in festivals:
        print('please, select a viable festival:')
        print(festivals)
    else:
        prepare_request_body(sys.argv[1])

if __name__ == "__main__":
    main()