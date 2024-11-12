import requests
from pyngrok import ngrok
import time

SERVER_URL = "http://localhost:3000"

def send_ngrok_url_to_server(ngrok_url):
    try:
        response = requests.post(SERVER_URL, json={"ngrok_url": ngrok_url})
        if response.status_code == 200:
            print("URL successfully sent to server.")
        else:
            print(f"Failed to send URL to server. Status code: {response.status_code}")
    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}")

def main():
    tunnel = ngrok.connect(8000)
    public_url = tunnel.public_url
    print(f"ngrok public URL: {public_url}")
    send_ngrok_url_to_server(public_url)

    try:
        while True:
            time.sleep(10)
    except KeyboardInterrupt:
        print("Shutting down...")
        ngrok.kill()

if __name__ == "__main__":
    main()
