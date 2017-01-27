#!/usr/bin/python -B

import pymongo
import json

json_data = open('./config.json').read()
config = json.loads(json_data)

client = pymongo.MongoClient(config['mongodb_host'], int(config['mongodb_port']))
#client = pymongo.MongoClient('127.0.0.1', 27017)
db = client[config['mongodb_db']]
db.authenticate(config['mongodb_user'], config['mongodb_pass'])

db.command("dbstats")
db.command("collstats", "devicestatus")
db.command("collstats", "entries")

status = db['devicestatus']
status.count()
for i in status.find():
  print(i)

entries = db['entries']
entries.count()
for i in entries.find():
  print(i)

