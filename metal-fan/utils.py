import os

def get_festivals():
    return [crawler_file.replace('.py', '') for crawler_file in os.listdir('./site_crawlers/') if crawler_file != 'crawler_map.py' and crawler_file != '__pycache__']
