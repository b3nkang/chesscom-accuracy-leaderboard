import requests
from bs4 import BeautifulSoup

def scrape_accuracies(username):
    url = f"https://www.chess.com/games/archive/{username}"
    response = requests.get(url)

    if response.status_code == 200:
        html = response.text
    else:
        print("Failed to fetch the page")
        return None

    soup = BeautifulSoup(html, "html.parser")

    table = soup.find("table", class_="archive-games-table")
    if table:
        rows = table.find_all("tr")[1:11] 
    else:
        print("Table not found")
        return None

    accuracies = []

    for row in rows:
        #print(row)
        user_cells = row.find_all("td", class_="archive-games-user-cell")

        #print(user_cells)
        white_username = user_cells[0].find("a", class_="user-username-component")["v-user-popover"]

        accuracy_cells = row.find_all("td", class_="table-text-center archive-games-analyze-cell")
        if accuracy_cells and len(accuracy_cells) > 0:
            div_elements = accuracy_cells[0].find_all("div")
            if len(div_elements) >= 2:
                #print("white user: "+white_username+ ", user: "+username)
                #print(type(white_username))
                #print(type(username))
                if ("'"+username+"'") == white_username:
                    #print("WHITE: "+username)
                    #print("TEXT:" +div_elements[0].text)
                    #print()
                    accuracies.append(float(div_elements[0].text))
                else:
                    #print("BLACK: "+username)
                    #print("TEXT:" +div_elements[1].text)
                    #print()
                    accuracies.append(float(div_elements[1].text))
            else:
                accuracies.append(None)  
        else:
            accuracies.append(None) 

        """
        print(type(accuracy_cells))
        if accuracy_cells:
            if username == white_username:
                print(float(accuracy_cells[0].find("div").text))
                accuracies.append(float(accuracy_cells[0].find("div").text))
            else:
                if len(accuracy_cells) > 1:
                    print(float(accuracy_cells[0].find("div").text))
                    accuracies.append(float(accuracy_cells[1].find("div").text))
                else:
                    accuracies.append(None)
        else:
            accuracies.append(None)
        return accuracies
        break"""
    return accuracies

def compute_avg(accuracies):
    sum = 0
    for acc in accuracies:
        sum += acc
    return sum/len(accuracies)


if __name__ == "__main__":
    username = "MagnusCarlsen"
    accuracies = scrape_accuracies(username)
    print(accuracies)
    print(compute_avg(accuracies))
