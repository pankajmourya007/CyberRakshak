from flask import Flask, request, render_template, Response, jsonify
import socket
from urllib.parse import urlparse, parse_qs
from bs4 import BeautifulSoup
import requests
import tempfile
import os
import json

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

def find_subdomains(domain):
    url = f"https://crt.sh/?q=%.{domain}&output=json"
    try:
        response = requests.get(url)
        if response.status_code == 200:
            subdomains = [entry['name_value'] for entry in response.json()]
            return subdomains
        else:
            return []
    except requests.RequestException as e:
        print(f"Error fetching subdomains: {e}")
        return []

def get_ip_address(domain):
    try:
        ip_address = socket.gethostbyname(domain)
        return ip_address
    except socket.gaierror as e:
        print(f"Error getting IP address: {e}")
        return None

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

@app.route('/scan', methods=['POST'])
def scan():
    url = request.form['url']
    
    
    domain = urlparse(url).netloc
    main_domain_ip = get_ip_address(domain)
    server_name = socket.getfqdn(domain)
    
    
    subdomains = find_subdomains(domain)
    subdomain_ips = {subdomain: get_ip_address(subdomain) for subdomain in subdomains}
    subdomain_servers = {subdomain: socket.getfqdn(subdomain) for subdomain in subdomains}
    
    
    urls = extract_urls(url)

    result = {
        'Domain': domain,
        'IP Address': main_domain_ip,
        'Server Name': server_name,
        'Subdomains': {
            subdomain: {
                'IP Address': ip,
                'Server Name': subdomain_servers[subdomain]
            }
            for subdomain, ip in subdomain_ips.items()
        },
        'URLs': urls
    }

    
    json_result = json.dumps(result, indent=4)

    
    headers = {
        'Content-Disposition': 'attachment; filename="scan_result.json"'
    }

    
    return Response(json_result, mimetype='application/json', headers=headers)

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
