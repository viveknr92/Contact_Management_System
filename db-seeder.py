import mysql.connector
import csv
import datetime

mydb = mysql.connector.connect(
  auth_plugin='caching_sha2_password',
  host="127.0.0.1",
  user="root",
  passwd="root",
  db="contact_manager"  
)

# mycursor = mydb.cursor()

# sql = "INSERT INTO contact (fname, mname, lname) VALUES (%s, %s, %s)"
# val = ("John", "Cole", "M")
# mycursor.execute(sql, val)

# mydb.commit()

def reset_table():
  global mydb
  mycursor = mydb.cursor()
  mycursor.execute("\
  delete from address;\
  ALTER TABLE address AUTO_INCREMENT = 1;\
  delete from phone;\
  ALTER TABLE phone AUTO_INCREMENT = 1;\
  delete from date;\
  ALTER TABLE date AUTO_INCREMENT = 1;\
  delete from Contact;\
  ALTER TABLE Contact AUTO_INCREMENT = 1;", multi=True)
  


def insert_contact(fname, mname, lname):
  global mydb
  mycursor = mydb.cursor()
  sql = "INSERT INTO contact (fname, mname, lname) VALUES (%s, %s, %s)"
  val = (fname, mname, lname)
  mycursor.execute(sql, val)

  mydb.commit()

  return mycursor.lastrowid

def insert_address(contact_id, address_type, address_line, city, state, zip):
  global mydb
  mycursor = mydb.cursor()

  sql = "INSERT INTO address (contact_id, address_type, address_line, city, state, zip) VALUES (%s, %s, %s, %s, %s, %s)"
  val = (contact_id, address_type, address_line, city, state, zip)
  mycursor.execute(sql, val)
  mydb.commit()
  return mycursor.lastrowid

def insert_phone(contact_id, phone_type, area_code, number):
  global mydb
  mycursor = mydb.cursor()

  sql = "INSERT INTO phone (contact_id, phone_type, area_code, number) VALUES (%s, %s, %s, %s)"
  val = (contact_id, phone_type, area_code, number)
  mycursor.execute(sql, val)

  mydb.commit() 
  return mycursor.lastrowid 

def insert_date(contact_id, date_type, date):
  global mydb
  mycursor = mydb.cursor()

  sql = "INSERT INTO date (contact_id, date_type, date) VALUES (%s, %s, %s)"
  val = (contact_id, date_type, date)
  mycursor.execute(sql, val)

  mydb.commit()  
  return mycursor.lastrowid 

# reset_table()

# with open('Contacts.csv') as csvfile:
#     readCSV = list(csv.reader(csvfile, delimiter=','))
#     for row in readCSV[1:]:
#         contact_id = insert_contact(row[1], row[2], row[3])
        
#         print('Inserting contact ', contact_id)

#     for row in readCSV[1:]:
#         id = insert_address(row[0], "home", row[6], row[7], row[8], row[9])
#         id = insert_address(row[0], "work", row[11], row[12], row[13], row[14])

#         if(row[4] != ""): # home
#           phone = row[4].split("-", 1)
#           id = insert_phone(row[0], "home", phone[0], phone[1])
#         else:
#           id = insert_phone(row[0], "home", "", "")
        
#         if(row[5] != ""): # cell
#           cell = row[5].split("-", 1)
#           id = insert_phone(row[0], "cell", cell[0], cell[1])
#         else:
#           id = insert_phone(row[0], "cell", "", "")

#         if(row[10] != ""): # work
#           work = row[10].split("-", 1)
#           id = insert_phone(row[0], "work", work[0], work[1])
#         else:
#           id = insert_phone(row[0], "work", "", "")
        
#         if(row[15] != ""): # date
#           date = row[15].split("/")
#           d = datetime.date(int(date[2]), int(date[0]), int(date[1]))
#           id = insert_date(row[0], "birth_date", d.strftime('%Y-%m-%d %H:%M:%S'))
#         else:
#           # id = insert_date(row[0], "", "")
#           print ("no birthday")


    
print(mydb)