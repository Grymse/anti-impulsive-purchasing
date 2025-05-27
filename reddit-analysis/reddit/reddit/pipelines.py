# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
import json
import csv
import time
from itemadapter import ItemAdapter
from scrapy.exporters import CsvItemExporter

BASE_LOCATION = "../data"

class RedditPipeline:
    scraped_at = int(time.time())

    def __init__(self):
        self.files = {}
        self.writers = {}

    def open_spider(self, spider):
        pass

    def process_item(self, item, spider):
        # print("Processing item of type", item.type)
        item_type = item.type

        if item_type not in self.files:
            # Open a new CSV file for this item type
            location = f"{BASE_LOCATION}/{item_type}/{self.scraped_at}.csv"
            file = open(location, 'a', newline='', encoding='utf-8')
            self.files[item_type] = file

            # Create a CSV writer with quoting enabled
            writer = csv.writer(file, quoting=csv.QUOTE_ALL)
            self.writers[item_type] = writer

            # Write the header (field names)
            writer.writerow(item.keys())

        # Write the item data
        self.writers[item_type].writerow(item.values())

        # Flush the file after each write to ensure immediate saving
        self.files[item_type].flush()

        return item
    
    def close_spider(self, spider):
        # for exporter in self.exporters.values():
        #     exporter.finish_exporting()
        # for file in self.files.values():
        #     file.close()

        for file in self.files.values():
            file_name = file.name
            print("Closing file: ", file_name)
            file.close()
