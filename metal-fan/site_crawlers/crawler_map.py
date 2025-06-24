from site_crawlers.woodstock import main_woodstock
from site_crawlers.pohoda import main_pohoda
from site_crawlers.rock_for_people import main_rfp

def choose_crawler(name: str):
    if name == 'woodstock':
        return main_woodstock
    elif name == 'rock_for_people':
        return main_rfp
    elif name == 'pohoda':
        return main_pohoda
    else:
        raise NotImplementedError('crawler for festival {} is not implemented'.format(name))