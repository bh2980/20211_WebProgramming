from urllib.request import urlopen
from bs4 import BeautifulSoup
from pymongo import MongoClient
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager

URL = 'http://my.knu.ac.kr/stpo/stpo/cour/listLectPln/list.action?search_open_crse_cde=1108&sub=11&search_open_yr_trm=20211'

end=14

url1 = URL.split('=', 1)

url2 = url1[1].split('&', 1)

# print(url1[0] + url2[1])

driver = webdriver.Chrome(ChromeDriverManager().install())
# driver.maximize_window()
driver.implicitly_wait(100)

driver.get(URL)

college = driver.find_element_by_xpath('//*[@id="title_cour"]')
# print(college.text)
# college = college.text
college = '간호대학'
# print(college)

optionlist = []

for i in range(0, end):
    i+=1
    test = driver.find_element_by_xpath('//*[@id="sub2"]/option['+ str(i) +']')
    print(test.get_attribute('value'))
    optionlist.append(test.get_attribute('value'))

print(optionlist)

my_client = MongoClient("mongodb+srv://web:<password>@cluster0.v9x8n.mongodb.net/test")

mydb = my_client['shopatknu']
mycol = mydb['lectures']

m=0

for k in optionlist:
    URL = url1[0] + '=' + k + '&' + url2[1]

    driver.get(URL)

    # mixmajor = driver.find_element_by_xpath('//*[@id="detail_title_cour"]')
    # print(major)
    # print(mixmajor.text.split(' ')[0], mixmajor.text.split(' ')[1])
    # major = mixmajor.text.split(' ')[0]
    major='간호학과'

    # print(mixmajor.text.split(' ')[1][0])

    concentration = ""

    # m+=1

    # if(mixmajor.text.split( )[1][0] != "(") :
    #     concentration = mixmajor.text.split(' ', 1)[1]
    # else:
    #     concentration = ""
    
    # print(major, concentration)

    html = urlopen(URL)
    bsObject = BeautifulSoup(html, "html.parser")

    # print(bsObject.text.strip())

    # print(bsObject.div.find("div", {"id":"locator_cour"}))
    
    # print(bsObject)

    i=2
    u = [college, major, concentration,"","","","","","","","","","","","","","","","","", ""]

    for td in bsObject.table.find_all('td'):
        # print(td)
        if i == 20 :
            x = mycol.insert_one({"college":u[0], "major":u[1], "concentration":u[2], "grade":u[3], "lec_cat":u[4], "lec_num":u[5], "lec_link":u[6], "name":u[7], "grades": u[8], "theory":u[9], "training":u[10], "prefessor":u[11], "time":u[12], "real_time":u[13], "lec_room":u[14], "students":u[15], "sugang":u[16], "sugang_pack":u[17], "pack_yes":u[18], "etc":u[19], "lec_method":u[20]})
            print(u)
            i=3
            u[i] = (td.text.strip().replace(" ", ""))
        else:
            if i==4:
                print(i)
                i+=1
                u[i] = (td.text.strip().replace(" ", ""))
                a = u[i]
                a1 = a[0:7]
                a2 = a[7:]
                i+=1
                u[i] = 'http://my.knu.ac.kr/stpo/stpo/cour/plans/viewPlanDetailNew20211.action?plans.searchOpenYrTrm=%2720211%27&plans.searchSubjCde=%27' + a1 + '%27&plans.searchSubClassCde=%27' + a2 + '%27&search_open_crse_cde=' + k + '&sub=' + k[0:2] + '&search_open_yr_trm=20211'
            else :
                i+=1
                u[i] = (td.text.strip().replace(" ", ""))

    x = mycol.insert_one({"college":u[0], "major":u[1], "concentration":u[2], "grade":u[3], "lec_cat":u[4], "lec_num":u[5], "lec_link":u[6], "name":u[7], "grades": u[8], "theory":u[9], "training":u[10], "prefessor":u[11], "time":u[12], "real_time":u[13], "lec_room":u[14], "students":u[15], "sugang":u[16], "sugang_pack":u[17], "pack_yes":u[18], "etc":u[19], "lec_method":u[20]})
    print(u)