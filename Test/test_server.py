from flask import Flask, request, render_template, jsonify
import socket
from urllib.parse import urlparse, parse_qs
from bs4 import BeautifulSoup
import requests

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/help')
def help():
    return render_template('help.html')

@app.route('/createaccount')
def create_account():
    return render_template('createaccount.html')

@app.route('/scan', methods=['POST'])
def scan():
    url = request.form['url']
    ip_address, server_name = get_ip_address_and_server_name_from_url(url)
    params = extract_params(url)
    
    # Extract subdomains
    subdomains = extract_subdomains(url)
    
    # Extract URLs
    urls = extract_urls(url)

    result = {
        'url': urlparse(url).netloc,
        'IP Address': ip_address,
        'URLs': urls,
        'Subdomains': subdomains
    }

    return render_template('result.html', result=result)

def get_ip_address_and_server_name_from_url(url):
    try:
        domain = urlparse(url).netloc
        ip_address = socket.gethostbyname(domain)
        server_name = socket.gethostbyaddr(ip_address)[0]
        return ip_address, server_name
    except socket.gaierror as e:
        print(f"Error getting IP address and server name: {e}")
        return None, None
    except Exception as e:
        print(f"Unexpected error: {e}")
        return None, None

def extract_subdomains(url):
    subdomains = {}
    try:
        domain = urlparse(url).netloc
        subdomains[domain] = find_subdomains(domain)
    except Exception as e:
        print(f"Error extracting subdomains: {e}")
    return subdomains

def find_subdomains(domain):
    url = f"https://crt.sh/?q=%.{domain}&output=json"
    try:
        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()
            subdomains = []
            for entry in data:
                subdomains.append(entry['name_value'])
            return subdomains
        else:
            return []
    except requests.RequestException as e:
        print(f"Error fetching subdomains: {e}")
        return []

def extract_urls(url):
    urls = []
    try:
        response = requests.get(url)
        if response.status_code == 200:
            soup = BeautifulSoup(response.content, "html.parser")
            for link in soup.find_all("a"):
                href = link.get("href")
                if href:
                    if urlparse(href).netloc:
                        urls.append(href)
                    else:
                        urls.append(urlparse(url)._replace(path=href).geturl())
    except Exception as e:
        print(f"Error extracting URLs: {e}")
    return urls

def extract_params(url):
    try:
        parsed_url = urlparse(url)
        params = parse_qs(parsed_url.query)
        return params
    except Exception as e:
        print(f"Error extracting parameters: {e}")
        return {}

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
